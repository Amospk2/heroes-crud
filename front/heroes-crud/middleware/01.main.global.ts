import getInformation from "@/utils/getInformaton"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const data = await getInformation()
  if (data) {
    if (
      to.fullPath !== '/heroes-crud/create'
      && !to.fullPath.includes('/heroes-crud/edit')
      && to.fullPath !== '/heroes-crud/home'
      && to.fullPath !== '/select-user'
      && to.fullPath !== '/login'
    ) {
      
      return navigateTo('/heroes-crud/home')
    }
  }
})