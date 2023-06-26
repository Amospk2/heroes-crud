<template>
    <v-card>
        <v-layout>
            <v-app-bar title="Heroes Crud" @click.native="openDrawer"></v-app-bar>

            <NavigationDrawer />
            <v-main>
                <v-container>
                    <v-row>
                        <v-col align="center">
                            <h1 class="text--underline">Create your hero</h1>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="itens.name" label="Name"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="itens.gender" label="Gender"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="itens.rank" label="Rank"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="itens.class" label="Class"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="10" md="8">
                            <v-text-field v-model="itens.abilities" label="Abilities"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="close">
                            Cancel
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="save">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import NavigationDrawer from '~/components/NavigationDrawer.vue'

export default {
    data() {
        return {
            itens: {
                name: '',
                gender: '',
                rank: '',
                class: '',
                abilities: '',
            },
            editedIndex: ref(-1),
            pageCount: ref(0),
            config: useRuntimeConfig(),
            items: ref([]),
        }
    },
    components: {
        NavigationDrawer,
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
            let method = 'POST'
            let endpoint = ''
            const editedItem = this.itens
            let body = {
                'Name': editedItem.name,
                'Gender': editedItem.gender,
                'Rank': editedItem.rank,
                'Class': editedItem.class,
                'Abilities': editedItem.abilities
            }
            if (this.editedIndex > -1) {
                method = 'PUT'
                endpoint = `?HeroID=${editedItem.value["HeroID"]}`
            } else {
                body['HeroID'] = this.pageCount + 1
            }
            await this.getPageCount()
            await $fetch(`${this.config.public.API_URL}/prest/public/heroes${endpoint}`, {
                headers: { Authorization: `Bearer ${this.config.public.API_TOKEN}` },
                method: method,
                body: body,
            }).then(data => {
                if (!data.error) {
                    if (this.editedIndex > -1) {
                        Object.assign(this.items[this.editedIndex], editedItem.value)
                    } else {
                        this.items.push(editedItem.value)
                    }
                }
            })
            close()
            navigateTo('/home')
        }
    }
}
</script>
