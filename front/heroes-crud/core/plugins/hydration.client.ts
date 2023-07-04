import { isHydrated } from "@/core/composables/vue"
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hooks.hookOnce('app:suspense:resolve', () => {
    isHydrated.value = true
  })
})
