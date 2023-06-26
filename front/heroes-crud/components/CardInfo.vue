<script>
export default {
    props: ['editedItem'],
}
</script>

<template>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem['Name']" label="Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem['Gender']" label="Gender"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem['Rank']" label="Rank"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem['Class']" label="Class"></v-text-field>
                </v-col>
                <v-col cols="12" sm="10" md="10">
                    <v-text-field v-model="editedItem['Abilities']" label="Abilities"></v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-card-text>
</template>