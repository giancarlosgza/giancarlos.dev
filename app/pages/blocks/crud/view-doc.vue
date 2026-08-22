<script setup lang="ts">
import type { IDatatableColumn } from '@colorffy/ui'

/** Meta */
definePageMeta({
  pageTitle: 'Web Block - View Doc'
})
useSeoMeta({
  title: 'Web Block - View Doc',
  description: 'Web Block for view single document or item.'
})

/** Composables */
const router = useRouter()

/** Data */
const logColumns: IDatatableColumn[] = [
  { key: 'id', label: 'ID', hidden: true },
  { key: 'event', label: 'Event' },
  { key: 'level', label: 'Level' },
  { key: 'message', label: 'Message' },
  { key: 'user', label: 'User' },
  { key: 'createdAt', label: 'Created At' }
]
const logItems = [
  { id: 1, event: 'initialization', level: 'info', message: 'Documento cargado correctamente.', user: 'system', createdAt: '2025-10-01 09:00' },
  { id: 2, event: 'validation', level: 'success', message: 'Validación básica completada.', user: 'auditor', createdAt: '2025-10-01 09:02' },
  { id: 3, event: 'fetch-related', level: 'info', message: 'Relaciones consultadas (4 registros).', user: 'system', createdAt: '2025-10-01 09:03' },
  { id: 4, event: 'permission-check', level: 'info', message: 'Permisos verificados para el usuario.', user: 'admin', createdAt: '2025-10-01 09:04' },
  { id: 5, event: 'cache-hit', level: 'debug', message: 'Cache local aprovechada.', user: 'system', createdAt: '2025-10-01 09:05' },
  { id: 6, event: 'metrics-log', level: 'info', message: 'Tiempo de carga 240ms.', user: 'system', createdAt: '2025-10-01 09:06' },
  { id: 7, event: 'snapshot', level: 'info', message: 'Snapshot generado para auditoría.', user: 'auditor', createdAt: '2025-10-01 09:07' },
  { id: 8, event: 'update-intent', level: 'warning', message: 'Intento de edición sin token.', user: 'editor', createdAt: '2025-10-01 09:09' },
  { id: 9, event: 'security-flag', level: 'warning', message: 'Sesión cercana a expiración.', user: 'system', createdAt: '2025-10-01 09:10' },
  { id: 10, event: 'revalidation', level: 'info', message: 'Datos revalidados contra API.', user: 'system', createdAt: '2025-10-01 09:12' },
  { id: 11, event: 'threshold-check', level: 'debug', message: 'Límites dentro de rango.', user: 'system', createdAt: '2025-10-01 09:13' },
  { id: 12, event: 'attachment-load', level: 'info', message: '2 archivos vinculados cargados.', user: 'editor', createdAt: '2025-10-01 09:14' },
  { id: 13, event: 'policy-eval', level: 'info', message: 'Políticas de acceso evaluadas.', user: 'admin', createdAt: '2025-10-01 09:15' },
  { id: 14, event: 'warning-metrics', level: 'warning', message: 'Tiempo de respuesta elevado (820ms).', user: 'system', createdAt: '2025-10-01 09:16' },
  { id: 15, event: 'retry-attempt', level: 'info', message: 'Reintento de lectura exitoso.', user: 'system', createdAt: '2025-10-01 09:17' },
  { id: 16, event: 'transform', level: 'debug', message: 'Datos normalizados.', user: 'system', createdAt: '2025-10-01 09:18' },
  { id: 17, event: 'anomaly-detect', level: 'warning', message: 'Patrón de acceso inusual.', user: 'system', createdAt: '2025-10-01 09:19' },
  { id: 18, event: 'lock', level: 'info', message: 'Documento bloqueado para revisión.', user: 'admin', createdAt: '2025-10-01 09:20' },
  { id: 19, event: 'unlock', level: 'success', message: 'Bloqueo liberado.', user: 'admin', createdAt: '2025-10-01 09:22' },
  { id: 20, event: 'comment-add', level: 'info', message: 'Comentario agregado (1).', user: 'editor', createdAt: '2025-10-01 09:23' },
  { id: 21, event: 'autosave', level: 'debug', message: 'Autosave activado.', user: 'system', createdAt: '2025-10-01 09:24' },
  { id: 22, event: 'session-refresh', level: 'success', message: 'Token refrescado.', user: 'system', createdAt: '2025-10-01 09:25' },
  { id: 23, event: 'error-boundary', level: 'error', message: 'Error capturado en componente secundario.', user: 'system', createdAt: '2025-10-01 09:26' },
  { id: 24, event: 'recover', level: 'success', message: 'Recuperación tras error aplicada.', user: 'system', createdAt: '2025-10-01 09:27' },
  { id: 25, event: 'finalize', level: 'info', message: 'Secuencia de lectura finalizada.', user: 'system', createdAt: '2025-10-01 09:28' }
]

