<script setup lang="ts">
import type { UiSidebar } from '@colorffy/ui'
import { NuxtLink } from '#components'

/** Data */
const sidebarCollapse = useState<boolean>('sidebarCollapse', () => false)

/** Computed */
const appVersion = useAppVersion()
const blocksLinks = [
  { name: 'Dashboard', icon: '&#Xe66b;', routeName: 'blocks', tooltipText: 'Dashboard Page' },
  { name: 'DataTable Display', icon: '&#xe8f2;', routeName: 'blocks-crud-view-all-table', tooltipText: '(CRUD) DataTable Display Page' },
  { name: 'Cards Display', icon: '&#xeb75;', routeName: 'blocks-crud-view-all-cards', tooltipText: '(CRUD) Cards Display Page' },
  { name: 'Create / Update', icon: '&#xe147;', routeName: 'blocks-crud-create', tooltipText: '(CRUD) Create / Update Page' },
  { name: 'View Document', icon: '&#xf587;', routeName: 'blocks-crud-view-doc', tooltipText: '(CRUD) View Doc Page' },
  { name: 'Analysis Cards', icon: '&#xe85c;', routeName: 'blocks-analysis-cards-layout', tooltipText: 'Analysis Cards Layout Page' },
  { name: 'Chat Detail', icon: '&#xe0ca;', routeName: 'blocks-analysis-chat-detail', tooltipText: 'Analysis Chat Detail Page' }
]
const componentsLinks = [
  { name: 'Buttons', icon: '&#xe06c;', routeName: 'components', tooltipText: 'Buttons Page' },
  { name: 'Cards', icon: '&#xf609;', routeName: 'components', tooltipText: 'Cards Page' }
]
</script>

<template>
  <UiSidebar
    bordered
    :rail="sidebarCollapse"
  >
    <!-- Header -->
    <UiSidebarHeader>
      <NuxtImg
        src="/icon-pwa.png"
        alt="App Icon"
        class="img-fluid"
      />
      <UiSidebarDropdown
        title="Nuxt"
        subtitle="Project Template"
        :interactive="false"
      />
    </UiSidebarHeader>

    <!-- Body  -->
    <UiSidebarBody>
      <!-- Links -->
      <UiSidebarText text="Platform UI" />
      <UiSidebarLink
        id="link-get-started-docs"
        text="Get Started"
        icon="&#xe88a;"
        :as="NuxtLink"
        :to="{ name: 'template-get-started' }"
        tooltip-text="Get started"
      />

      <!-- Blocks -->
      <UiSidebarGroup
        text="Blocks"
        icon="&#xf2bf;"
      >
        <UiSidebarLink
          v-for="link in blocksLinks"
          :id="`link-${link.name.toLowerCase().replace(/\s+/g, '-')}-docs`"
          :key="link.routeName + link.name"
          :as="NuxtLink"
          :to="{ name: link.routeName }"
          :text="link.name"
          :icon="link.icon"
          :tooltip-text="link.tooltipText"
          tooltip-placement="right-start"
          child
        />
      </UiSidebarGroup>

      <!-- Components -->
      <UiSidebarText text="Documentation" />
      <UiSidebarGroup
        text="Components"
        icon="&#xe574;"
        collapsible
      >
        <UiSidebarLink
          v-for="link in componentsLinks"
          :id="`link-${link.name.toLowerCase().replace(/\s+/g, '-')}-docs`"
          :key="link.routeName + link.name"
          :as="NuxtLink"
          :to="{ name: link.routeName }"
          :text="link.name"
          :icon="link.icon"
          :tooltip-text="link.tooltipText"
          tooltip-placement="right-start"
          child disabled
        />
      </UiSidebarGroup>
    </UiSidebarBody>

    <!-- Footer -->
    <UiSidebarFooter>
      <div>
        <UiBadge
          :text="`v${appVersion}`"
          title="Versión del cliente"
          variant="outline"
          icon-code="&#xf720;"
          icon-class="text-accent-fixed"
        />
      </div>
    </UiSidebarFooter>
  </UiSidebar>
</template>
