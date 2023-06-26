<script>
export default {
    data() {
        return {
            itens: {
                'HeroID': '',
                'Name': '',
                'Gender': '',
                'Rank': '',
                'Class': '',
                'Abilities': ''
            },
            editedIndex: ref(-1),
            items: ref([]),
            config: useRuntimeConfig(),
            pageCount: ref(0),
            errorMSG: '',
        }
    },
    created() {
        this.getPageCount()
    },
    methods: {

        openDrawer() {
            this.$refs.drawer.drawer = true
        },
        async getPageCount() {
            const data = await $fetch(`${this.config.public.API_URL}/prest/public/heroes?_count=*`, {
                headers: { Authorization: `Bearer ${this.config.public.API_TOKEN}` }
            })

            this.pageCount = data[0].count
        },
        async save() {

            const editedItem = this.itens
            await $fetch(`${this.config.public.API_URL}/prest/public/heroes`, {
                headers: { Authorization: `Bearer ${this.config.public.API_TOKEN}` },
                method: 'POST',
                body: body,
            }).then(data => {
                if (!data.error) {
                    if (this.editedIndex > -1) {
                        Object.assign(this.items[this.editedIndex], editedItem.value)
                    } else {
                        this.items.push(editedItem.value)
                    }
                }
            }).catch((error) => {
                this.errorMSG = "Erro encontrado na requisição."
            })
            close()
            navigateTo('/heroes-crud/home')
        }
    }
}
</script>

<template>
    <v-container>
        <v-row>
            <v-col align="center">
                <h1 class="text--underline">Creating "{{ itens.Name }}#{{ pageCount }}"</h1>
                <h4 style="color: red;">{{ errorMSG }}</h4>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="itens.Name" label="Name"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-select label="Select" :items="['Male', 'Female']" v-model="itens.Gender"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="itens.Rank" label="Rank"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="itens.Class" label="Class"></v-text-field>
            </v-col>
            <v-col cols="12" sm="10" md="12">
                <v-text-field v-model="itens.Abilities" label="Abilities"></v-text-field>
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

