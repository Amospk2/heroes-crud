<script setup>
import { useFetch } from 'nuxt/app';
const config = useRuntimeConfig()
const pageCount = ref(0)
const name = ref('')
const search = ref('')
const loading = ref(false)
const error = ref(false)
const itemsPerPage = ref(10)
const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref([
    { title: 'HeroID', align: 'start', sortable: false, key: 'HeroID' },
    { title: 'Name', key: 'Name' },
    { title: 'Gender', key: 'Gender' },
    { title: 'Rank', key: 'Rank' },
    { title: 'Class', key: 'Class' },
    { title: 'Abilities', key: 'Abilities' },
    { title: 'Actions', key: 'actions', sortable: false },
])
const items = ref([])
const editedIndex = ref(-1)
const editedItem = ref({
    name: '',
    gender: '',
    rank: '',
    class: '',
    abilities: [''],
})
const defaultItem = ref({
    name: '',
    gender: '',
    rank: '',
    class: '',
    abilities: [''],
})

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})

async function initialize() {
    items.value = await $fetch(`${config.public.API_URL}/prest/public/heroes?_page=1`,
        { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } }).catch((err) => {
            error.value = true
        })
}

async function getPageCount() {

    const data = await $fetch(`${config.public.API_URL}/prest/public/heroes?_count=*`,
        { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } })

    pageCount.value = data[0].count
}
onMounted(() => {
    getPageCount()
    initialize()

})

watch(
    dialog, (val) => {
        val || close()
    }
)

watch(dialogDelete, (val) => {
    val || closeDelete()
}
)

watch(name, () => {
    search.value = String(Date.now())
})

function editItem(item) {
    editedIndex.value = items.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialog.value = true
}

function deleteItem(item) {
    editedIndex.value = items.value.indexOf(item)
    editedItem.value = { ...item }
    dialogDelete.value = true
}

async function deleteItemConfirm() {
    items.value.splice(editedIndex.value, 1)

    await useFetch(`${config.public.API_URL}/prest/public/heroes?HeroID=${editedItem.value['HeroID']}`,
        {
            method: 'DELETE',
        })
    getPageCount()
    closeDelete()
}

function close() {
    dialog.value = false
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
}

function closeDelete() {
    dialogDelete.value = false
    editedItem.value = { ...defaultItem }
    editedIndex.value = -1
}

async function save() {
    let method = 'POST'
    let endpoint = ''
    let body = {
        'Name': editedItem.value['Name'],
        'Gender': editedItem.value['Gender'],
        'Rank': editedItem.value['Rank'],
        'Class': editedItem.value['Class'],
        'Abilities': editedItem.value['Abilities']
    }
    if (editedIndex.value > -1) {
        method = 'PUT'
        endpoint = `?HeroID=${editedItem.value["HeroID"]}`
    } else {
        body['HeroID'] = pageCount.value + 1
    }
    getPageCount()
    console.log(body)
    await useFetch(`${config.public.API_URL}/prest/public/heroes${endpoint}`,
        {
            headers: { Authorization: `Bearer ${config.public.API_TOKEN}` },
            method: method,
            body: body,
        }).then(data => {
            if (!data.error.value) {
                if (editedIndex.value > -1) {
                    Object.assign(items.value[editedIndex.value], editedItem.value)
                } else {
                    items.value.push(editedItem.value)
                }
            }
        })
    close()
}

async function loadItems({ page, itemsPerPage }) {
    loading.value = true
    await $fetch(`${config.public.API_URL}/prest/public/heroes?_page=${page}&_page_size=${itemsPerPage}&Name=$like.%25${name.value}%25`,
        { headers: { Authorization: `Bearer ${config.public.API_TOKEN}` } }).catch((err) => {
            error.value = true
        }).then((value) => {
            loading.value = false
            items.value = value
        })
    getPageCount()
}

</script>

<template>
    <v-card>
        <LoadAndError :error="error"></LoadAndError>
        <v-data-table-server :headers="headers" :items-length="pageCount" v-model:items-per-page="itemsPerPage"
            :items="items" :search="search" item-value="name" @update:options="loadItems" :loading="loading"
            :sort-by="[{ key: 'HeroID', order: 'asc' }]" class="elevation-1">

            <template v-slot:top>

                <v-toolbar flat>
                    <v-toolbar-title>My CRUD</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-btn color="primary" dark class="mb-2" v-bind="props">
                                New Item
                            </v-btn>
                            <v-text-field v-model="name" hide-details placeholder="Search name..." class="ma-2"
                                density="compact"></v-text-field>

                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <CardInfo :editedItem="editedItem" />

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
                    <v-dialog v-model="dialogDelete" max-width="500px">
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
                <v-icon size="small" class="me-2" @click="editItem(item.raw)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item.raw)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table-server>
    </v-card>
</template>