<script setup>
import { useFetch } from 'nuxt/app';

const search = ref('')
const name = ref('')
const values = reactive({
    pageCount: 0,
    loading: false,
    error: false,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    headers: [
        { title: 'HeroID', align: 'start', sortable: false, key: 'HeroID' },
        { title: 'Name', key: 'Name' },
        { title: 'Gender', key: 'Gender' },
        { title: 'Rank', key: 'Rank' },
        { title: 'Class', key: 'Class' },
        { title: 'Abilities', key: 'Abilities' },
        { title: 'Actions', key: 'actions', sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
        name: '',
        gender: '',
        rank: '',
        class: '',
        abilities: [''],
    },


})
const config = useRuntimeConfig()


const formTitle = computed(() => {
    return values.editedIndex === -1 ? 'New Item' : 'Edit Item'
})

async function initialize() {
    values.items = await $fetch(`${config.public.API_URL}/prest/public/heroes?_page=1`,
        { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } }).catch((err) => {
            values.error = true
        })
}

async function getPageCount() {

    const data = await $fetch(`${config.public.API_URL}/prest/public/heroes?_count=*`,
        { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } })

    values.pageCount = data[0].count
}
onMounted(() => {
    getPageCount()
    initialize()

})

watch(
    values.dialog, (val) => {
        val || close()
    }
)

watch(values.dialogDelete, (val) => {
    val || closeDelete()
}
)

watch(name, () => {
    search.value = String(Date.now())
})


function deleteItem(item) {
    values.editedIndex = values.items.indexOf(item)
    values.editedItem = { ...item }
    values.dialogDelete = true
}
function goEdit(id)
{
    navigateTo(`/heroes-crud/edit/${id}`)
}
async function deleteItemConfirm() {
    values.items.splice(values.editedIndex, 1)

    await useFetch(`${config.public.API_URL}/prest/public/heroes?HeroID=${values.editedItem['HeroID']}`,
        {
            method: 'DELETE',
        })
    getPageCount()
    closeDelete()
}


function closeDelete() {
    values.dialogDelete = false
    values.editedItem = { ...defaultItem }
    values.editedIndex = -1
}

async function save() {
    let method = 'PUT'
    let endpoint = `?HeroID=${values.editedItem["HeroID"]}`
    let body = {
        'Name': values.editedItem['Name'],
        'Gender': values.editedItem['Gender'],
        'Rank': values.editedItem['Rank'],
        'Class': values.editedItem['Class'],
        'Abilities': values.editedItem['Abilities']
    }
    getPageCount()
    await useFetch(`${config.public.API_URL}/prest/public/heroes${endpoint}`,
        {
            headers: { Authorization: `Bearer ${config.public.API_TOKEN}` },
            method: method,
            body: body,
        }).then(data => {
            if (!data.error.value) {
                if (editedIndex.value > -1) {
                    Object.assign(values.items[values.editedIndex], values.editedItem)
                } else {
                    values.items.push(values.editedItem)
                }
            }
        })
    close()
}

async function loadItems({ page, itemsPerPage }) {
    values.loading = true
    await $fetch(`${config.public.API_URL}/prest/public/heroes?_page=${page}&_page_size=${values.itemsPerPage}&Name=$like.%25${name.value}%25`,
        { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } }).catch((err) => {
            values.error = true
        }).then((value) => {
            values.loading = false
            values.items = value
        })
    getPageCount()
}

</script>

<template>
    <v-card>
        <LoadAndError :error="values.error"></LoadAndError>
        <v-data-table-server :headers="values.headers" :items-length="values.pageCount" v-model:items-per-page="values.itemsPerPage"
            :items="values.items" :search="search" item-value="name" @update:options="loadItems" :loading="values.loading"
            :sort-by="[{ key: 'HeroID', order: 'asc' }]" class="elevation-1">
            
            <template v-slot:top>

                <v-toolbar flat>
                    <v-toolbar-title>Heroes list</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="values.dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-text-field v-model="name" hide-details placeholder="Search name..." class="ma-2"
                                density="compact"></v-text-field>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="values.dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="goEdit(item.raw.HeroID)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item.raw)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table-server>
    </v-card>
</template>