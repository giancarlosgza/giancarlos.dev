<script setup lang="ts">
/** Meta */
definePageMeta({
  pageTitle: 'Web Block - View All Cards'
})
useSeoMeta({
  title: 'Web Block - View All Cards',
  description: 'Web Block for view all documents or items in card grid format.'
})

/** Data */
const cardGridItems = [
  { id: 1, name: 'Proyecto Atlas', description: 'Sistema de monitoreo geoespacial.', status: 'Activo', requests: 234, createdAt: '2025-10-01' },
  { id: 2, name: 'Proyecto Nébula', description: 'Pipeline de datos en tiempo real.', status: 'Pendiente', requests: 567, createdAt: '2025-10-03' },
  { id: 3, name: 'Proyecto Aurora', description: 'Portal de visualización de métricas.', status: 'Activo', requests: 891, createdAt: '2025-10-05' },
  { id: 4, name: 'Proyecto Horizonte', description: 'API pública para integración externa.', status: 'Inactivo', requests: 5123, createdAt: '2025-10-07' },
  { id: 5, name: 'Proyecto Vertex', description: 'Motor de recomendaciones personalizadas.', status: 'Activo', requests: 1456, createdAt: '2025-10-10' },
  { id: 6, name: 'Proyecto Ícaro', description: 'Servicio de autenticación y OAuth.', status: 'Activo', requests: 789, createdAt: '2025-10-12' },
  { id: 7, name: 'Proyecto Océano', description: 'Archivador de documentos históricos.', status: 'Archivado', requests: 345, createdAt: '2025-10-14' },
  { id: 8, name: 'Proyecto Quántico', description: 'Módulo de cálculo distribuido.', status: 'Pendiente', requests: 2678, createdAt: '2025-10-16' },
  { id: 9, name: 'Proyecto Eclipse', description: 'Programador de tareas y jobs.', status: 'Activo', requests: 912, createdAt: '2025-10-18' },
  { id: 10, name: 'Proyecto Brisa', description: 'Servicio de notificaciones multicanal.', status: 'Inactivo', requests: 2145, createdAt: '2025-10-20' },
  { id: 11, name: 'Proyecto Orion', description: 'Design System con componentes y CSS para las plataformas', status: 'Activo', requests: 1345, createdAt: '2025-10-22' }
]
</script>

<template>
  <div class="container-fluid">
    <!-- Header -->
    <UiHeaderContent
      title="Web Block: View All Cards"
      subtitle="Page for reading all documents or items in card grid format."
      actions
    >
      <template #actions>
        <UiButtonGroup connected>
          <UiButton
            variant="tonal"
            color="secondary"
            text="Cards layout"
          >
            <template #icon>
              <UiIconMaterial icon-code="&#xe8d6;" />
            </template>
          </UiButton>
          <UiButton
            variant="filled"
            text="Create proyect"
          >
            <template #icon>
              <UiIconMaterial icon-code="&#xe145;" />
            </template>
          </UiButton>
        </UiButtonGroup>
      </template>
    </UiHeaderContent>

    <!-- Content -->
    <div class="row">
      <div class="col-md-12">
        <div class="d-grid grid-repeat-cols-md-2 grid-repeat-cols-xl-4 gap-5">
          <UiCard
            v-for="item in cardGridItems"
            :key="item.id"
            variant="outline"
            class="card-pane"
          >
            <template #body>
              <div class="d-flex justify-content-between gap-3">
                <div>
                  <UiIconMaterial
                    icon-code="&#xf387;"
                    class="icon-wrap icon-wrap-sm icon-wrap-gradient gradient-secondary text-dark h-auto mb-3"
                  />
                  <p class="subtitle-1 fw-600">
                    {{ item.name }}
                  </p>
                  <p class="subtitle-2 text-muted">
                    {{ item.description }}
                  </p>
                </div>
                <div>
                  <UiButtonMenu
                    :id="`actions-menu-${item.id}`"
                    variant="outline"
                    size="sm"
                    tooltip-text="Ver acciones"
                    icon icon-trailing
                  >
                    <template #icon>
                      <UiIconMaterial icon-code="&#xe5d4;" />
                    </template>
                    <template #menu>
                      <UiButtonMenuText :item-text="item.name" />
                      <UiButtonMenuItem icon="&#xe89e;" item-text="Ver detalles" />
                      <UiButtonMenuItem
                        icon="&#xe7f4;"
                        item-text="Alertas"
                        :badge="{ text: '10', variant: 'danger', size: 'sm', pill: true }"
                      />
                      <UiButtonMenuItem icon="&#xe3c9;" item-text="Editar" />
                      <UiButtonMenuDivider />
                      <UiButtonMenuItem icon="&#xe872;" item-text="Eliminar" is-destructive />
                    </template>
                  </UiButtonMenu>
                </div>
              </div>
            </template>
            <template #footer>
              <div class="d-flex justify-content-between align-items-center">
                <UiBadge
                  variant="outline"
                  :text="item.status"
                  icon-code="&#xe061;"
                  :icon-class="
                    item.status === 'Activo' ? 'text-success-fixed'
                    : item.status === 'Pendiente' ? 'text-warning-fixed'
                      : item.status === 'Inactivo' ? 'text-danger-fixed'
                        : item.status === 'Archivado' ? 'text-muted' : 'text-muted'"
                  size="sm"
                />
                <span class="subtitle-2 text-muted tabular-numbers">
                  {{ item.requests }} requests
                </span>
              </div>
            </template>
          </UiCard>
        </div>
      </div>
    </div>
  </div>
</template>
