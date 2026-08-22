<script setup lang="ts">
import type { IDatatableColumn } from '@colorffy/ui'

/** Meta */
definePageMeta({
  pageTitle: 'Web Block - View All Table'
})
useSeoMeta({
  title: 'Web Block - View All Table',
  description: 'Web Block for view all documents or items in table format.'
})

/** Data */
const columns: IDatatableColumn[] = [
  { key: 'id', label: 'ID', hidden: true },
  { key: 'nombre', label: 'Nombre' },
  { key: 'descripcion', label: 'Descripción', sortable: false },
  { key: 'estatus', label: 'Estatus' },
  { key: 'solicitudes', label: 'Solicitudes', align: 'end' },
  { key: 'fechaDeCreacion', label: 'Fecha de Creación', align: 'end' },
  { key: 'acciones', label: 'Acciones', sortable: false, align: 'end' }
]

const datatableItems = [
  { id: 1, nombre: 'Proyecto Atlas', descripcion: 'Sistema de monitoreo geoespacial.', estatus: 'Activo', solicitudes: 234, fechaDeCreacion: '2025-10-01' },
  { id: 2, nombre: 'Proyecto Nébula', descripcion: 'Pipeline de datos en tiempo real.', estatus: 'Pendiente', solicitudes: 567, fechaDeCreacion: '2025-10-03' },
  { id: 3, nombre: 'Proyecto Aurora', descripcion: 'Portal de visualización de métricas.', estatus: 'Activo', solicitudes: 891, fechaDeCreacion: '2025-10-05' },
  { id: 4, nombre: 'Proyecto Horizonte', descripcion: 'API pública para integración externa.', estatus: 'Inactivo', solicitudes: 5123, fechaDeCreacion: '2025-10-07' },
  { id: 5, nombre: 'Proyecto Vertex', descripcion: 'Motor de recomendaciones personalizadas.', estatus: 'Activo', solicitudes: 1456, fechaDeCreacion: '2025-10-10' },
  { id: 6, nombre: 'Proyecto Ícaro', descripcion: 'Servicio de autenticación y OAuth.', estatus: 'Activo', solicitudes: 789, fechaDeCreacion: '2025-10-12' },
  { id: 7, nombre: 'Proyecto Océano', descripcion: 'Archivador de documentos históricos.', estatus: 'Archivado', solicitudes: 345, fechaDeCreacion: '2025-10-14' },
  { id: 8, nombre: 'Proyecto Quántico', descripcion: 'Módulo de cálculo distribuido.', estatus: 'Pendiente', solicitudes: 2678, fechaDeCreacion: '2025-10-16' },
  { id: 9, nombre: 'Proyecto Eclipse', descripcion: 'Programador de tareas y jobs.', estatus: 'Activo', solicitudes: 912, fechaDeCreacion: '2025-10-18' },
  { id: 10, nombre: 'Proyecto Brisa', descripcion: 'Servicio de notificaciones multicanal.', estatus: 'Inactivo', solicitudes: 2145, fechaDeCreacion: '2025-10-20' },
  { id: 11, nombre: 'Proyecto Orion', descripcion: 'Design System con componentes y CSS para las plataformas', estatus: 'Activo', solicitudes: 1345, fechaDeCreacion: '2025-10-22' }
]
</script>

<template>
  <div class="container-fluid">
    <!-- Header -->
    <UiHeaderContent
      title="Web Block: View All Table"
      subtitle="Page for reading all documents or items in table format."
      actions
    >
      <template #actions>
        <UiButtonGroup connected>
          <UiButton
            variant="tonal"
            color="secondary"
            text="Datatable layout"
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
        <UiCard variant="outline" class="card-pane">
          <template #body>
            <UiDatatable
              :columns="columns"
              :items="datatableItems"
              table-class="table-bordered"
              column-manager
              column-manager-text="Columnas"
              column-manager-tooltip="Administrar columnas"
              :columns-toggle-tooltip="{ showAll: 'Mostrar todo', hideDefault: 'Ocultar todo' }"
              empty-state-title="No hay proyectos disponibles"
              empty-state-subtitle="No se encontraron proyectos para mostrar en la tabla."
            >
              <template #cell-nombre="{ item }">
                <span class="fw-500">
                  <UiAvatar
                    :initials="item.nombre.charAt(0) + item.nombre.charAt(9)"
                    mask-shape="pill" mask-stretch
                    class="bg-secondary-fixed"
                  />
                  {{ item.nombre }}
                </span>
              </template>
              <template #cell-estatus="{ item }">
                <UiBadge
                  variant="outline"
                  :text="item.estatus"
                  icon-code="&#xe061;"
                  :icon-class="
                    item.estatus === 'Activo' ? 'text-success-fixed'
                    : item.estatus === 'Pendiente' ? 'text-warning-fixed'
                      : item.estatus === 'Inactivo' ? 'text-danger-fixed'
                        : item.estatus === 'Archivado' ? 'text-muted' : 'text-muted'"
                  size="sm"
                />
              </template>
              <template #cell-solicitudes="{ item }">
                <div class="d-grid gap-1">
                  <div class="text-muted text-end tabular-numbers">
                    {{ item.solicitudes }}
                  </div>
                  <div
                    class="progress progress-sm bg-color-mix"
                    style="--_bg-color-one: var(--theme-muted-a10); --_bg-color-mix-opacity: 50%;"
                  >
                    <div
                      class="progress-bar "
                      :class="
                        item.solicitudes < 1000 ? 'bg-success-fixed bg-opacity-80'
                        : item.solicitudes >= 1000 && item.solicitudes < 2000 ? 'bg-warning-fixed bg-opacity-80'
                          : 'bg-danger-fixed bg-opacity-80'"
                      role="progressbar"
                      :style="`width: ${Math.min((item.solicitudes / 2000) * 100, 100)}%`"
                      :aria-valuenow="item.solicitudes"
                      aria-valuemin="0"
                      aria-valuemax="6000"
                    />
                  </div>
                </div>
              </template>
              <template #cell-fechaDeCreacion="{ item }">
                <span class="text-muted text-end d-block">
                  {{ new Date(item.fechaDeCreacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: '2-digit' }) }}
                </span>
              </template>
              <template #cell-acciones="{ item }">
                <UiButtonMenu
                  :id="`actions-menu-${item.id}`"
                  variant="outline"
                  size="sm"
                  text="Acciones"
                  tooltip-text="Ver acciones"
                  icon-trailing
                >
                  <template #icon>
                    <UiIconMaterial icon-code="&#xe5c5;" />
                  </template>
                  <template #menu>
                    <UiButtonMenuText :item-text="item.nombre" />
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
              </template>
            </UiDatatable>
          </template>
        </UiCard>
      </div>
    </div>
  </div>
</template>
