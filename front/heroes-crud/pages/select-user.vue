
<script setup>
import { useSessionStorage } from '@vueuse/core';



const selectValue = ref('')
function setCurrentUser(value) {
    const user = useSessionStorage('current-user', null)
    user.value = value
}

function goToHome() {
    return navigateTo('/heroes-crud/home')
}
</script>
<template>
    <div class="text-center space">
        <v-select v-model="selectValue" @update:model-value="setCurrentUser" label="Escolha a sua conta"
            :items="['Visitante', 'Amóspk2', 'Wesley']" />
        <v-btn v-if="selectValue.length" @click="goToHome">
            Choise
        </v-btn>
    </div>
</template>

<style>
.space {
    margin: 15% 15% 15% 15%;
}
</style>