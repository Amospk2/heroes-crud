import getInformation from "@/core/utils/getInformaton"
import { isHydrated, onHydrated } from "@/core/composables/vue"
import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to, from) => {
  if (isHydrated)
    return resolveRedirect(to)

  onHydrated(() => resolveRedirect(to))
})

async function resolveRedirect(to: RouteLocationNormalized) {
  const data = await getInformation()
  if (data) {
    if (to.fullPath !== '/heroes-crud/create' && to.fullPath !== '/heroes-crud/edit/' && to.fullPath !== '/heroes-crud/home') {
      navigateTo('/heroes-crud/home')
    }
  }
}
