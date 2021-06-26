<template>
  <v-card class="mx-auto my-4">
    <v-img
      :src="oneNew.image"
      class="grey lighten-2"
      height="200px"
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
    <v-card-title class="font-weight-light">
      {{ oneNew.title }}
    </v-card-title>
    <v-divider class="mt-1 mx-4 mb-4"></v-divider>
    <v-card-subtitle>
      {{ oneNew.description }}
    </v-card-subtitle>  
    <v-divider class="mt-1 mb-4"></v-divider>  
    <v-card-actions>
      <v-btn
        color="red"
        text
        block
        @click="deleteNew(oneNew._id)"
      >
        DELETE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'New',
  props: ['oneNew'],
  methods: {
    ...mapActions(['deleteNew'])
  }
}
</script>