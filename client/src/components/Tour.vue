<template>
  <v-card
    v-if="user"
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
    <v-snackbar 
      v-model="snackbar2" 
      outlined
      color="red"
      top
      right
    >
        YOU ARE IN A TOUR DO YOU WANNA LEAVE IT?
      <v-btn
        text
        @click="attemptJoin"
      >
        Yes
      </v-btn>
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar2 = false"
        >
          No
        </v-btn>
      </template>
    </v-snackbar>
    <template slot="progress">
      <v-progress-linear
        color="green"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="250"
      class="grey lighten-2" 
      :src="tour.image"
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

    <v-card-title class="pt-15" style="position:relative">
      <v-btn
          color="primary"
          dark
          absolute
          top
          right
          fab
        >
          $ {{ tour.price }}
        </v-btn>
      <v-avatar size="50">
        <v-img
          :src="tour.creator.avatar"
          class="grey lighten-2"
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
      </v-avatar>
      <div class="d-flex flex-column ">
        <span class="ml-3 font-weight-light">{{ tour.creator.name }}</span>
        <span class="ml-3 clock--text caption">{{ tour.createdAt | moment("from") }}</span>
      </div>
      <v-spacer></v-spacer>
      <v-badge
        class="mr-2"
        :color="tour.users.length == 10 ? 'grey' : 'green'"
        overlap
        :content="tour.users.length || '0'"
      >
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-badge>
    </v-card-title>
    <v-card-text class="mt-4">
      <div class="text-uppercase d-inline">
        {{ tour.title }}
      </div>
      <div class="d-inline float-right">
        <v-icon class="mr-1">mdi-map-marker-outline</v-icon>•<span class="ml-2">{{ tour.location.location }}</span>
      </div>
      <v-divider class="mt-3 mb-4"></v-divider>
      <div class="">
        {{ tour.description }}
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text v-if="tour.users.length" class="py-0 text-center">
      <v-chip-group
        column
      >
        <v-chip
          color="green"
          outlined
          v-for="(user, index) in tour.users" :key="index"
        >
          <v-avatar left>
            <v-img 
              :src="user.avatar"
              class="grey lighten-2"
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
          </v-avatar>
          {{ user.name }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="user.tour != tour._id"
        color="green"
        text
        block
        :disabled="tour.users.length == 10"
        @click="join"
      >
        JOIN
      </v-btn>
      <v-btn
        v-if="user.tour == tour._id"
        @click="unJoin"
        color="red"
        block
        text
      >
        LEAVE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Tour',
  props: ['tour'],
  data () {
    return {
      loading: false,
      snackbar: false,
      snackbar2: false,
      snackbarType: '',
      text: '',
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['joinTour', 'unJoinTour', 'updateTour', 'shiftTour', 'leaveTour']),
    join () {
      if (this.user.tour) this.snackbar2 = true
      else this.attemptJoin ()
    },
    unJoin () {
      let room = this.user.tour
      this.shiftTour({ user: this.user, tourId: this.user.tour })
      this.unJoinTour().then(() => {
        this.leaveTour()
        this.activateSnackbar('success', 'Tour left!')
        this.$emit('tourLefted', room)
      })
    },
    attemptJoin () {
      this.loading = true
      this.snackbar2 = false
      if(this.user.tour) this.shiftTour({ user: this.user, tourId: this.user.tour })
      this.joinTour(this.tour._id).then((user) => {
        this.updateTour({ user, tourId: this.tour._id })
        this.loading = false
        this.activateSnackbar('success', 'Tour joined!')
        this.$emit('tourJoined')
      }).catch(() => {
        this.loading = false
        this.activateSnackbar('error', 'Tour already completed!')
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