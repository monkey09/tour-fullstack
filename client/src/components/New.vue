<template>
  <v-card>
    <v-img
      :src="oneNew.image"
      class="grey lighten-2"
      min-height="200px"
      max-height="400px"
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
    <v-card-title class="font-weight-light d-flex flex-column align-start">
      <span>{{ oneNew.title }}</span>
      <span class="clock--text caption">{{ oneNew.createdAt | moment("from") }}</span>
    </v-card-title>
    <v-divider class="mt-1 mx-4 mb-4"></v-divider>
    <v-card-subtitle>
      {{ oneNew.description }}
    </v-card-subtitle>    
  </v-card>
</template>
<script>
export default {
  name: 'New',
  props: ['oneNew']
}
</script>