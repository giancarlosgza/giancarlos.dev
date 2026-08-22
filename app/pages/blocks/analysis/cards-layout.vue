<script setup lang="ts">
/** Meta */
definePageMeta({
  pageTitle: 'Web Block - Analysis Cards Layout'
})
useSeoMeta({
  title: 'Web Block - Analysis Cards Layout',
  description: 'Web Block for view all analysis data in cards layout format.'
})

/** Interfaces */
interface ICardGridItem {
  id: number
  name: string
  description: string
  status: 'Activo' | 'Pendiente' | 'Inactivo' | 'Archivado'
  requests: number
  createdAt: string
}

/** Data */
const cardGridItems: ICardGridItem[] = [
  { id: 1, name: 'Proyecto Atlas', description: 'Sistema de monitoreo geoespacial.', status: 'Activo', requests: 234, createdAt: '2025-10-01' },
  { id: 2, name: 'Proyecto Nébula', description: 'Pipeline de datos en tiempo real.', status: 'Pendiente', requests: 567, createdAt: '2025-10-02' },
  { id: 3, name: 'Proyecto Aurora', description: 'Portal de visualización de métricas.', status: 'Activo', requests: 891, createdAt: '2025-10-03' },
  { id: 4, name: 'Proyecto Horizonte', description: 'API pública para integración externa.', status: 'Inactivo', requests: 5123, createdAt: '2025-10-04' },
  { id: 5, name: 'Proyecto Vertex', description: 'Motor de recomendaciones personalizadas.', status: 'Activo', requests: 1456, createdAt: '2025-10-05' },
  { id: 6, name: 'Proyecto Ícaro', description: 'Servicio de autenticación y OAuth.', status: 'Activo', requests: 789, createdAt: '2025-10-06' },
  { id: 7, name: 'Proyecto Océano', description: 'Archivador de documentos históricos.', status: 'Archivado', requests: 345, createdAt: '2025-10-07' },
  { id: 8, name: 'Proyecto Quántico', description: 'Módulo de cálculo distribuido.', status: 'Pendiente', requests: 2678, createdAt: '2025-10-08' },
  { id: 9, name: 'Proyecto Eclipse', description: 'Programador de tareas y jobs.', status: 'Activo', requests: 912, createdAt: '2025-10-09' },
  { id: 10, name: 'Proyecto Brisa', description: 'Servicio de notificaciones multicanal.', status: 'Inactivo', requests: 2145, createdAt: '2025-10-10' },
  { id: 11, name: 'Proyecto Orion', description: 'Design System con componentes y CSS para las plataformas', status: 'Activo', requests: 1345, createdAt: '2025-10-11' },
  { id: 12, name: 'Proyecto Cobalto', description: 'Motor de reglas empresariales.', status: 'Activo', requests: 802, createdAt: '2025-10-12' },
  { id: 13, name: 'Proyecto Prisma', description: 'Renderizador de gráficos avanzados.', status: 'Pendiente', requests: 456, createdAt: '2025-10-13' },
  { id: 14, name: 'Proyecto Delta', description: 'Orquestador de microservicios.', status: 'Activo', requests: 1789, createdAt: '2025-10-14' },
  { id: 15, name: 'Proyecto Fénix', description: 'Sistema de recuperación ante desastres.', status: 'Archivado', requests: 129, createdAt: '2025-10-15' },
  { id: 16, name: 'Proyecto Lumen', description: 'Gestor de iluminación IoT.', status: 'Activo', requests: 642, createdAt: '2025-10-16' },
  { id: 17, name: 'Proyecto Rastro', description: 'Seguimiento de trazabilidad logística.', status: 'Pendiente', requests: 392, createdAt: '2025-10-17' },
  { id: 18, name: 'Proyecto Arco', description: 'Sistema de autenticación federada.', status: 'Activo', requests: 2156, createdAt: '2025-10-18' },
  { id: 19, name: 'Proyecto Sigilo', description: 'Plataforma de cifrado de datos.', status: 'Inactivo', requests: 77, createdAt: '2025-10-19' },
  { id: 20, name: 'Proyecto Boreal', description: 'Monitor de energía verde.', status: 'Activo', requests: 953, createdAt: '2025-10-20' },
  { id: 21, name: 'Proyecto Cima', description: 'Gestión de escalado automático.', status: 'Activo', requests: 1204, createdAt: '2025-10-21' },
  { id: 22, name: 'Proyecto Tránsito', description: 'Análisis de movilidad urbana.', status: 'Pendiente', requests: 684, createdAt: '2025-10-22' },
  { id: 23, name: 'Proyecto Vector', description: 'Módulo de cálculos vectoriales.', status: 'Activo', requests: 431, createdAt: '2025-10-23' },
  { id: 24, name: 'Proyecto Núcleo', description: 'Core para procesamiento central.', status: 'Activo', requests: 2489, createdAt: '2025-10-24' },
  { id: 25, name: 'Proyecto Halo', description: 'Servicio de notificaciones luminosas.', status: 'Inactivo', requests: 154, createdAt: '2025-10-25' },
  { id: 26, name: 'Proyecto Esfera', description: 'Motor de simulación 3D.', status: 'Activo', requests: 1782, createdAt: '2025-10-26' },
  { id: 27, name: 'Proyecto Pulso', description: 'Monitor de latencia y tiempos.', status: 'Activo', requests: 1003, createdAt: '2025-10-27' },
  { id: 28, name: 'Proyecto Canal', description: 'Gateway de integración externa.', status: 'Pendiente', requests: 512, createdAt: '2025-10-28' },
  { id: 29, name: 'Proyecto Umbral', description: 'Alertas de límites de capacidad.', status: 'Activo', requests: 729, createdAt: '2025-10-29' },
  { id: 30, name: 'Proyecto Sendero', description: 'Ruteador de mensajes distribuidos.', status: 'Archivado', requests: 88, createdAt: '2025-10-30' },
  { id: 31, name: 'Proyecto Brújula', description: 'Servicio de orientación indoor.', status: 'Activo', requests: 947, createdAt: '2025-10-31' },
  { id: 32, name: 'Proyecto Titanio', description: 'Hardening de infraestructura.', status: 'Activo', requests: 1610, createdAt: '2025-11-01' },
  { id: 33, name: 'Proyecto Eco', description: 'Gestión de eco-sistemas auditivos.', status: 'Pendiente', requests: 303, createdAt: '2025-11-02' },
  { id: 34, name: 'Proyecto Prisma XR', description: 'Extensión inmersiva XR.', status: 'Activo', requests: 2105, createdAt: '2025-11-03' },
  { id: 35, name: 'Proyecto Código', description: 'Analizador de calidad de código.', status: 'Activo', requests: 1322, createdAt: '2025-11-04' },
  { id: 36, name: 'Proyecto Neblina', description: 'Optimización de tráfico web.', status: 'Pendiente', requests: 476, createdAt: '2025-11-05' },
  { id: 37, name: 'Proyecto Coral', description: 'Visualización de clusters.', status: 'Activo', requests: 1589, createdAt: '2025-11-06' },
  { id: 38, name: 'Proyecto Faro', description: 'Sistema de logs concentrados.', status: 'Activo', requests: 1944, createdAt: '2025-11-07' },
  { id: 39, name: 'Proyecto Delta ML', description: 'Motor de inferencia ML.', status: 'Inactivo', requests: 65, createdAt: '2025-11-08' },
  { id: 40, name: 'Proyecto Órbita', description: 'Seguimiento de satélites.', status: 'Activo', requests: 2456, createdAt: '2025-11-09' },
  { id: 41, name: 'Proyecto Código II', description: 'Segundo analizador de código.', status: 'Activo', requests: 954, createdAt: '2025-11-10' },
  { id: 42, name: 'Proyecto Escala', description: 'Gestión de escalamiento horizontal.', status: 'Pendiente', requests: 602, createdAt: '2025-11-11' },
  { id: 43, name: 'Proyecto Boreal II', description: 'Monitoreo energético extendido.', status: 'Activo', requests: 1807, createdAt: '2025-11-12' },
  { id: 44, name: 'Proyecto Vector Plus', description: 'Cálculos vectoriales avanzados.', status: 'Activo', requests: 1123, createdAt: '2025-11-13' },
  { id: 45, name: 'Proyecto Pulso Edge', description: 'Latencia en entornos edge.', status: 'Activo', requests: 1678, createdAt: '2025-11-14' },
  { id: 46, name: 'Proyecto Núcleo 2', description: 'Core procesamiento versión 2.', status: 'Pendiente', requests: 713, createdAt: '2025-11-15' },
  { id: 47, name: 'Proyecto Esfera Lite', description: 'Simulador 3D liviano.', status: 'Activo', requests: 1284, createdAt: '2025-11-16' },
  { id: 48, name: 'Proyecto Sendero Cloud', description: 'Ruteo distribuido cloud.', status: 'Activo', requests: 2099, createdAt: '2025-11-17' },
  { id: 49, name: 'Proyecto Halo Sync', description: 'Sincronizador de canales luminosos.', status: 'Inactivo', requests: 93, createdAt: '2025-11-18' },
  { id: 50, name: 'Proyecto Brújula Pro', description: 'Orientación indoor avanzada.', status: 'Activo', requests: 1756, createdAt: '2025-11-19' }
]
</script>

