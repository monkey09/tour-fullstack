<template>
  <section v-if="admin">
    <v-navigation-drawer
      id="asideBar"
      permanent
      fixed
      class="lightBar darkAside"
      dark
      floating
      expand-on-hover
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group v-model="model1" mandatory>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title>DASHBOARD</v-list-item-title>
          </v-list-item>
          <v-divider class="my-3"></v-divider>
          <v-list-item link @click="triggerPlaces">
            <v-list-item-icon>
              <v-icon>mdi-map-marker-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>PLACES</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="triggerHotels">
            <v-list-item-icon>
              <v-icon>mdi-city</v-icon>
            </v-list-item-icon>
            <v-list-item-title>HOTELS</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="triggerRestaurants">
            <v-list-item-icon>
              <v-icon>mdi-silverware-fork-knife</v-icon>
            </v-list-item-icon>
            <v-list-item-title>RESTAURANTS</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="triggerTransportations">
            <v-list-item-icon>
              <v-icon>mdi-car</v-icon>
            </v-list-item-icon>
            <v-list-item-title>TRANSPORTATIONS</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="triggerPharmacies">
            <v-list-item-icon>
              <v-icon>mdi-hospital-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>PHARMACIES</v-list-item-title>
          </v-list-item>
          <v-divider class="my-3"></v-divider>
          <v-list-item link @click="triggerNews">
            <v-list-item-icon>
              <v-icon>mdi-newspaper-variant-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>NEWS</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="triggerTours">
            <v-list-item-icon>
              <v-icon>mdi-hail</v-icon>
            </v-list-item-icon>
            <v-list-item-title>TOURS</v-list-item-title>
          </v-list-item>
          <v-divider class="my-3"></v-divider>
          <v-list-item link @click="triggerUsers">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>USERS</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="triggerGuides">
            <v-list-item-icon>
              <v-icon>mdi-card-account-mail-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>TOURGUIDES</v-list-item-title>
          </v-list-item>
          <v-divider class="my-3"></v-divider>
          <v-list-item link @click="triggerPosts">
            <v-list-item-icon>
              <v-icon>mdi-text-box</v-icon>
            </v-list-item-icon>
            <v-list-item-title>POSTS</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="triggerComments">
            <v-list-item-icon>
              <v-icon>mdi-message</v-icon>
            </v-list-item-icon>
            <v-list-item-title>COMMENTS</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div class="">
      <v-tabs-items v-model="model1">
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">DASHBOARD</h1>
          <v-row>
            <v-col cols="12" sm="6">
              <v-card class="mb-2 mt-0 primary" dark>
                <v-card-text>
                  USERS RATE
                </v-card-text>
                <v-card-text class="font-weight-light">
                  <v-sparkline
                    :fill="false"
                    color="white"
                    :line-width="1"
                    :padding="8"
                    :smooth="10"
                    :value="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                    auto-draw
                  >
                    <template v-slot:label="item">
                     {{ item.value }}
                    </template>
                  </v-sparkline>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <v-card class="mb-2 mt-0">
                <v-card-text>
                  TOURS RATE
                </v-card-text>
                <v-card-text class="font-weight-light">
                  <v-sparkline
                    :fill="true"
                    :line-width="1"
                    :padding="10"
                    :smooth="10"
                    :value="value2"
                    auto-draw
                  >
                    <template v-slot:label="item">
                      $ {{ item.value }}
                    </template>
                  </v-sparkline>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-card class="mb-2">
                <v-card-title class="font-weight-light">
                  <p class="mb-0 mx-auto">PLACES</p>
                </v-card-title>
                <v-divider class="mt-0"></v-divider>
                <v-card-text>
                  <v-icon color="primary" style="font-size:5rem;width:100%">mdi-map-marker-outline</v-icon>
                  <p class="text-center mb-0" style="font-size: 1.5rem">{{ placesCount }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text block dark color="primary" @click="dialog1 = !dialog1">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-dialog
                    v-model="dialog1"
                    max-width="500"
                  >
                    <div class="add-something grey lighten-4 pa-8">
                      <v-form @submit.prevent="addOnePlace" ref="places">
                        <h3 class="uk-heading-line darkText--text mb-0 uk-text-center"><span>CREATE PLACE</span></h3>
                        <v-text-field  
                          v-model="place.name" 
                          prepend-icon="mdi-text-short"
                          label="name..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="place.location" 
                          prepend-icon="mdi-map-marker"
                          label="location..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="place.description" 
                          prepend-icon="mdi-text"
                          label="description..."
                        >
                        </v-text-field>
                        <v-file-input
                          label="place image"
                          v-model="place.file"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                        <v-btn 
                          block dark class="primary mt-3" 
                          type="submit"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-form>
                    </div>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-card class="mb-2">
                <v-card-title class="font-weight-light">
                  <p class="mb-0 mx-auto">HOTELS</p>
                </v-card-title>
                <v-divider class="mt-0"></v-divider>
                <v-card-text>
                  <v-icon color="primary" style="font-size:5rem;width:100%">mdi-city</v-icon>
                  <p class="text-center mb-0" style="font-size: 1.5rem">{{ hotelsCount }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text block dark color="primary" @click="dialog2 = !dialog2">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-dialog
                    v-model="dialog2"
                    max-width="500"
                  >
                    <div class="add-something grey lighten-4 pa-8">
                      <v-form @submit.prevent="addOneHotel" ref="hotels">
                        <h3 class="uk-heading-line darkText--text mb-0 uk-text-center"><span>CREATE HOTEL</span></h3>
                        <v-text-field  
                          v-model="hotel.name" 
                          prepend-icon="mdi-text-short"
                          label="name..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="hotel.location" 
                          prepend-icon="mdi-map-marker"
                          label="location..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="hotel.description" 
                          prepend-icon="mdi-text"
                          label="description..."
                        >
                        </v-text-field>
                        <v-combobox
                          v-model="hotel.availability"
                          :items="hotel.options"
                          prepend-icon="mdi-clock"
                          label="availability"
                          multiple
                        ></v-combobox>
                        <v-file-input
                          label="hotel image"
                          v-model="hotel.file"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                        <v-btn 
                          block dark class="primary mt-3" 
                          type="submit"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-form>
                    </div>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-card class="mb-2">
                <v-card-title class="font-weight-light">
                  <p class="mb-0 mx-auto">RESTAURANTS</p>
                </v-card-title>
                <v-divider class="mt-0"></v-divider>
                <v-card-text>
                  <v-icon color="primary" style="font-size:5rem;width:100%">mdi-silverware-fork-knife</v-icon>
                  <p class="text-center mb-0" style="font-size: 1.5rem">{{ restaurantsCount }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text block dark color="primary" @click="dialog3 = !dialog3">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-dialog
                    v-model="dialog3"
                    max-width="500"
                  >
                    <div class="add-something grey lighten-4 pa-8">
                      <v-form @submit.prevent="addOneRestaurant" ref="restaurants">
                        <h3 class="uk-heading-line darkText--text mb-0 uk-text-center"><span>CREATE RESTAURANT</span></h3>
                        <v-text-field  
                          v-model="restaurant.name" 
                          prepend-icon="mdi-text-short"
                          label="name..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="restaurant.location" 
                          prepend-icon="mdi-map-marker"
                          label="location..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="restaurant.description" 
                          prepend-icon="mdi-text"
                          label="description..."
                        >
                        </v-text-field>
                        <v-combobox
                          v-model="restaurant.availability"
                          :items="restaurant.options"
                          prepend-icon="mdi-clock"
                          label="availability"
                          multiple
                        ></v-combobox>
                        <v-file-input
                          label="restaurant image"
                          v-model="restaurant.file"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                        <v-btn 
                          block dark class="primary mt-3" 
                          type="submit"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-form>
                    </div>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-card class="mb-2">
                <v-card-title class="font-weight-light">
                  <p class="mb-0 mx-auto">TRANSPORTATIONS</p>
                </v-card-title>
                <v-divider class="mt-0"></v-divider>
                <v-card-text>
                  <v-icon color="primary" style="font-size:5rem;width:100%">mdi-car</v-icon>
                  <p class="text-center mb-0" style="font-size: 1.5rem">{{ transportationsCount }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text block dark color="primary" @click="dialog4 = !dialog4">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-dialog
                    v-model="dialog4"
                    max-width="500"
                  >
                    <div class="add-something grey lighten-4 pa-8">
                      <v-form @submit.prevent="addOneTransportation" ref="transportations">
                        <h3 class="uk-heading-line darkText--text mb-0 uk-text-center"><span>CREATE TRANSPORTATION</span></h3>
                        <v-text-field  
                          v-model="transportation.name" 
                          prepend-icon="mdi-text-short"
                          label="name..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="transportation.location" 
                          prepend-icon="mdi-map-marker"
                          label="location..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="transportation.description" 
                          prepend-icon="mdi-text"
                          label="description..."
                        >
                        </v-text-field>
                        <v-file-input
                          label="transportation image"
                          v-model="transportation.file"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                        <v-btn 
                          block dark class="primary mt-3" 
                          type="submit"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-form>
                    </div>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-card class="mb-2">
                <v-card-title class="font-weight-light">
                  <p class="mb-0 mx-auto">PHARMACIES</p>
                </v-card-title>
                <v-divider class="mt-0"></v-divider>
                <v-card-text>
                  <v-icon color="primary" style="font-size:5rem;width:100%">mdi-hospital-box</v-icon>
                  <p class="text-center mb-0" style="font-size: 1.5rem">{{ pharmaciesCount }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text block dark color="primary" @click="dialog5 = !dialog5">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-dialog
                    v-model="dialog5"
                    max-width="500"
                  >
                    <div class="add-something grey lighten-4 pa-8">
                      <v-form @submit.prevent="addOnePharmacy" ref="pharmacies">
                        <h3 class="uk-heading-line darkText--text mb-0 uk-text-center"><span>CREATE PHARMACY</span></h3>
                        <v-text-field  
                          v-model="pharmacy.name" 
                          prepend-icon="mdi-text-short"
                          label="name..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="pharmacy.location" 
                          prepend-icon="mdi-map-marker"
                          label="location..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="pharmacy.description" 
                          prepend-icon="mdi-text"
                          label="description..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="pharmacy.contacts" 
                          prepend-icon="mdi-phone-outline"
                          label="contacts..."
                        >
                        </v-text-field>
                        <v-file-input
                          label="pharmacy image"
                          v-model="pharmacy.file"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                        <v-btn 
                          block dark class="primary mt-3" 
                          type="submit"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-form>
                    </div>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-card class="mb-2">
                <v-card-title class="font-weight-light">
                  <p class="mb-0 mx-auto">NEWS</p>
                </v-card-title>
                <v-divider class="mt-0"></v-divider>
                <v-card-text>
                  <v-icon color="primary" style="font-size:5rem;width:100%">mdi-newspaper-variant-outline</v-icon>
                  <p class="text-center mb-0" style="font-size: 1.5rem">{{ newsCount }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn text block dark color="primary" @click="dialog6 = !dialog6">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-dialog
                    v-model="dialog6"
                    max-width="500"
                  >
                    <div class="add-something grey lighten-4 pa-8">
                      <v-form @submit.prevent="addOneNew" ref="news">
                        <h3 class="uk-heading-line darkText--text mb-0 uk-text-center"><span>CREATE NEW</span></h3>
                        <v-text-field  
                          v-model="oneNew.title" 
                          prepend-icon="mdi-text-short"
                          label="title..."
                        >
                        </v-text-field>
                        <v-text-field  
                          v-model="oneNew.description" 
                          prepend-icon="mdi-text"
                          label="description..."
                        >
                        </v-text-field>
                        <v-file-input
                          label="new image"
                          v-model="oneNew.file"
                          prepend-icon="mdi-camera"
                        ></v-file-input>
                        <v-btn 
                          block dark class="primary mt-3" 
                          type="submit"
                        >
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-form>
                    </div>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="4" lg="3">
              <v-card class="mb-2">
                <v-card-title class="font-weight-light">
                  GUIDES OF THE MONTH
                </v-card-title>
                <v-divider class="mt-0"></v-divider>
                <v-list>
                  <v-list-item
                    v-for="guide in month"
                    :key="guide._id"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="guide.name"></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-avatar>
                      <v-img :src="guide.avatar"></v-img>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">
            PLACES
            <v-btn
              color="primary"
              class="float-right mt-1"
              text
              dark
              @click="dialog1 = !dialog1"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </h1>
          <v-row v-if="!loaded1">
            <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="image, article, divider, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded1">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(place, index) in adPlaces" :key="index"
            >
              <AdPlace 
                :place="place" 
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">
            HOTELS
            <v-btn
              color="primary"
              class="float-right mt-1"
              text
              dark
              @click="dialog2 = !dialog2"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </h1>
          <v-row v-if="!loaded2">
            <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="image, article, divider, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded2">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(hotel, index) in adHotels" :key="index"
            >
              <AdHotel 
                :hotel="hotel" 
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">
            RESTAURANTS
            <v-btn
              color="primary"
              class="float-right mt-1"
              text
              dark
              @click="dialog3 = !dialog3"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </h1>
          <v-row v-if="!loaded3">
            <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="image, article, divider, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded3">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(restaurant, index) in adRestaurants" :key="index"
            >
              <AdRestaurant 
                :restaurant="restaurant" 
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">
            TRANSPORTATIONS
            <v-btn
              color="primary"
              class="float-right mt-1"
              text
              dark
              @click="dialog4 = !dialog4"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </h1>
          <v-row v-if="!loaded4">
            <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="image, article, divider, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded4">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(transportation, index) in adTransportations" :key="index"
            >
              <AdTransportation 
                :transportation="transportation" 
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">
            PHARMACIES
            <v-btn
              color="primary"
              class="float-right mt-1"
              text
              dark
              @click="dialog5 = !dialog5"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </h1>
          <v-row v-if="!loaded5">
            <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="image, article, divider, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded5">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(pharmacy, index) in adPharmacies" :key="index"
            >
              <AdPharmacy
                :pharmacy="pharmacy" 
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">
            NEWS
            <v-btn
              color="primary"
              class="float-right mt-1"
              text
              dark
              @click="dialog6 = !dialog6"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </h1>
          <v-row v-if="!loaded6">
            <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="image, article, divider, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded6">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(oneNew, index) in adNews" :key="index"
            >
              <AdNew 
                :oneNew="oneNew" 
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">TOURS</h1>
          <v-row v-if="!loaded7">
            <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="image, article, divider, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded7">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(tour, index) in tours" :key="index"
            >
              <AdTour
                :tour="tour" 
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">USERS</h1>
          <v-row>
            <v-col cols="12" sm="4" lg="3">
              <template v-if="!loaded8">
                <v-skeleton-loader
                  v-for="(i, index) in 10"
                  :key="index"
                  type="list-item-avatar"
                  class="mb-4"
                ></v-skeleton-loader>
              </template>
              <v-list v-if="loaded8">
                <v-list-item-group v-model="model2" mandatory>
                  <template v-for="user in users">
                    <v-list-item :Key="user._id" @click="triggerUserPosts(user)">
                      <v-list-item-icon>
                        <v-img
                          height="50"
                          width="50"
                          class="grey lighten-2" 
                          :src="user.avatar"
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
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="user.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="12" sm="8" lg="9">
              <v-tabs-items v-model="model2">
                <v-tab-item class="pa-2" :transition="false" :reverse-transition="false" v-for="(user, index) in users" :key="index">
                  <v-row>
                    <v-col cols="12" lg="4">
                      <h3 class="uk-heading-line darkText--text uk-text-center"><span>ACCOUNT</span></h3>
                      <v-card>
                        <v-img 
                          height="300"
                          class="grey lighten-2"
                          :src="user.avatar"
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
                        <v-card-title>
                          <p class="font-weight-light">{{ user.name }}</p>
                        </v-card-title>
                        <v-card-text>
                          <p>
                            <v-icon class="mr-3">mdi-email-outline</v-icon>{{ user.email }}
                          </p>
                          <p>
                            <v-icon class="mr-3">mdi-phone-outline</v-icon>{{ user.phone }}
                          </p>
                          <p>
                            <v-icon class="mr-3">mdi-web</v-icon>{{ user.country }}
                          </p>
                          <p>
                            <v-icon class="mr-3">mdi-translate</v-icon>{{ user.language }}
                          </p>
                        </v-card-text>
                      </v-card>
                      <h3 class="uk-heading-line darkText--text uk-text-center"><span>HOTEL</span></h3>
                      <v-skeleton-loader
                        v-if="!loaded9"
                        class="mx-auto my-4"
                        elevation="2"
                        type="image, article, divider, actions"
                      ></v-skeleton-loader>
                      <AdUserHotel v-if="adUserHotel && loaded9" :hotel="adUserHotel" />
                    </v-col>
                    <v-col cols="12" lg="4">
                      <h3 class="uk-heading-line darkText--text uk-text-center"><span>POSTS</span></h3>
                      <v-skeleton-loader
                        v-if="!loaded12"
                        class="mx-auto mb-4"
                        elevation="2"
                        type="image, article"
                      ></v-skeleton-loader>
                      <v-skeleton-loader
                        v-if="!loaded12"
                        class="mx-auto mb-4"
                        elevation="2"
                        type="image, article"
                      ></v-skeleton-loader>
                      <template v-if="adUserPosts && loaded12">
                        <AdUserPost v-for="post in adUserPosts" :key="post._id" :post="post" />
                      </template>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <h3 class="uk-heading-line darkText--text uk-text-center"><span>RESTAURANT</span></h3>
                      <v-skeleton-loader
                        v-if="!loaded10"
                        class="mx-auto my-4"
                        elevation="2"
                        type="image, article, divider, actions"
                      ></v-skeleton-loader>
                      <AdUserRestaurant v-if="adUserRestaurant && loaded10" :restaurant="adUserRestaurant" />
                      <h3 class="uk-heading-line darkText--text uk-text-center"><span>TOUR</span></h3>
                      <v-skeleton-loader
                        v-if="!loaded11"
                        class="mx-auto my-4"
                        elevation="2"
                        type="image, article, divider, actions"
                      ></v-skeleton-loader>
                      <AdUserTour v-if="adUserTour && loaded11" :tour="adUserTour" />
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">TOURGUIDES</h1>
          <v-row>
            <v-col cols="12" sm="4" lg="3">
              <template v-if="!loaded13">
                <v-skeleton-loader
                  v-for="(i, index) in 10"
                  :key="index"
                  type="list-item-avatar"
                  class="mb-4"
                ></v-skeleton-loader>
              </template>
              <v-list v-if="loaded13">
                <v-list-item-group v-model="model3" mandatory>
                  <template id="ss" v-for="guide in guides">
                    <v-list-item :Key="guide._id" @click="triggerGuidePosts(guide)">
                      <v-list-item-icon>
                        <v-img
                          height="50"
                          width="50"
                          class="grey lighten-2" 
                          :src="guide.avatar"
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
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="guide.name"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col cols="12" sm="8" lg="9">
              <v-tabs-items v-model="model3">
                <v-tab-item class="pa-2" :transition="false" :reverse-transition="false" v-for="(guide, index) in guides" :key="index">
                  <v-row>
                    <v-col cols="12" lg="4">
                      <h3 class="uk-heading-line darkText--text uk-text-center"><span>ACCOUNT</span></h3>
                      <v-card>
                        <v-img 
                          height="300"
                          class="grey lighten-2" 
                          :src="guide.avatar"
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
                        <v-card-title>
                          <p class="font-weight-light">{{ guide.name }}</p>
                        </v-card-title>
                        <v-card-text>
                          <p>
                            <v-icon class="mr-3">mdi-email-outline</v-icon>{{ guide.email }}
                          </p>
                          <p>
                            <v-icon class="mr-3">mdi-phone-outline</v-icon>{{ guide.phone }}
                          </p>
                          <p>
                            <v-icon class="mr-3">mdi-card-account-mail</v-icon>{{ guide.license }}
                          </p>
                          <p>
                            <v-icon class="mr-3">mdi-translate</v-icon>{{ guide.language }}
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <h3 class="uk-heading-line darkText--text uk-text-center"><span>POSTS</span></h3>
                      <v-skeleton-loader
                        v-if="!loaded14"
                        class="mx-auto mb-4"
                        elevation="2"
                        type="image, article"
                      ></v-skeleton-loader>
                      <v-skeleton-loader
                        v-if="!loaded14"
                        class="mx-auto mb-4"
                        elevation="2"
                        type="image, article"
                      ></v-skeleton-loader>
                      <template v-if="adGuidePosts && loaded14">
                        <AdGuidePost v-for="post in adGuidePosts" :key="post._id" :post="post" />
                      </template>
                    </v-col>
                    <v-col cols="12" lg="4">
                      <h3 class="uk-heading-line darkText--text uk-text-center"><span>TOURS</span></h3>
                      <v-skeleton-loader
                        v-if="!loaded15"
                        class="mx-auto my-4"
                        elevation="2"
                        type="image, article, divider, actions"
                      ></v-skeleton-loader>
                      <v-skeleton-loader
                        v-if="!loaded15"
                        class="mx-auto my-4"
                        elevation="2"
                        type="image, article, divider, actions"
                      ></v-skeleton-loader>
                      <template v-if="adGuideTours && loaded15">
                        <AdGuideTour v-for="tour in adGuideTours" :key="tour._id" :tour="tour" />
                      </template>
                    </v-col>
                  </v-row>
                </v-tab-item>
              </v-tabs-items>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">POSTS</h1>
          <v-row v-if="!loaded16">
            <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="image, article, divider, list-item-three-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded16">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(post, index) in allPosts" :key="index"
            >
              <AllPost
                :post="post" 
              />
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item class="pl-16 pt-4 pr-2" :transition="false" :reverse-transition="false">
          <h1 class="font-weight-light darkText--text uk-heading-bullet">COMMENTS</h1>
          <v-row v-if="!loaded17">
            <v-col v-for="(n, index) in 36" :key="index" cols="12" sm="6" md="4" lg="3">
              <v-skeleton-loader
                class="mx-auto my-4"
                elevation="2"
                type="list-item-avatar"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-if="loaded17">
            <v-col 
              cols="12" sm="6" md="4" lg="3"
              v-for="(comment, index) in allComments" :key="index"
            >
              <v-alert
                border="left"
                class="mx-0 my-5 py-0 pr-1"
              >
                <v-btn absolute right @click="deleteComment(comment._id)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-avatar size="45">
                  <v-img
                    class="grey lighten-2"
                    :src="comment.owner.avatar"
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
                <span class="ml-3 font-weight-light">
                  {{ comment.owner.name }}
                </span>
                <p class="mb-0 mt-2 subtitle-2 text--disabled">{{ comment.content }}</p>
              </v-alert>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AdPlace from '@/components/AdPlace'
import AdHotel from '@/components/AdHotel'
import AdRestaurant from '@/components/AdRestaurant'
import AdTransportation from '@/components/AdTransportation'
import AdPharmacy from '@/components/AdPharmacy'
import AdNew from '@/components/AdNew'
import AdTour from '@/components/AdTour'
import AdUserPost from '@/components/AdUserPost'
import AdUserHotel from '@/components/AdUserHotel'
import AdUserRestaurant from '@/components/AdUserRestaurant'
import AdUserTour from '@/components/AdUserTour'
import AdGuidePost from '@/components/AdGuidePost'
import AdGuideTour from '@/components/AdGuideTour'
import AllPost from '@/components/AllPost'

export default {
  name: 'Dashboard',
  data () {
    return {
      value: [0, 2, 5, 7, 5, 2, 10, 5, 10, 0, 1, 8, 2, 9, 0],
      value2: [423, 446, 675, 510, 590, 610, 760,],
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      model1: 0,
      model2: 0,
      model3: 0,
      loaded1: false,
      loaded2: false,
      loaded3: false,
      loaded4: false,
      loaded5: false,
      loaded6: false,
      loaded7: false,
      loaded8: false,
      loaded9: false,
      loaded10: false,
      loaded11: false,
      loaded12: false,
      loaded13: false,
      loaded14: false,
      loaded15: false,
      loaded16: false,
      loaded17: false,
      oneNew: {
        title: '',
        description: '',
        file: []
      },
      place: {
        name: '',
        location: '',
        description: '',
        file: []
      },
      hotel: {
        name: '',
        location: '',
        description: '',
        availability: [],
        options: ['5:30PM', '7:30PM', '8:00PM', '9:00PM'],
        file: []
      },
      restaurant: {
        name: '',
        location: '',
        description: '',
        availability: [],
        options: ['5:30PM', '7:30PM', '8:00PM', '9:00PM'],
        file: []
      },
      pharmacy: {
        name: '',
        location: '',
        description: '',
        contacts: '',
        file: []
      },
      transportation: {
        name: '',
        location: '',
        description: '',
        file: []
      }
    }
  },
  computed: {
    ...mapGetters([
      'admin', 'adPlaces', 'adHotels', 'adRestaurants', 'adTransportations',
      'adPharmacies', 'adNews', 'tours', 'users', 'adUserPosts', 'adUserHotel',
      'adUserRestaurant', 'adUserTour', 'guides', 'adGuidePosts', 'adGuideTours',
      'allPosts', 'allComments', 'month', 'placesCount', 'hotelsCount',
      'restaurantsCount', 'transportationsCount', 'pharmaciesCount', 'newsCount'
    ])
  },
  created () {
    this.startDashboard()
  },
  components: {
    AdPlace,
    AdHotel,
    AdRestaurant,
    AdTransportation,
    AdPharmacy,
    AdNew,
    AdTour,
    AdUserPost,
    AdUserHotel,
    AdUserRestaurant,
    AdUserTour,
    AdGuidePost,
    AdGuideTour,
    AllPost,
  },
  methods: {
    ...mapActions([
      'getAdPlaces', 'getAdHotels', 'getAdRestaurants', 'getAdTransportations',
      'getAdPharmacies', 'getAdNews', 'getTours', 'getUsers', 'userPosts', 'userHotel',
      'userRestaurant', 'userTour', 'refreshUser', 'getGuides', 'refreshGuide', 
      'guidePosts', 'guideTours', 'getAllPosts', 'getAllComments', 'deleteComment',
      'addNew', 'addPlace', 'addHotel', 'addRestaurant', 'addPharmacy', 'addTransportation',
      'getMonth', 'getPlacesCount', 'getHotelsCount', 'getRestaurantsCount',
      'getTransportationsCount', 'getPharmaciesCount', 'getNewsCount'
    ]),
    startDashboard () {
      this.getMonth()
      this.getPlacesCount()
      this.getHotelsCount()
      this.getRestaurantsCount()
      this.getTransportationsCount()
      this.getPharmaciesCount()
      this.getNewsCount()
    },
    addOneNew () {
      const formData = new FormData()
      formData.append('title', this.oneNew.title)
      formData.append('description', this.oneNew.description)
      formData.append('file', this.oneNew.file)
      if (!this.oneNew.title || !this.oneNew.description || !this.oneNew.file) {
        return
      }
      this.addNew(formData).then(() => {
        this.$refs.news.reset()
      })
    },
    addOnePlace () {
      const formData = new FormData()
      formData.append('name', this.place.name)
      formData.append('location', this.place.location)
      formData.append('description', this.place.description)
      formData.append('file', this.place.file)
      if (!this.place.name || !this.place.location || !this.place.description || !this.place.file) {
        return
      }
      this.addPlace(formData).then(() => {
        this.$refs.places.reset()
      })
    },
    addOneHotel () {
      const formData = new FormData()
      formData.append('name', this.hotel.name)
      formData.append('location', this.hotel.location)
      this.hotel.availability.forEach((item) => formData.append("availability[]", item))
      formData.append('description', this.hotel.description)
      formData.append('file', this.hotel.file)
      if (!this.hotel.name || !this.hotel.location || !this.hotel.availability || !this.hotel.description || !this.hotel.file) {
        return
      }
      this.addHotel(formData).then(() => {
        this.$refs.hotels.reset()
      })
    },
    addOneRestaurant () {
      const formData = new FormData()
      formData.append('name', this.restaurant.name)
      formData.append('location', this.restaurant.location)
      this.restaurant.availability.forEach((item) => formData.append("availability[]", item))
      formData.append('description', this.restaurant.description)
      formData.append('file', this.restaurant.file)
      if (!this.restaurant.name || !this.restaurant.location || !this.restaurant.availability || !this.restaurant.description || !this.restaurant.file) {
        return
      }
      this.addRestaurant(formData).then(() => {
        this.$refs.restaurants.reset()
      })
    },
    addOnePharmacy () {
      const formData = new FormData()
      formData.append('name', this.pharmacy.name)
      formData.append('location', this.pharmacy.location)
      formData.append('description', this.pharmacy.description)
      formData.append('contacts', this.pharmacy.contacts)
      formData.append('file', this.pharmacy.file)
      if (!this.pharmacy.name || !this.pharmacy.contacts || !this.pharmacy.location || !this.pharmacy.description || !this.pharmacy.file) {
        return
      }
      this.addPharmacy(formData).then(() => {
        this.$refs.pharmacies.reset()
      })
    },
    addOneTransportation () {
      const formData = new FormData()
      formData.append('name', this.transportation.name)
      formData.append('location', this.transportation.location)
      formData.append('description', this.transportation.description)
      formData.append('file', this.transportation.file)
      if (!this.transportation.name || !this.transportation.location || !this.transportation.description || !this.transportation.file) {
        return
      }
      this.addTransportation(formData).then(() => {
        this.$refs.transportations.reset()
      })
    },
    triggerPlaces () {
      this.loaded1 = false
      this.getAdPlaces().then(() => {
        this.loaded1 = true
      })
    },
    triggerHotels () {
      this.loaded2 = false
      this.getAdHotels().then(() => {
        this.loaded2 = true
      })
    },
    triggerRestaurants () {
      this.loaded3 = false
      this.getAdRestaurants().then(() => {
        this.loaded3 = true
      })
    },
    triggerTransportations () {
      this.loaded4 = false
      this.getAdTransportations().then(() => {
        this.loaded4 = true
      })
    },
    triggerPharmacies () {
      this.loaded5 = false
      this.getAdPharmacies().then(() => {
        this.loaded5 = true
      })
    },
    triggerNews () {
      this.loaded6 = false
      this.getAdNews().then(() => {
        this.loaded6 = true
      })
    },
    triggerTours () {
      this.loaded7 = false
      this.getTours().then(() => {
        this.loaded7 = true
      })
    },
    triggerUsers () {
      this.loaded8 = false
      this.getUsers().then(() => {
        this.triggerUserPosts(this.users[0])
        this.loaded8 = true
      })
    },
    triggerUserPosts (user) {
      this.refresh()
      this.userPosts(user._id).then(() => {
        this.loaded12 = true
      })
      if (user.hotel.hotelId != '0') {
        this.userHotel(user.hotel.hotelId).then(() => {
          this.loaded9 = true
        })
      } else {
        this.loaded9 = true
      }
      if (user.restaurant.restaurantId != '0') {
        this.userRestaurant(user.restaurant.restaurantId).then(() => {
          this.loaded10 = true
        })
      } else {
        this.loaded10 = true
      }
      if(user.tour) {
        this.userTour(user.tour).then(() => {
          this.loaded11 = true
        })
      } else {
        this.loaded11 = true
      }
    },
    triggerGuides () {
      this.loaded13 = false
      this.getGuides().then(() => {
        this.loaded13 = true
        this.triggerGuidePosts(this.guides[0])
      })
    },
    triggerGuidePosts (guide) {
      this.refresh2()
      this.guidePosts(guide._id).then(() => {
        this.loaded14 = true
      })
      this.guideTours(guide._id).then(() => {
        this.loaded15 = true
      })
    },
    refresh () {
      this.refreshUser()
      this.loaded9 = false
      this.loaded10 = false
      this.loaded11 = false
      this.loaded12 = false
    },
    refresh2 () {
      this.refreshGuide()
      this.loaded14 = false
      this.loaded15 = false
    },
    triggerPosts () {
      this.loaded16 = false
      this.getAllPosts().then(() => {
        this.loaded16 = true
      })
    },
    triggerComments () {
      this.loaded17 = false
      this.getAllComments().then(() => {
        this.loaded17 = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#asideBar{
  margin-top: 56px;
  @media (min-width: 960px) {
    margin-top: 64px;
  }
}
</style>