/** Methods */
function levelVariant(level: string) {
  switch (level) {
    case 'success': return 'success'
    case 'warning': return 'warning'
    case 'error': return 'danger'
    case 'debug': return 'neutral'
    default: return 'primary'
  }
}
function userInitial(user: string) {
  return user.charAt(0).toUpperCase()
}
function userColor(user: string) {
  const roleColorMap: Record<string, string> = {
    system: 'bg-secondary-fixed',
    auditor: 'bg-warning-fixed',
    admin: 'bg-danger-fixed',
    editor: 'bg-info-fixed'
  }
  return roleColorMap[user] || 'bg-primary-fixed'
}
</script>

<template>
  <div class="container">
    <!-- Header -->
    <UiHeaderContent
      title="Web Block: View Doc"
      subtitle="Page for viewing a single document or item."
      back-button back-button-label="Regresar"
      @click="router.back()"
    />

    <!-- Content -->
    <div class="row justify-content-center mt-section mb-3">
      <div class="col-md-12 d-flex align-items-center gap-3 mb-3">
        <div class="d-flex align-items-center flex-fill gap-3">
          <div>
            <UiIconMaterial
              icon-code="&#xf387;"
              class="icon-wrap icon-wrap-sm icon-wrap-gradient gradient-secondary text-dark"
            />
          </div>
          <div>
            <h2 class="text-subheading">
              Proyecto Orion
            </h2>
            <p>
              Design System con componentes y CSS para las plataformas
            </p>
          </div>
        </div>
        <div class="justify-content-end">
          <UiButtonGroup connected>
            <UiButton
              variant="tonal"
              color="secondary"
              text="Editar"
              size="sm"
            >
              <template #icon>
                <UiIconMaterial icon-code="&#xe3c9;" />
              </template>
            </UiButton>
            <UiButton
              variant="tonal"
              color="danger"
              text="Eliminar"
              size="sm"
            >
              <template #icon>
                <UiIconMaterial icon-code="&#xe872;" />
              </template>
            </UiButton>
          </UiButtonGroup>
        </div>
      </div>

      <div class="col-md-12 flow-3">
        <UiCard variant="outline" class="card-pane">
          <template #body>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p class="subtitle-1 fw-500 mb-0">
                  Detalles
                </p>
              </div>
              <UiBadgeGroup>
                <UiBadge
                  variant="outline"
                  text="Activo"
                  icon-code="&#xe061;"
                  icon-class="text-success-fixed"
                  size="sm"
                />
                <UiBadge
                  variant="outline"
                  text="1,345 Requests"
                  icon-code="&#xe061;"
                  icon-class="text-secondary-fixed"
                  size="sm"
                />
              </UiBadgeGroup>
            </div>
          </template>
        </UiCard>
        <UiCard variant="outline" class="card-pane">
          <template #body>
            <UiDatatable
              column-manager
              :columns="logColumns"
              :items="logItems"
            >
              <template #controls>
                <UiInputText
                  id="search-logs"
                  placeholder="Search logs..."
                  rounded
                  custom-class="h-auto"
                />
              </template>
              <template #cell-event="{ item }">
                <span class="fw-500">/{{ item.event }}</span>
              </template>
              <template #cell-level="{ item }">
                <UiBadge
                  :variant="levelVariant(item.level)"
                  :text="item.level"
                  size="sm" class="rounded-sm"
                />
              </template>
              <template #cell-user="{ item }">
                <div class="td-name">
                  <UiAvatar
                    :title="item.user"
                    :initials="userInitial(item.user)"
                    :class="userColor(item.user)"
                    mask-shape="pill" mask-stretch
                    :aria-label="`User ${item.user}`"
                  />
                  <span class="text-truncate">{{ item.user }}</span>
                </div>
              </template>
            </UiDatatable>
          </template>
        </UiCard>
      </div>
    </div>
  </div>
</template>
