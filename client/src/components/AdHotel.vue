<template>
  <v-card
    class="mx-auto my-4"
  >
    <v-img
      height="250"
      class="grey lighten-2" 
      :src="hotel.image"
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

    <v-card-title class="font-weight-light">{{ hotel.name }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text darkText--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • {{ hotel.location }}
      </div>

      <div>{{ hotel.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title class="font-weight-light">Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="primary accent-4 white--text"
        column
      >
        <v-chip v-for="(option, index) in hotel.availability" :key="index">
          {{ option.option }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-divider class="mt-1 mb-4"></v-divider>  
    <v-card-actions>
      <v-btn
        color="red"
        text
        block
        @click="deleteHotel(hotel._id)"
      >
        DELETE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Hotel',
  props: ['hotel'],
  methods: {
    ...mapActions(['deleteHotel'])
  }
}
</script>