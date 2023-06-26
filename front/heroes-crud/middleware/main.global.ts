export default defineNuxtRouteMiddleware((to, from) => {

  console.log(1)
  if (!to.fullPath.includes('heroes-crud/create') && !to.fullPath.includes('heroes-crud/edit'))
  {
    navigateTo('/heroes-crud/home')
  }
  })