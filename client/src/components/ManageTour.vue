<template>
  <v-card
    v-if="tourguide"
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
        color="green"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img
      height="250"
      class="grey lighten-2" 
      :src="manageTour.image"
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
        $ {{ manageTour.price }}
      </v-btn>
      <v-avatar size="50">
        <v-img
          :src="tourguide.avatar"
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
        <span class="ml-3 font-weight-light">{{ tourguide.name }}</span>
        <span class="ml-3 clock--text caption">{{ manageTour.createdAt | moment("from") }}</span>
      </div>
      <v-spacer></v-spacer>
      <v-badge
        class="mr-2"
        :color="manageTour.users.length == 10 ? 'grey' : 'green'"
        overlap
        :content="manageTour.users.length || '0'"
      >
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-badge>
    </v-card-title>
    <v-card-text class="mt-4">
      <div class="text-uppercase d-inline">
        {{ manageTour.title }}
      </div>
      <div class="d-inline float-right">
        <v-icon class="mr-1">mdi-map-marker-outline</v-icon>•<span class="ml-2">{{ manageTour.location.location }}</span>
      </div>
      <v-divider class="mt-3 mb-4"></v-divider>
      <div class="">
        {{ manageTour.description }}
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text v-if="manageTour.users.length" class="py-0">
      <v-chip-group
        column
      >
        <template
          v-for="(user, index) in manageTour.users"
        >
          <v-chip
            color="green"
            close
            @click:close="removeUser(user._id)"
            :key="index"
            outlined
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
        </template>
      </v-chip-group>
    </v-card-text>
    <v-card-actions>
      <v-btn
        @click="deleteManageTour"
        color="red"
        block
        text
      >
        DELETE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ManageTour',
  props: ['manageTour'],
  data () {
    return {
      loading: false,
      snackbar: false,
      snackbarType: '',
      text: '',
    }
  },
  computed: {
    ...mapGetters(['tourguide'])
  },
  methods: {
    ...mapActions(['deleteUser', 'shiftManageTour', 'deleteTour']),
    removeUser (id) {
      this.loading = true
      this.deleteUser({ id, tour: {tour: this.manageTour._id} }).then(() => {
        this.shiftManageTour({ id, tourId: this.manageTour._id })
        this.activateSnackbar('success', 'User deleted!')
        this.loading = false
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong!')
        this.loading = false
      })
    },
    deleteManageTour () {
      this.deleteTour(this.manageTour._id).catch(() => {
        this.activateSnackbar('error', 'Something went wrong!')
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