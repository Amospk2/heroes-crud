import { useSessionStorage } from '@vueuse/core';

export default defineNuxtRouteMiddleware((to, from) => {
    if (isHydrated.value) {
        return doCheck(to, from)
    }
    onHydrated(() => {
        doCheck(to, from)
    })

})

function doCheck(to: any, from: any) {
    const user = useSessionStorage('current-user', null)
    if (user.value === null) {
        if (to.fullPath !== '/select-user') {
            return navigateTo('/select-user')
        }
    }

}