<template>
  <div class="container-fluid">
    <!-- Header -->
    <UiHeaderContent
      title="Web Block: Analysis Cards Layout"
      subtitle="Page for view all analysis data in cards layout format."
      actions
    >
      <template #actions>
        <UiButtonGroup>
          <UiButtonGroup connected>
            <UiButtonTooltip
              variant="outline"
              icon
              tooltip-text="Auto refresh data"
            >
              <template #icon>
                <UiIconMaterial icon-code="&#xe863;" />
              </template>
            </UiButtonTooltip>
            <UiButtonTooltip
              variant="outline"
              icon
              tooltip-text="Download report"
            >
              <template #icon>
                <UiIconMaterial icon-code="&#xe2c4;" />
              </template>
            </UiButtonTooltip>
            <UiButtonTooltip
              variant="outline"
              icon
              tooltip-text="Change layout"
            >
              <template #icon>
                <UiIconMaterial icon-code="&#xe8d6;" />
              </template>
            </UiButtonTooltip>
          </UiButtonGroup>
          <UiButton
            variant="filled"
            color="primary"
            text="Filters"
          >
            <template #icon>
              <UiIconMaterial icon-code="&#xe152;" />
            </template>
          </UiButton>
        </UiButtonGroup>
      </template>
    </UiHeaderContent>

    <!-- Content -->
    <div class="row mb-3">
      <div class="col-md-12">
        <div class="d-grid grid-repeat-cols-2 grid-repeat-cols-md-6 grid-repeat-cols-xl-10 gap-3">
          <div
            v-for="item in cardGridItems"
            :key="item.id"
            class="border position-relative rounded-sm cursor-pointer"
          >
            <img
              src="https://images.pexels.com/photos/27910918/pexels-photo-27910918.jpeg"
              class="img-fluid img-fit-cover h-fixed"
              style="--h-fixed: 200px;"
              alt="Card Image"
            >
            <div class="bg-frosted w-100 position-absolute bottom-0 py-2 px-2 rounded-b-sm">
              <div>
                <p class="caption mb-0">
                  {{ item.name }}
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="caption mb-0">
                  {{ item.createdAt }}
                </p>
                <p class="caption mb-0">
                  {{ item.requests }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
