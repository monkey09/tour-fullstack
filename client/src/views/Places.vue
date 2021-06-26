<template>
  <section>
    <v-progress-linear :value="placesProgress" :active="placesProgress < 100 ? true : false"></v-progress-linear>
    <v-container>
      <h1 class="font-weight-light darkText--text uk-heading-bullet">PLACES</h1>
      <v-row v-if="!loaded">
        <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-skeleton-loader
            class="mx-auto my-4"
            elevation="2"
            type="image, article, divider, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col 
          cols="12" sm="6" md="4" lg="3"
          v-for="(place, index) in places" :key="index"
        >
          <Place 
            :place="place" 
            @openTour="openDialog(place._id)" 
            @viewTours="openDialog2(place._id)" 
          />
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      max-width="500"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>CREATE TOUR</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="createTour"
            >
              SAVE
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-sheet class="pa-5">
          <v-text-field
            label="title"
            v-model="title"
            prepend-icon="mdi-pencil"
          ></v-text-field>
          <v-text-field
            label="price"
            v-model="price"
            prepend-icon="mdi-currency-usd"
          ></v-text-field>
          <v-file-input
            label="image"
            v-model="file"
            prepend-icon="mdi-camera"
          ></v-file-input>
          <v-textarea
            v-model="description"
            label="content"
            prepend-icon="mdi-text"
          ></v-textarea>
        </v-sheet>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog2"
      transition="dialog-bottom-transition"
      max-width="500"
    >
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog2 = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>PLACE TOURS</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <template v-if="!loaded2">
          <v-skeleton-loader
          v-for="(n, index) in 8"
          :key="index"
          class="mx-auto"
          type="list-item-two-line, divider"
        ></v-skeleton-loader>
        </template>
         <v-list v-if="loaded2" two-line>
           <template v-for="(placeTour, index) in placeTours">
              <v-list-item 
               :key="placeTour._id"
              >
                <v-list-item-avatar>
                  <v-img
                    :src="placeTour.creator.avatar"
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
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ placeTour.creator.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ placeTour.title }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ placeTour.description }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-icon>
                  <v-btn
                    color="green"
                    dark
                    small
                    fab
                  >
                    $ {{ placeTour.price }}
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
              <v-divider
                v-if="index < placeTours.length - 1"
                :key="index"
              >
              </v-divider>
           </template>
        </v-list>
      </v-card>
    </v-dialog>
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
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Place from '@/components/Place'

export default {
  name: 'places',
  data () {
    return {
      loaded: false,
      loaded2: false,
      dialog: false,
      dialog2: false,
      snackbar: false,
      snackbarType: '',
      text: '',
      title: '',
      price: '',
      description: '',
      file: [],
      location: ''
    }
  },
  computed: {
    ...mapGetters(['places', 'placesProgress', 'placeTours'])
  },
  created () {
    this.getPlaces().then(() => {
      this.loaded = true
    })
  },
  components: {
    Place
  },
  methods: {
    ...mapActions(['getPlaces', 'addTour', 'getPlaceTours']),
    openDialog (id) {
      this.dialog = true
      this.location = id
    },
    openDialog2 (id) {
      this.dialog2 = true
      this.getPlaceTours(id).then(() => {
        this.loaded2 = true
      })
    },
    createTour () {
      if (!this.description || !this.file || !this.title) {
        this.activateSnackbar('error', 'Provide tour information')
        return
      }
      const formData = new FormData()
      formData.append('title', this.title)
      formData.append('price', this.price)
      formData.append('description', this.description)
      formData.append('location', this.location)
      formData.append('file', this.file)
      this.addTour(formData).then(() => {
        this.dialog = false
        this.description = ''
        this.location = ''
        this.activateSnackbar('success', 'Tour created!')
      }).catch(() => {
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