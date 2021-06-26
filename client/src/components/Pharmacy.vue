<template>
  <v-card
    class="mx-auto my-4"
  >
    <v-img
      height="250"
      class="grey lighten-2" 
      :src="pharmacy.image"
    >
      <template v-slot:placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>

    <v-card-title class="font-weight-light">{{ pharmacy.name }}</v-card-title>

    <v-card-text>
      <div class="mb-4 subtitle-1">
        $ • {{ pharmacy.location }}
      </div>
      <div>{{ pharmacy.description }}</div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-title class="font-weight-light">
      Contacts
      <v-spacer></v-spacer>
      <v-chip color="success" dark>
        <v-icon class="mr-2">mdi-phone</v-icon>
        {{ pharmacy.contacts }}
      </v-chip>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  name: 'Pharmacy',
  props: ['pharmacy']
}
</script>