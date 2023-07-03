<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'


const { headers, api, pk, error } = defineProps(['headers', 'api', 'pk', 'error'])
const search = ref('')
const name = ref('')
const values = reactive({
    pageCount: 0,
    loading: false,
    itemsPerPage: 10,
    dialogDelete: false,
    items: [],
    editedIndex: -1,
    editedItem: {
        name: '',
        gender: '',
        rank: '',
        class: '',
        abilities: [''],
    }
})


watch(name, () => {
    search.value = String(Date.now())
})

async function deleteItemConfirm() {
    values.items.splice(values.editedIndex, 1)
    await api.deleteItemConfirm(values.editedItem)
    values.pageCount = await api.getPageCount()
    closeDelete()
}

function deleteItem(item) {
    values.editedIndex = values.items.indexOf(item)
    values.editedItem = { ...item }
    values.dialogDelete = true
}


function closeDelete() {
    values.dialogDelete = false
    values.editedIndex = -1
}

async function loadItems({ page, itemsPerPage, sortBy }) {
    values.loading = true
    const search = name.value
    values.items = await api.fetch({ page, itemsPerPage, sortBy, search })
    values.pageCount = await api.getPageCount()
    values.loading = false
}

async function hydratePage() {
    values.loading = true
    const data = await api.initialize()
    values.items = data
    values.pageCount = await api.getPageCount()
    values.loading = false
}

onHydrated(async () => {
    await hydratePage()
})

</script>

<template>
    <v-card>
        <LoadAndError :error="error"></LoadAndError>
        <v-data-table-server :headers="headers" :items-length="values.pageCount"
            v-model:items-per-page="values.itemsPerPage" :items="values.items" :search="search" item-value="name"
            @update:options="loadItems" :loading="values.loading" class="elevation-1">

            <template v-slot:top>

                <v-toolbar flat>

                    <v-toolbar-title>Heroes list</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
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

                <v-dialog left max-width="500px">
                    <template v-slot:activator="{ props }">
                        <v-text-field v-model="name" hide-details placeholder="Search name..." class="ma-2"
                            density="compact"></v-text-field>
                    </template>

                </v-dialog>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon size="small" class="me-2" @click="api.goEdit(item.raw[pk])">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item.raw)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table-server>
    </v-card>
</template>