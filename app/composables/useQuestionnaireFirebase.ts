import type { IInvite, IUploadedFile, TAnswers, TFieldFiles, TNiche } from '~/utils/questionnaire'
import { connectAuthEmulator, getAuth, signInAnonymously } from 'firebase/auth'
import { connectFirestoreEmulator, doc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore'
import { connectStorageEmulator, ref as storageRef, uploadBytes } from 'firebase/storage'
import { useFirebaseApp, useFirebaseStorage, useFirestore } from 'vuefire'

/** Types */
export type TSubmitError = 'network' | 'denied'

/** Interfaces */
export interface IQuestionnairePayload {
  invite: string
  niche: TNiche
  locale: string
  answers: TAnswers
  files: TFieldFiles
}

/** Constants */
// Same ports as giancarlos-admin/firebase.json, which runs the emulators
const EMULATOR_HOST = '127.0.0.1'
const EMULATOR_PORTS = { auth: 9099, firestore: 8080, storage: 9199 }

let emulatorsConnected = false

/** Methods */
function safeFileName(name: string): string {
  return name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[^\w.-]+/g, '-').slice(-80)
}

export function useQuestionnaireFirebase() {
  /** Data */
  const app = useFirebaseApp()
  const db = useFirestore()
  const storage = useFirebaseStorage()
  const isSubmitting = ref<boolean>(false)
  const submitError = ref<TSubmitError | null>(null)

  /** Methods */
  // VueFire's auth module needs firebase-admin under SSR
  function clientAuth() {
    const auth = getAuth(app)
    if (import.meta.dev && !emulatorsConnected) {
      emulatorsConnected = true
      connectAuthEmulator(auth, `http://${EMULATOR_HOST}:${EMULATOR_PORTS.auth}`, { disableWarnings: true })
      connectFirestoreEmulator(db, EMULATOR_HOST, EMULATOR_PORTS.firestore)
      connectStorageEmulator(storage, EMULATOR_HOST, EMULATOR_PORTS.storage)
    }

    return auth
  }

  /** Null when the code doesn't exist, is used, expired, or can't be read */
  async function loadInvite(code: string): Promise<IInvite | null> {
    clientAuth()
    try {
      const snapshot = await getDoc(doc(db, 'invites', code))
      if (!snapshot.exists())
        return null

      const data = snapshot.data()
      const expiresAt: Date | null = data.expiresAt?.toDate?.() ?? null
      if (data.used || (expiresAt && expiresAt <= new Date()))
        return null

      return { code, clientName: data.clientName ?? null, niche: data.niche ?? null }
    } catch (error) {
      console.log('[questionnaire] invite check failed', error)
      return null
    }
  }

  async function submit(payload: IQuestionnairePayload): Promise<boolean> {
    isSubmitting.value = true
    submitError.value = null

    try {
      const auth = clientAuth()
      await auth.authStateReady()
      const user = auth.currentUser ?? (await signInAnonymously(auth)).user
      const uploaded: IUploadedFile[] = []

      for (const [key, list] of Object.entries(payload.files)) {
        for (const [index, file] of list.entries()) {
          const path = `questionnaires/${payload.invite}/${key}/${index}-${safeFileName(file.name)}`
          await uploadBytes(storageRef(storage, path), file, { contentType: file.type })
          uploaded.push({
            key,
            path,
            name: file.name,
            size: file.size,
            type: file.type
          })
        }
      }

      // The rules only accept the answers together with the invite marked as used
      const batch = writeBatch(db)
      batch.set(doc(db, 'questionnaires', payload.invite), {
        niche: payload.niche,
        locale: payload.locale,
        answers: payload.answers,
        files: uploaded,
        uid: user.uid,
        createdAt: serverTimestamp()
      })
      batch.update(doc(db, 'invites', payload.invite), {
        used: true,
        usedBy: user.uid,
        usedAt: serverTimestamp()
      })
      await batch.commit()

      return true
    } catch (error) {
      console.log('[questionnaire] submit failed', error)
      const code = (error as { code?: string }).code ?? ''
      submitError.value = /permission-denied|unauthorized/.test(code)
        ? 'denied'
        : 'network'
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isSubmitting,
    submitError,
    loadInvite,
    submit
  }
}
