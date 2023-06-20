<script setup>

defineProps({
    error: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <v-overlay contained :model-value="error" :persistent="true" class="align-center justify-center">
        <v-tooltip text="Não foi possível carregar as informações desse card">
            <template #activator="{ on, attrs }">
                <v-col align="center">
                    <v-icon large color="amber" dark v-bind="attrs" v-on="on">
                        mdi-alert
                    </v-icon>
                    <br>
                    <span style="color: white;">Não foi possível carregar as informações!</span>
                </v-col>
            </template>

        </v-tooltip>
        <template />
    </v-overlay>
</template>