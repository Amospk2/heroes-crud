<script setup>
import { useFetch } from 'nuxt/app';
const config = useRuntimeConfig()
const pageCount = ref(0)
const loading = ref(false)
const currentPage = ref(1)
const error = ref(false)
const dialog = ref(false)
const dialogDelete = ref(false)
const headers = ref([
    { title: 'Sr. No.', align: 'start', sortable: false, key: 'Sr. No.' },
    { title: 'Name', key: 'Name' },
    { title: 'Gender', key: 'Gender' },
    { title: 'Rank', key: 'Rank' },
    { title: 'Class', key: 'Class' },
    { title: 'Abilities', key: 'Abilities' },
    { title: 'Actions', key: 'actions', sortable: false },
])
const desserts = ref([])
const editedIndex = ref(-1)
const editedItem = ref({
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
})
const defaultItem = ref({
    name: '',
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
})

const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'New Item' : 'Edit Item'
})

async function initialize() {

    desserts.value = await $fetch(`${config.public.API_URL}/prest/public/heroes?_page=${currentPage.value}`,
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

function editItem(item) {
    editedIndex.value = desserts.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialog.value = true
}

function deleteItem(item) {
    editedIndex.value = desserts.value.indexOf(item)
    editedItem.value = { ...item }
    dialogDelete.value = true
}

function deleteItemConfirm() {
    desserts.value.splice(editedIndex.value, 1)
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
    if (editedIndex.value > -1) {
        Object.assign(desserts.value[editedIndex.value], editedItem.value)
    } else {
        await useFetch(`${config.public.API_URL}/prest/public/heroes?Sr. No.=${editedIndex.value}`,
            {
                headers: { Authorization: `Bearer ${config.public.API_TOKEN}` },
                body: {

                }
            }).then(data => {
                if (!data.data.value.apiError) {
                    desserts.value.push(editedItem.value)
                }
            })

    }
    close()
}

function change_page(page) {
    currentPage = page
    initialize()
}


</script>

<template>
    <v-card>
        <LoadAndError :error="error"></LoadAndError>
        <v-data-table 
        :loading="loading"
        :headers="headers" :items="desserts" :sort-by="[{ key: 'Sr. No.', order: 'asc' }]" class="elevation-1"
            @update:page="change_page">

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
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
            <template v-slot:bottom>
                <div class="text-center pt-2">
                    <v-pagination v-model="page" :length="pageCount"></v-pagination>

                </div>
            </template>
        </v-data-table>
    </v-card>
</template>