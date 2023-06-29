<script setup>


const values = reactive({
    itens: {
        'HeroID': 0,
        'Name': '',
        'Gender': '',
        'Rank': '',
        'Class': '',
        'Abilities': ''
    },
    editedIndex: 0,
    items: 0,
    config: useRuntimeConfig(),
    pageCount: 0,
    errorMSG: '',
})

async function getPageCount() {
    const data = await $fetch(`${values.config.public.API_URL}/prest/public/heroes?_count=*`, {
        headers: { Authorization: `Bearer ${values.config.public.API_TOKEN}` }
    })

    values.pageCount = data[0].count
    values.itens.HeroID = values.pageCount
}
async function save() {
    const editedItem = values.itens
    await $fetch(`${values.config.public.API_URL}/prest/public/heroes`, {
        headers: { Authorization: `Bearer ${values.config.public.API_TOKEN}` },
        method: 'POST',
        body: values.itens,
    }).then(data => {
        if (!data.error) {
            if (values.editedIndex > -1) {
                Object.assign(values.items[values.editedIndex], editedItem.value)
            } else {
                values.items.push(editedItem.value)
            }
        }
    }).catch((error) => {
        values.errorMSG = "Erro encontrado na requisição."
    })
    navigateTo('/heroes-crud/home')
}

onHydrated(() => {
    getPageCount()

})
</script>

<template>
    <v-container v-if="isHydrated">
        <v-row>
            <v-col align="center">
                <h1 class="text--underline">Creating "{{ values.itens.Name }}#{{ values.pageCount }}"</h1>
                <h4 style="color: red;">{{ values.errorMSG }}</h4>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="values.itens.Name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-select label="Select" :items="['Male', 'Female']" v-model="values.itens.Gender"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="values.itens.Rank" label="Rank"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="values.itens.Class" label="Class"></v-text-field>
            </v-col>
            <v-col cols="12" sm="10" md="12">
                <v-text-field v-model="values.itens.Abilities" label="Abilities"></v-text-field>
            </v-col>
        </v-row>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="navigateTo('/heroes-crud/home')">
                Cancel
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
            </v-btn>
        </v-card-actions>
    </v-container>
</template>

