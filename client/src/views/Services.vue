<template>
  <section>
    <v-container>
      <h1 class="font-weight-light darkText--text uk-heading-bullet">SERVICES</h1>
      <v-card class="mt-10">
        <v-tabs>
          <v-tab @click="triggerhotels">
            <v-icon left>
              mdi-city
            </v-icon>
             hotels
          </v-tab>
          <v-tab @click="triggerRestaurants">
            <v-icon left>
              mdi-silverware-fork-knife
            </v-icon>
             restaurants
          </v-tab>
          <v-tab @click="triggerTransportations">
            <v-icon left>
              mdi-car
            </v-icon>
            transportaions
          </v-tab>
          <v-tab @click="triggerPharmacies">
            <v-icon left>
              mdi-hospital-box
            </v-icon>
            pharmacies
          </v-tab>
          <v-tab @click="triggerPlaces">
            <v-icon left>
              mdi-map-marker-outline
            </v-icon>
            places
          </v-tab>
          <v-tab-item class="pa-5" :transition="false" :reverse-transition="false">
            <v-progress-linear :value="hotelsProgress" :active="hotelsProgress < 100 ? true : false"></v-progress-linear>
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
                v-for="(hotel, index) in hotels" 
                :key="index" 
                class="py-0"
                cols="12" 
                sm="6" 
                md="4"
                lg="3"
              >
                <Hotel v-if="loaded" :hotel="hotel" />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item class="pa-5" :transition="false" :reverse-transition="false">
            <v-progress-linear :value="restaurantsProgress" :active="restaurantsProgress < 100 ? true : false"></v-progress-linear>
            <v-row v-if="!loaded2">
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
                v-for="(restaurant, index) in restaurants" 
                :key="index" 
                class="py-0"
                cols="12" 
                sm="6" 
                md="4"
                lg="3"
              >
                <Restaurant v-if="loaded2" :restaurant="restaurant" />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item class="pa-5" :transition="false" :reverse-transition="false">
            <v-progress-linear :value="transportationsProgress" :active="transportationsProgress < 100 ? true : false"></v-progress-linear>
            <v-row v-if="!loaded3">
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
                v-for="(transportation, index) in transportations" 
                :key="index" 
                class="py-0"
                cols="12" 
                sm="6" 
                md="4"
                lg="3"
              >
                <Transportation v-if="loaded3" :transportation="transportation" />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item class="pa-5" :transition="false" :reverse-transition="false">
            <v-progress-linear :value="pharmaciesProgress" :active="pharmaciesProgress < 100 ? true : false"></v-progress-linear>
            <v-row v-if="!loaded4">
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
                v-for="(pharmacy, index) in pharmacies" 
                :key="index" 
                class="py-0"
                cols="12" 
                sm="6" 
                md="4"
                lg="3"
              >
                <Pharmacy v-if="loaded4" :pharmacy="pharmacy" />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item class="pa-5" :transition="false" :reverse-transition="false">
            <v-progress-linear :value="placesProgress" :active="placesProgress < 100 ? true : false"></v-progress-linear>
            <v-row v-if="!loaded5">
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
                v-for="(place, index) in places" 
                :key="index" 
                class="py-0"
                cols="12" 
                sm="6" 
                md="4"
                lg="3"
              >
                <Place v-if="loaded5" :place="place" @viewTours="openDialog(place._id)"  />
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-card>
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
            <v-toolbar-title>PLACE TOURS</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <template v-if="!loaded6">
            <v-skeleton-loader
            v-for="(n, index) in 8"
            :key="index"
            class="mx-auto"
            type="list-item-two-line, divider"
          ></v-skeleton-loader>
          </template>
          <v-list v-if="loaded6" two-line>
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
    </v-container>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Hotel from '@/components/Hotel'
import Restaurant from '@/components/Restaurant'
import Transportation from '@/components/Transportation'
import Pharmacy from '@/components/Pharmacy'
import Place from '@/components/Place'

export default {
  name: 'Services',
  data () {
    return {
      dialog: false,
      loaded: false,
      loaded2: false,
      loaded3: false,
      loaded4: false,
      loaded5: false,
      loaded6: false
    }
  },
  computed: {
    ...mapGetters([
      'hotels', 
      'restaurants', 
      'transportations', 
      'pharmacies', 
      'places',
      'hotelsProgress',
      'restaurantsProgress',
      'transportationsProgress',
      'pharmaciesProgress',
      'placesProgress',
      'placeTours'
    ])
  },
  components: {
    Hotel,
    Restaurant,
    Transportation,
    Pharmacy,
    Place
  },
  created () {
    this.getHotels().then(() => {
      this.loaded = true
    })
  },
  methods: {
    ...mapActions([
      'getHotels',
      'getRestaurants', 
      'getTransportations', 
      'getPharmacies', 
      'getPlaces',
      'addTour',
      'getPlaceTours'
    ]),
    openDialog (id) {
      this.dialog = true
      this.loaded6 = false
      this.getPlaceTours(id).then(() => {
        this.loaded6 = true
      })
    },
    triggerRestaurants () {
      this.loaded2 = false
      this.getRestaurants().then(() => {
          this.loaded2 = true
      })
    },
    triggerhotels () {
      this.loaded = false
      this.getHotels().then(() => {
          this.loaded = true
      })
    },
    triggerTransportations () {
      this.loaded3 = false
      this.getTransportations().then(() => {
          this.loaded3 = true
      })
    },
    triggerPharmacies () {
      this.loaded4 = false
      this.getPharmacies().then(() => {
          this.loaded4 = true
      })
    },
    triggerPlaces () {
      this.loaded5 = false
      this.getPlaces().then(() => {
          this.loaded5 = true
      })
    },
  }
}
</script>