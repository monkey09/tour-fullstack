<template>
  <v-card
    class="mx-auto my-4"
  >
    <v-img
      height="250"
      class="grey lighten-2" 
      :src="place.image"
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
    <v-card-title class="font-weight-light">{{ place.name }}</v-card-title>
    <v-card-text>
      <div class="mb-4 subtitle-1">
        $ • {{ place.location }}
      </div>

      <div>{{ place.description }}</div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'Place',
  props: ['place']
}
</script>