export default defineNuxtRouteMiddleware((to, from) => {
  if (to.fullPath !== '/heroes-crud/create' && to.fullPath !== '/heroes-crud/edit/' && to.fullPath !== '/heroes-crud/home') {
    navigateTo('/heroes-crud/home')
  }



})  
