<script setup lang="ts">
import { UiAlertToast } from '@colorffy/ui'
import { vOnClickOutside } from '@vueuse/components'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { NuxtLink } from '#components'

/** Composables */
const route = useRoute()
const router = useRouter()

/** Data */
const sidebarCollapse = useState<boolean>('sidebarCollapse')
const user = {
  displayName: 'Giancarlos Garza',
  email: 'gian@orion.com',
  photoURL: '/avatar.png'
}
const toastRef = ref<InstanceType<typeof UiAlertToast> | null>(null)

const isMenuActive = ref<boolean>(false)
const menuItems = [
  {
    id: 'home',
    to: '/',
    icon: '&#xe66b;',
    text: 'Home',
    ariaLabel: 'Navigate to home page'
  },
  {
    id: 'blocks',
    to: '/blocks',
    icon: '&#xe1bd;',
    text: 'Blocks',
    ariaLabel: 'Go to blocks page'
  }
]

/** Methods */
function toggleUserMenu(): void {
  isMenuActive.value = !isMenuActive.value
}
function closeMenu(): void {
  isMenuActive.value = false
}
function handleMenuItemClick(to: string | object) {
  router.push(to)
}
function handleSignOut(): void {
  if (!toastRef.value)
    return

  toastRef.value.title = 'Signing out...'
  toastRef.value.message = 'You have been signed out successfully.'
  toastRef.value.variant = 'warning'
  toastRef.value.showToast()

  closeMenu()
}
</script>

<template>
  <UiNavbar
    v-on-click-outside="closeMenu"
    sticky
    fluid
  >
    <UiNavbarToggle :collapsed="sidebarCollapse" @toggle="sidebarCollapse = !sidebarCollapse" />
    <UiNavbarTitle :title="(route.meta.pageTitle as string) || 'Dashboard'">
      <template #brand>
        <UiNavbarBrand
          text="Admin"
          initials="A"
          :as="NuxtLink"
          :to="{ name: 'index' }"
        />
      </template>
    </UiNavbarTitle>

    <UiNavbarMobileMenu>
      <UiNavbarAvatar
        v-if="user"
        :src="user.photoURL"
        :alt="`${user.displayName} photo`"
        size="sm"
        @click="isMenuActive = !isMenuActive"
      />
    </UiNavbarMobileMenu>

    <UiNavbarCollapse>
      <UiNavbarNav position="start">
        <UiNavbarItem>
          <div class="input-group">
            <div class="input-group-prefix border border-transparent px-0">
              <UiIconMaterial icon-code="&#xe8b6;" />
            </div>
            <UiInputText
              placeholder="Search for anything..."
              variant="transparent"
              rounded custom-class="px-2"
            />
          </div>
        </UiNavbarItem>
      </UiNavbarNav>
      <UiNavbarNav position="start">
        <UiNavbarItem>
          <UiBadge
            text="ADMIN" variant="outline" custom-class="my-0" icon-code="&#xef3d;"
            icon-class="text-gradient gradient-secondary"
          />
        </UiNavbarItem>
        <UiNavbarItem>
          <UiNavbarAvatar
            v-if="user"
            :src="user.photoURL"
            :alt="`${user.displayName} photo`"
            size="navbar"
            @click="toggleUserMenu"
          />
        </UiNavbarItem>
      </UiNavbarNav>
    </UiNavbarCollapse>

    <!-- Popover Menu -->
    <UiPopoverMenu
      :user="user"
      :is-opened="isMenuActive"
      :menu-items="menuItems"
      :current-route="route"
      @hide-dropdown="isMenuActive = false"
      @menu-item-click="handleMenuItemClick"
    >
      <template #body-extra>
        <hr>
        <ClientOnly>
          <LazyIncludeColorModePicker />
        </ClientOnly>
      </template>
      <template #footer>
        <UiButton
          variant="outline"
          text="Sign out"
          class="btn-block"
          @on-click="handleSignOut"
        >
          <template #icon>
            <UiIconMaterial icon-code="&#xe879;" class="text-danger" />
          </template>
        </UiButton>
      </template>
    </UiPopoverMenu>

    <!-- Toast -->
    <UiAlertToast ref="toastRef" />
  </UiNavbar>
</template>
