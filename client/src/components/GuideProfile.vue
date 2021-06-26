<template>
  <v-sheet>
    <v-progress-linear fixed :value="guidePostsProgress" :active="guidePostsProgress < 100 ? true : false"></v-progress-linear>
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
            <v-hover v-if="tourguide">
              <template v-slot:default="{ hover }">
                <v-img 
                  width="100%"
                  height="300px"
                  class="mb-5 mx-auto grey lighten-2"
                  v-if="tourguide.avatar"
                  :src="tourguide.avatar"
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
              @submit.prevent="updateLicense"
              ref="licenseForm"
              v-model="licenseForm.valid"
            >
              <v-text-field
                label="License"
                v-model="license.value"
                :rules="license.rules"
                required
                :loading="licenseLoading"
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
                :loading="languageLoading"
                label="Language"
              ></v-select>
            </v-form>
          </v-card>
        </v-col>
        <v-col cols="12" md="7" xl="5">
          <h3 class="uk-heading-line darkText--text uk-text-center"><span>POSTS</span></h3>
          <v-skeleton-loader
            v-if="!loaded"
            class="mx-auto mb-4"
            elevation="2"
            type="image, article, divider, actions"
          ></v-skeleton-loader>
          <v-dialog
            v-model="dialog"
            max-width="500px"
            transition="dialog-top-transition"
          >
            <PostExpand :id="postId" :key="postId" @closeDialog="dialog=false" />
          </v-dialog>
          <div v-for="(post, index) in guidePosts" :key="index">
            <GuidePost 
              v-if="loaded" 
              :post="post" 
              @openDialog="expand(post._id)" 
              @deleted="activateSnackbar('success', 'Post deleted!')"
            />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import GuidePost from '@/components/GuidePost'
import PostExpand from '@/components/PostExpand'

export default {
  name: 'GuideProfile',
  data () {
    return {
      langs: ['English', 'Arabic', 'Chinese', 'French', 'German', 'Hindi', 'Irish', 'Italian', 'Japanese', 'Korean', 'Portuguese', 'Russian', 'Spanish'],
      loaded: false,
      postId: 0,
      dialog: false,
      usernameLoading: false,
      emailLoading: false,
      phoneLoading: false,
      passwordLoading: false,
      licenseLoading: false,
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
      licenseForm: {
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
      license: {
        value: '',
        rules: [
          v => !!v || 'License is required',
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
      'tourguide',
      'guidePosts',
      'guidePostsProgress'
    ])
  },
  created () {
    this.username.value = this.tourguide.name
    this.phone.value = this.tourguide.phone
    this.email.value = this.tourguide.email
    this.license.value = this.tourguide.license
    this.language.value = this.tourguide.language
    this.getGuidePosts().then(() => {
      this.loaded = true
    })
  },
  components: {
    GuidePost,
    PostExpand
  },
  methods: {
    ...mapActions([
      'updateGuideAction',
      'getGuidePosts',
      'updateGuideAvatar',
      'deleteGuideAvatar'
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
      this.updateGuideAvatar(formData).then(() => {
        this.file = ""
        this.activateSnackbar('success', 'Profile image updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    deleteAvatar () {
      this.deleteGuideAvatar().then(() => {
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
      this.updateGuideAction(form).then(() => {
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
      this.updateGuideAction(form).then(() => {
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
      this.updateGuideAction(form).then(() => {
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
      this.updateGuideAction(form).then(() => {
        this.passwordLoading = false
        this.activateSnackbar('success', 'Password updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
    },
    updateLicense () {
      if (!this.licenseForm.valid) {
        return
      }
      const form = {
        license: this.license.value
      }
      this.licenseLoading = true
      this.updateGuideAction(form).then(() => {
        this.licenseLoading = false
        this.activateSnackbar('success', 'License updated!')
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
      this.updateGuideAction(form).then(() => {
        this.languageLoading = false
        this.activateSnackbar('success', 'Language updated!')
      }).catch(() => {
        this.activateSnackbar('error', 'Something went wrong please try again!')
      })
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