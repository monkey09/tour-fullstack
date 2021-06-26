<template>
  <v-card
    :loading="loading"
    class="mx-auto my-4"
  >
    <v-snackbar 
      v-model="snackbar" 
      :color="snackbarType"
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <template slot="progress">
      <v-progress-linear
        color="orange"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      class="grey lighten-2" 
      :src="restaurant.image"
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

    <v-card-title class="font-weight-light">{{ restaurant.name }}</v-card-title>

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
        $ • {{ restaurant.location }}
      </div>

      <div>{{ restaurant.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title class="font-weight-light">Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="orange accent-4 white--text"
        column
      >
        <v-chip v-for="(option, index) in restaurant.availability" :key="index">
          {{ option.option }}
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange darken-3"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Restaurant',
  props: ['restaurant'],
  data: () => ({
    loading: false,
    selection: 0,
    snackbar: false,
    snackbarType: '',
    text: '',
  }),
  methods: {
    ...mapActions(['reserveRestaurant']),
    reserve () {
      const restaurant = {
        restaurantId: this.restaurant._id,
        reservation: this.restaurant.availability[this.selection].option
      }
      this.loading = true
      this.reserveRestaurant({ restaurant }).then(() => {
        this.loading = false
        this.activateSnackbar('success', 'Restaurant reserved!')
      }).catch(() => {
        this.loading = false
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    activateSnackbar (type, text) {
      this.text = text
      this.snackbarType = type
      this.snackbar = true
    }
  }
}
</script>