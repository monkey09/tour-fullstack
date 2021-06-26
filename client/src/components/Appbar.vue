<template>
  <div>
    <v-app-bar
      app
      
      color="lightBar"      
      dark
    >
      <a v-if="user || tourguide" class="uk-navbar-toggle uk-hidden@m lightText--text" uk-navbar-toggle-icon href="#mobile-nav" uk-toggle></a>
      <v-toolbar-title>
        <v-img src="@/assets/brand.svg" width="50"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <div class="uk-visible@m">
          <v-btn v-if="user || tourguide" router to="/" text class="mr-md-3">
            <v-icon>mdi-home</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">HOME</span>
          </v-btn>
          <v-btn v-if="user || tourguide" router to="/about" text class="mr-md-3">
            <v-icon>mdi-information</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">ABOUT</span>
          </v-btn>
          <v-btn v-if="user" router to="/services" text class="mr-md-3">
            <v-icon>mdi-menu</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">SERVICES</span>
          </v-btn>
          <v-btn v-if="user" router to="/tours" text class="mr-md-3">
            <v-icon>mdi-hail</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">TOURS</span>
          </v-btn>
          <v-btn v-if="user || tourguide" router to="/news" text class="mr-md-3">
            <v-icon>mdi-newspaper-variant-outline</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">NEWS</span>
          </v-btn>
          <v-btn v-if="tourguide" router to="/places" text class="mr-md-3">
            <v-icon>mdi-map-marker-outline</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">PLACES</span>
          </v-btn>
          <v-btn v-if="tourguide" router to="/managetours" text class="mr-md-3">
            <v-icon>mdi-cogs</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">MANAGE TOURS</span>
          </v-btn>
          <v-btn v-if="user && user.tour" router to="/chat" text class="mr-md-3">
            <v-icon>mdi-forum</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">CHAT</span>
          </v-btn>
          <v-btn v-if="tourguide && manageTours" router to="/guidechat" text class="mr-md-3">
            <v-icon>mdi-forum</v-icon>
            <span class="d-none d-md-block ml-2 font-weight-light">CHAT</span>
          </v-btn>
        </div>
        <v-btn v-if="admin" @click="dialog3 = !dialog3" text class="mr-md-3">
          <v-icon>mdi-account</v-icon>
          <span class="d-none d-md-block ml-2 font-weight-light">ACCOUNT</span>
        </v-btn>
        <v-dialog v-if="admin" v-model="dialog3" max-width="500">
          <v-card class="pa-10">
            <v-hover v-if="admin">
              <template v-slot:default="{ hover }">
                <v-img 
                  width="100%"
                  height="300px"
                  class="mb-5 mx-auto grey lighten-2"
                  v-if="admin.avatar"
                  :src="admin.avatar"
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
                      <input type="file" id="fileInput2" @change="selectFile" hidden>
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
          </v-card>
        </v-dialog>
        <v-btn v-if="admin" @click="triggerUsers" text class="mr-md-3">
          <v-icon>mdi-email</v-icon>
          <span class="d-none d-md-block ml-2 font-weight-light">MESSAGES</span>
        </v-btn>
        <v-dialog
          v-if="admin"
          v-model="dialog2"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar
              dark
              style="border-radius: 0"
              color="primary"
            >
              <v-btn
                icon
                dark
                @click="dialog2 = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>MESSAGES</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="dialog2 = false"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-row no-gutters>
              <v-col cols="12" sm="4">
                <template v-if="!loaded">
                  <v-skeleton-loader
                    v-for="(i, index) in 10"
                    :key="index"
                    type="list-item-avatar"
                    class="mb-4"
                  ></v-skeleton-loader>
                </template>
                <v-list v-if="loaded">
                  <v-list-item-group v-model="model" mandatory>
                    <template v-for="user in users">
                      <v-list-item :Key="user._id" @click="triggerUserMessages(user)">
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
              <v-col cols="12" sm="6" class="offset-sm-1 pt-3">
                <div class="px-2">
                  <v-text-field
                    label="message..."
                    v-model="answer"
                    filled
                    append-outer-icon="mdi-send"
                    @click:append-outer="answerContact"
                  >
                  </v-text-field>
                </div>
                <template v-if="userMessages">
                  <v-timeline>
                    <v-timeline-item
                      v-for="message in userMessages" :key="message._id"
                      large
                    >
                      <template v-slot:icon>
                        <v-avatar v-if="message.fromAdmin">
                          <v-img :src="admin.avatar">
                          </v-img>
                        </v-avatar>
                        <v-avatar v-if="!message.fromAdmin">
                          <v-img :src="message.creator.avatar">
                          </v-img>
                        </v-avatar>
                      </template>
                      <template v-slot:opposite>
                        <span>{{ message.creator.name }}</span>
                      </template>
                      <v-card class="elevation-2">
                        <v-card-text>
                          {{ message.content }}
                        </v-card-text>
                      </v-card>
                    </v-timeline-item>
                  </v-timeline>
                </template>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </div>
      <v-menu
        transition="slide-x-transition"
        offset-y
        open-on-hover
        bottom
        right
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-card width="300">
          <v-card-title>
            <template v-if="admin">
              <v-avatar size="50" v-if="admin.avatar">
                <v-img
                  :src="admin.avatar"
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
            </template>
            <template v-if="user">
              <v-avatar size="50" v-if="user.avatar">
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
            </template>
            <template v-if="tourguide">
              <v-avatar size="50" v-if="tourguide.avatar">
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
            </template>
            <p class="ma-0 ml-4 pa-0" v-if="user || tourguide">
              <span class="font-weight-light">{{ user ? user.name : tourguide.name }}</span>
              <v-subheader class="ma-0 pa-0" style="height:1rem">
                {{ user ? user.email : tourguide.email }}
              </v-subheader>
            </p>
            <p class="ma-0 ml-4 pa-0" v-if="admin">
              <span class="font-weight-light">{{ admin.name }}</span>
              <v-subheader class="ma-0 pa-0" style="height:1rem">
                {{ admin.email }}
              </v-subheader>
            </p>
            <v-spacer></v-spacer>
            <v-switch
              v-model="$vuetify.theme.dark"
            ></v-switch>
          </v-card-title>
          <v-divider class="mt-0"></v-divider>
          <template v-if="user && contacts">
            <div v-if="contacts.length" style="height:320px;overflow-y: scroll">
              <div class="font-weight-bold ml-8 mb-2">
                Latest
              </div>
              <v-timeline
                align-top
                dense
              >
                <v-timeline-item
                  v-for="message in contacts"
                  :key="message._id"
                  :color="message.fromAdmin ? 'green' : 'deep-purple lighten-1'"
                  small
                >
                  <div>
                    <div v-if="message.fromAdmin" class="font-weight-normal">
                      <strong>Admin</strong> @{{ message.createdAt | moment("h:mm A") }}
                    </div>
                    <div v-if="!message.fromAdmin" class="font-weight-normal">
                      <strong>You</strong> @{{ message.createdAt | moment("h:mm A") }}
                    </div>
                    <div>{{ message.content }}</div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </div>
          </template>
          <template v-if="user && contacts">
            <v-divider v-if="contacts.length" class="mt-0"></v-divider>
          </template>
          <v-list class="ma-0">
            <v-list-item v-if="user || tourguide" router to="/profile" class="uk-visible@m">
              <v-list-item-title class="font-weight-light">PROFILE</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user || tourguide" router to="/payment" class="uk-visible@m">
              <v-list-item-title class="font-weight-light">PAYMENT</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="user" @click="dialog = true">
              <v-list-item-title class="font-weight-light">CONTACT</v-list-item-title>
            </v-list-item>
            <v-list-item id="globalLog" @click="log">
              <v-list-item-title class="font-weight-light">LOGOUT</v-list-item-title>
            </v-list-item>
          </v-list>  
        </v-card>
      </v-menu>
      <v-dialog
        v-if="user"
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
            <v-toolbar-title>CONTACT US</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="contactUs"
              >
                SEND
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-row
            class="pb-3 pt-6 ma-0 px-6"
            align="center"
          >
            <span class="mr-4">To</span>
            <v-menu
              v-model="menu"
              bottom
              right
              transition="scale-transition"
              origin="top left"
            >
              <template v-slot:activator="{ on }">
                <v-chip
                  pill
                  v-on="on"
                >
                  <v-avatar left>
                    <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                  </v-avatar>
                  Admin
                </v-chip>
              </template>
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Admin</v-list-item-title>
                      <v-list-item-subtitle>admin@vuetifyjs.com</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn
                        icon
                        @click="menu = false"
                      >
                        <v-icon>mdi-close-circle</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </v-row>
          <v-divider></v-divider>
          <v-sheet class="pa-5 mt-5">
            <v-textarea
              filled
              v-model="contact.content"
              required
              label="content"
            ></v-textarea>
          </v-sheet>
        </v-card>
      </v-dialog>
    </v-app-bar>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Appbar',
  data () {
    return {
      dialog: false,
      dialog2: false,
      dialog3: false,
      loaded: false,
      model: 0,
      snackbar: false,
      snackbarType: '',
      text: '',
      menu: false,
      file: '',
      usernameLoading: false,
      emailLoading: false,
      passwordLoading: false,
      usernameForm: {
        valid: false
      },
      emailForm: {
        valid: false
      },
      passwordForm: {
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
      password: {
        value: '',
        show: false,
        rules: [
          v => !!v || 'Password is required',
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
          v => (v && v.length >= 6) || 'Passowrd must be at least 6 characters'
        ]
      },
      answer: '',
      contact: {
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'manageTours',
      'tourguide',
      'admin',
      'users',
      'userMessages',
      'contacts'
    ])
  },
  created () {
    if (this.user) {
      this.getContacts()
    }
    if (this.admin) {
      this.username.value = this.admin.name
      this.email.value = this.admin.email
    }
  },
  methods: {
    ...mapActions([
      'logoutUser',
      'logoutGuide',
      'logoutAdmin',
      'resetAdmin',
      'resetHotels',
      'resetRestaurant',
      'resetPharmacies',
      'resetTransportations',
      'resetPosts',
      'resetUser',
      'resetTours',
      'resetNews',
      'resetComments',
      'resetContacts',
      'resetGuide',
      'resetPlaces',
      'resetManageTours',
      'addContact',
      'getContacts',
      'getUsers',
      'getUserMessages',
      'addAnswer',
      'updateAdminAction',
      'updateAdminAvatar',
      'deleteAdminAvatar',
    ]),
    triggerFile () {
      document.getElementById('fileInput2').click()
    },
    selectFile () {
      const file = document.getElementById('fileInput2').files[0]
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
      this.updateAdminAvatar(formData).then(() => {
        this.file = ""
        this.activateSnackbar('success', 'Profile image updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    deleteAvatar () {
      this.deleteAdminAvatar().then(() => {
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
      this.updateAdminAction(form).then(() => {
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
      this.updateAdminAction(form).then(() => {
        this.emailLoading = false
        this.activateSnackbar('success', 'Email updated!')
      }).catch (() => {
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
      this.updateAdminAction(form).then(() => {
        this.passwordLoading = false
        this.activateSnackbar('success', 'Password updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    triggerUsers() {
      this.dialog2 = !this.dialog2
      this.getUsers().then(() => {
        this.triggerUserMessages (this.users[0])
        this.loaded = true
      })
    },
    triggerUserMessages (user) {
      this.getUserMessages(user._id)
    },
    answerContact () {
      if (!this.answer) {
        return
      }
      const data = {
        'content': this.answer,
        'creator': this.users[this.model]._id,
      }
      this.addAnswer(data).then(() => {
        this.answer = ''
      })
    },
    contactUs () {
      if (!this.contact.content) {
        this.activateSnackbar('error', 'Please fill information')
        return
      }
      this.addContact(this.contact).then(() => {
        this.dialog = false
        this.contact.content = ''
        this.activateSnackbar('success', 'Message sent!')
      }).catch (() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    log () {
      if (this.user) {
        this.logoutUser().then(() => {
          this.resetHotels()
          this.resetRestaurant()
          this.resetPharmacies()
          this.resetTransportations()
          this.resetPosts()
          this.resetUser()
          this.resetTours()
          this.resetNews()
          this.resetPlaces()
          this.resetComments()
          this.resetContacts()
          this.$router.push('/login')
        })
      } else if (this.tourguide) {
        this.logoutGuide().then(() => {
          this.resetGuide()
          this.resetPlaces()
          this.resetPosts()
          this.resetTours()
          this.resetComments()
          this.resetNews()
          this.resetManageTours()
          this.$router.push('/login')
        })
      } else if (this.admin) {
        this.logoutAdmin().then(() => {
          this.resetAdmin()
          this.$router.push('/loginadmin')
        })
      }
    },
    activateSnackbar (type, text) {
      this.text = text
      this.snackbarType = type
      this.snackbar = true
    }
  }
}
</script>