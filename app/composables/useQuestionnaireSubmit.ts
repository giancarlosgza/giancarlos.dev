import type { IUploadedFile, TAnswers, TFieldFiles, TNiche } from '~/utils/questionnaire'
import { connectAuthEmulator, getAuth, signInAnonymously, signOut } from 'firebase/auth'
import { connectFirestoreEmulator, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { connectStorageEmulator, ref as storageRef, uploadBytes } from 'firebase/storage'
import { useFirebaseApp, useFirebaseStorage, useFirestore } from 'vuefire'

/** Types */
export type TSubmitError = 'network' | 'denied'

/** Interfaces */
export interface IQuestionnairePayload {
  niche: TNiche
  locale: string
  answers: TAnswers
  files: TFieldFiles
}

/** Constants */
// Same ports as firebase.json
const EMULATOR_HOST = '127.0.0.1'
const EMULATOR_PORTS = { auth: 9099, firestore: 8080, storage: 9199 }

/** Methods */
function safeFileName(name: string): string {
  return name.normalize('NFD').replace(/\p{M}/gu, '').replace(/[^\w.-]+/g, '-').slice(-80)
}

export function useQuestionnaireSubmit() {
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
    if (import.meta.dev && !auth.emulatorConfig) {
      connectAuthEmulator(auth, `http://${EMULATOR_HOST}:${EMULATOR_PORTS.auth}`, { disableWarnings: true })
      connectFirestoreEmulator(db, EMULATOR_HOST, EMULATOR_PORTS.firestore)
      connectStorageEmulator(storage, EMULATOR_HOST, EMULATOR_PORTS.storage)
    }

    return auth
  }

  async function submit(payload: IQuestionnairePayload): Promise<boolean> {
    isSubmitting.value = true
    submitError.value = null

    try {
      const auth = clientAuth()
      // One document per uid, so each submit signs in as a new user (once the saved one has loaded)
      await auth.authStateReady()
      if (auth.currentUser)
        await signOut(auth)

      const { user } = await signInAnonymously(auth)
      const uploaded: IUploadedFile[] = []

      for (const [key, list] of Object.entries(payload.files)) {
        for (const [index, file] of list.entries()) {
          const path = `questionnaires/${user.uid}/${key}/${index}-${safeFileName(file.name)}`
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

      await setDoc(doc(db, 'questionnaires', user.uid), {
        niche: payload.niche,
        locale: payload.locale,
        answers: payload.answers,
        files: uploaded,
        createdAt: serverTimestamp()
      })
      await signOut(auth)

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
    submit
  }
}
