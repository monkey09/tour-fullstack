<template>
  <v-sheet>
    <v-progress-linear fixed :value="userPostsProgress" :active="userPostsProgress < 100 ? true : false"></v-progress-linear>
    <v-container>
      <h1 class="font-weight-light darkText--text uk-heading-bullet">PROFILE</h1>
      <v-row>
        <v-col cols="12" md="5" lg="4" xl="3">
          <h3 class="uk-heading-line darkText--text uk-text-center"><span>ACCOUNT</span></h3>
          <v-card class="pa-10">
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
            <v-hover v-if="user">
              <template v-slot:default="{ hover }">
                <v-img 
                  width="100%"
                  height="300px"
                  class="mb-5 mx-auto grey lighten-2"
                  v-if="user.avatar"
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
                  <v-fade-transition>
                    <v-overlay
                      v-if="hover"
                      absolute
                      color="#036358"
                    >
                      <input type="file" id="fileInput" @change="selectFile" hidden>
                      <v-btn icon @click="triggerFile">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon @click="deleteAvatar">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-fade-transition>
                </v-img>
              </template>
            </v-hover>
            <v-form 
              @submit.prevent="updateUsername"
              ref="usernameForm"
              v-model="usernameForm.valid"
            >
              <v-text-field
                label="Name"
                v-model="username.value"
                :rules="username.rules"
                :counter="15"
                required
                :loading="usernameLoading"
              >
              </v-text-field>
            </v-form>
            <v-form 
              @submit.prevent="updateEmail"
              ref="emailForm"
              v-model="emailForm.valid"
            >
              <v-text-field
                label="E-mail"
                v-model="email.value"
                :rules="email.rules"
                required
                :loading="emailLoading"
              >
              </v-text-field>
            </v-form>
            <v-form 
              @submit.prevent="updatePhone"
              ref="phoneForm"
              v-model="phoneForm.valid"
            >
              <v-text-field
                label="Phone"
                v-model="phone.value"
                :rules="phone.rules"
                required
                :loading="phoneLoading"
              >
              </v-text-field>
            </v-form>
            <v-form 
              @submit.prevent="updatePassword"
              ref="passwordForm"
              v-model="passwordForm.valid"
            >
              <v-text-field
                label="Password"
                v-model="password.value"
                :rules="password.rules"
                :append-icon="password.show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="password.show ? 'text' : 'password'"
                @click:append="password.show = !password.show"
                required
                :loading="passwordLoading"
              >
              </v-text-field>
            </v-form>
            <v-form 
              @submit.prevent="updateCountry"
              ref="countryForm"
              v-model="countryForm.valid"
            >
              <v-text-field
                label="Country"
                v-model="country.value"
                :rules="country.rules"
                required
                :loading="countryLoading"
              >
              </v-text-field>
            </v-form>
            <v-form 
              @submit.prevent="updateLanguage"
              ref="languageForm"
              v-model="languageForm.valid"
            >
              <v-select
                :items="langs"
                v-model="language.value"
                :rules="language.rules"
                @change="updateLanguage"
                label="Language"
              ></v-select>
            </v-form>
          </v-card>
          <h3 class="uk-heading-line darkText--text uk-text-center"><span>TOUR</span></h3>
          <v-skeleton-loader
            v-if="!tourLoaded && user.tour"
            class="mx-auto my-4"
            elevation="2"
            type="image, article, divider, actions"
          ></v-skeleton-loader>
          <Tour v-if="tour && user" :tour="tour" />
        </v-col>
        <v-col cols="12" md="7" xl="5">
          <h3 class="uk-heading-line darkText--text uk-text-center"><span>POSTS</span></h3>
          <v-skeleton-loader
            v-if="!loaded"
            class="mx-auto mb-4"
            elevation="2"
            type="image, article"
          ></v-skeleton-loader>
          <v-skeleton-loader
            v-if="!loaded"
            class="mx-auto mb-4"
            elevation="2"
            type="image, article"
          ></v-skeleton-loader>
          <v-skeleton-loader
            v-if="!loaded"
            class="mx-auto mb-4"
            elevation="2"
            type="image, article"
          ></v-skeleton-loader>
          <v-dialog
            v-model="dialog"
            max-width="500px"
            transition="dialog-top-transition"
          >
            <PostExpand :id="postId" :key="postId" @closeDialog="dialog=false" />
          </v-dialog>
          <div v-for="(post, index) in userPosts" :key="index">
            <UserPost 
              v-if="loaded" 
              :post="post" 
              @openDialog="expand(post._id)" 
              @deleted="activateSnackbar('success', 'Post deleted!')"
            />
          </div>
        </v-col>
        <v-col cols="12" md="5" lg="4" xl="3">
          <h3 class="uk-heading-line darkText--text uk-text-center"><span>HOTEL</span></h3>
          <v-skeleton-loader
            v-if="!HotelLoaded && user.hotel.hotelId != '0'"
            class="mx-auto my-4"
            elevation="2"
            type="image, article, divider, actions"
          ></v-skeleton-loader>
          <v-card
            v-if="hotel"
            class="my-4"
            
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

            <v-card-title class="font-weight-light">My Reservation</v-card-title>

            <v-card-actions>
              <v-chip color="primary" class="ml-1">
                {{ user.hotel.reservation }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="show = !show"
              >
                Rate
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  <div class="text-center" @click="rate">
                    <v-rating
                      v-model="rating"
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      empty-icon="$ratingFull"
                      half-increments
                      hover
                      medium
                    ></v-rating>
                  </div>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
          <h3 class="uk-heading-line darkText--text uk-text-center"><span>RESTAURANT</span></h3>
          <v-skeleton-loader
            v-if="!RestaurantLoaded && user.restaurant.restaurantId != '0'"
            class="mx-auto my-4"
            elevation="2"
            type="image, article, divider, actions"
          ></v-skeleton-loader>
          <v-card
            v-if="restaurant"
            class="my-4"
            
          >
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

            <v-card-title class="font-weight-light">My Reservation</v-card-title>

            <v-card-actions>
              <v-chip color="primary" class="ml-1">
                {{ user.restaurant.reservation }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="show2 = !show2"
              >
                Rate
                <v-icon>{{ show2 ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="show2">
                <v-divider></v-divider>

                <v-card-text>
                  <div class="text-center" @click="rate2">
                    <v-rating
                      v-model="rating2"
                      color="yellow darken-3"
                      background-color="grey darken-1"
                      empty-icon="$ratingFull"
                      half-increments
                      hover
                      medium
                    ></v-rating>
                  </div>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import UserPost from '@/components/UserPost'
import PostExpand from '@/components/PostExpand'
import Tour from '@/components/Tour'

export default {
  name: 'UserProfile',
  data () {
    return {
      langs: ['English', 'Arabic', 'Chinese', 'French', 'German', 'Hindi', 'Irish', 'Italian', 'Japanese', 'Korean', 'Portuguese', 'Russian', 'Spanish'],
      loaded: false,
      postId: 0,
      dialog: false,
      HotelLoaded: false,
      RestaurantLoaded: false,
      tourLoaded: false,
      show: false,
      show2: false,
      rating: 4.5,
      rating2: 4.5,
      usernameLoading: false,
      emailLoading: false,
      phoneLoading: false,
      passwordLoading: false,
      countryLoading: false,
      languageLoading: false,
      snackbar: false,
      snackbarType: '',
      text: '',
      file: '',
      usernameForm: {
        valid: false
      },
      emailForm: {
        valid: false
      },
      phoneForm: {
        valid: false
      },
      passwordForm: {
        valid: false
      },
      countryForm: {
        valid: false
      },
      languageForm: {
        valid: false
      },
      username: {
        value: '',
        rules: [
          v => !!v || 'Name is required',
          v => (v && v.length >= 3) || 'Name must 3 characters or more',
          v => (v && v.length <= 15) || 'Name must be within 15 characters'
        ]
      },
      email: {
        value: '',
        rules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail mus be valid'
        ]
      },
      phone: {
        value: '',
        rules: [
          v => !!v || 'Phone is required',
        ]
      },
      password: {
        value: '',
        show: false,
        rules: [
          v => !!v || 'Password is required',
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
          v => (v && v.length >= 6) || 'Passowrd must be at least 6 characters'
        ]
      },
      country: {
        value: '',
        rules: [
          v => !!v || 'Country is required',
        ]
      },
      language: {
        value: '',
        rules: [
          v => !!v || 'Language is required',
        ]
      },
      overlay: false
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'userPosts',
      'hotel',
      'restaurant',
      'tour',
      'userPostsProgress'
    ])
  },
  created () {
    this.username.value = this.user.name
    this.phone.value = this.user.phone
    this.email.value = this.user.email
    this.country.value = this.user.country
    this.language.value = this.user.language
    this.getUserPosts().then(() => {
      this.loaded = true
    })
    if (this.user.hotel.hotelId != 0) {
      this.getHotel(this.user.hotel.hotelId).then(() => {
        this.HotelLoaded = true
      })
    }
    if (this.user.restaurant.restaurantId != 0) {
      this.getRestaurant(this.user.restaurant.restaurantId).then(() => {
        this.RestaurantLoaded = true
      })
    }
    if (this.user.tour) {
      this.getUserTour(this.user.tour).then(() => {
        this.tourLoaded = true
      })
    }
  },
  components: {
    UserPost,
    PostExpand,
    Tour
  },
  methods: {
    ...mapActions([
      'updateUserAction',
      'getUserPosts',
      'getHotel',
      'getRestaurant',
      'getUserTour',
      'updateUserAvatar',
      'deleteUserAvatar'
    ]),
    triggerFile () {
      document.getElementById('fileInput').click()
    },
    selectFile () {
      const file = document.getElementById('fileInput').files[0]
      if (!file) {
        this.activateSnackbar('error', 'Please select an image!')
        return
      }
      const allowedTypes = ['image/jpg', 'image/png', 'image/jpeg']
      const MAX_SIZE = 2000000
      const tooLarge = file.size > MAX_SIZE
      if (allowedTypes.includes(file.type) && !tooLarge) {
        this.file = file
        this.sendFile()
      } else {
        this.activateSnackbar('error', 'Onlye 2MB images allowed')
      }
    },
    async sendFile () {
      const formData = new FormData()
      formData.append('file', this.file)
      this.updateUserAvatar(formData).then(() => {
        this.file = ""
        this.activateSnackbar('success', 'Profile image updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    deleteAvatar () {
      this.deleteUserAvatar().then(() => {
        this.file = ""
        this.activateSnackbar('success', 'Profile image deleted!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    updateUsername () {
      if (!this.usernameForm.valid) {
        return 
      }
      const form = {
        name: this.username.value
      }
      this.usernameLoading = true
      this.updateUserAction(form).then(() => {
        this.usernameLoading = false
        this.activateSnackbar('success', 'Name updated!')
      }).catch (() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    updateEmail () {
      if (!this.emailForm.valid) {
        return 
      }
      const form = {
        email: this.email.value
      }
      this.emailLoading = true
      this.updateUserAction(form).then(() => {
        this.emailLoading = false
        this.activateSnackbar('success', 'Email updated!')
      }).catch (() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    updatePhone () {
      if (!this.phoneForm.valid) {
        return
      }
      const form = {
        phone: this.phone.value
      }
      this.phoneLoading = true
      this.updateUserAction(form).then(() => {
        this.phoneLoading = false
        this.activateSnackbar('success', 'Phone updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    updatePassword () {
      if (!this.passwordForm.valid) {
        return
      }
      const form = {
        password: this.password.value
      }
      this.passwordLoading = true
      this.updateUserAction(form).then(() => {
        this.passwordLoading = false
        this.activateSnackbar('success', 'Password updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    updateCountry () {
      if (!this.countryForm.valid) {
        return
      }
      const form = {
        country: this.country.value
      }
      this.countryLoading = true
      this.updateUserAction(form).then(() => {
        this.countryLoading = false
        this.activateSnackbar('success', 'Country updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    updateLanguage () {
      if (!this.languageForm.valid) {
        return
      }
      const form = {
        language: this.language.value
      }
      this.languageLoading = true
      this.updateUserAction(form).then(() => {
        this.languageLoading = false
        this.activateSnackbar('success', 'Language updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    rate () {
      this.activateSnackbar('success', 'Hotel rated!')
    },
    rate2 () {
      this.activateSnackbar('success', 'Restaurant rated!')
    },
    expand(id) {
      this.postId = id
      this.dialog = !this.dialog
    },
    activateSnackbar (type, text) {
      this.text = text
      this.snackbarType = type
      this.snackbar = true
    }
  }
}
</script>