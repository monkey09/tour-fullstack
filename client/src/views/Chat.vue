<template>
  <section v-if="tour && user" style="height:calc(100vh - 64px)">
    <v-container style="height:100%" class="pt-8">
      <v-row style="height:100%">
        <v-col style="height:100%" cols="12" md="8" lg="7" class="py-0 mx-auto">
          <v-card style="height:100%">
            <v-toolbar flat class="lightHeader">
              <v-toolbar-title class="font-weight-light" style="width:100%">
                <v-avatar class="mr-3">
                    <v-img
                    height="50"
                    width="50"
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
                </v-avatar>
                <span>{{ tour.title }}</span>
              </v-toolbar-title>
              <v-spacer></v-spacer>
                <v-menu offset-y open-on-hover>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      icon
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-account-multiple
                    </v-icon>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-avatar class="user-avatar" size="40">
                          <v-img
                            class="grey lighten-2"
                            :src="tour.creator.avatar"
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
                      </v-list-item-icon>
                      <v-list-item-title>{{ tour.creator.name }}</v-list-item-title>
                    </v-list-item>
                    <v-list-item
                      v-for="(tourUser, index) in tour.users"
                      :key="index"
                    >
                      <v-list-item-icon>
                        <v-avatar class="user-avatar" size="40">
                          <v-img
                            class="grey lighten-2"
                            :src="tourUser.avatar"
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
                      </v-list-item-icon>
                      <v-list-item-title>{{ tourUser.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
            </v-toolbar>
            <v-divider class="my-0"></v-divider>
            <div class="scrolled-content pt-2 pl-16 pr-5" style="height:calc(100% - 130px);overflow-y:scroll">
              <template v-if="tour">
                <template v-for="message in tour.messages">
                  <div 
                    @click="trans(message.content, message._id)"
                    :class="message.userId == user._id ? 'message-right primary' : 'message-left grey lighten-4'"
                    class="mb-4" :key="message._id"
                  >
                    <v-avatar v-if="message.userId != user._id" class="user-avatar" size="45">
                      <v-img
                        class="grey lighten-2"
                        :src="populateUser(message.userId).avatar"
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
                    <h6 v-if="message.userId != user._id" class="mb-0 mt-0 text--white font-weight-bold">
                      {{ populateUser(message.userId).name }}
                    </h6>
                    <p :id="message._id" class="mt-0 text--white font-weight-light">
                      {{ message.content }}
                    </p>
                    <span class="grey--text subtitle-2 font-weight-light float-right">
                      {{ message.clock | moment("h:mm a") }}
                    </span>
                    <div class="corner"></div>
                    <v-progress-circular
                      :id="message._id + 'ps'"
                      style="position:absolute;display:none"
                      :width="3"
                      indeterminate
                      color="white"
                    ></v-progress-circular>
                  </div>
                </template>
              </template>
              <template v-for="(message, index) in messages">
                <div   
                    :class="message.userId == user._id ? 'message-right primary' : 'message-left grey lighten-4'"
                    class="mb-4" :key="index" @click="trans(message.content, index)"
                  >
                  <v-avatar v-if="message.userId != user._id" class="user-avatar" size="45">
                    <v-img
                      class="grey lighten-2"
                      :src="populateUser(message.userId).avatar"
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
                  <h6 v-if="message.userId != user._id" class="mb-0 mt-0 text--white font-weight-bold">
                    {{ populateUser(message.userId).name }}
                  </h6>
                  <p :id="index" class="mt-0 text--white font-weight-light">
                    {{ message.content }}
                  </p>
                  <span class="grey--text subtitle-2 font-weight-light float-right">
                    {{ message.clock | moment("h:mm A") }}
                  </span>
                  <div class="corner"></div>
                  <v-progress-circular
                    :id="index + 'ps'"
                    style="position:absolute;display:none"
                    :width="3"
                    indeterminate
                    color="white"
                  ></v-progress-circular>
                </div>
              </template>
            </div>
            <v-card-actions class="pa-0 ma-0">
              <v-card-text class="pb-0 pt-3 pt-md-1 px-md-8 ma-0">
                <v-form @submit.prevent="sendMessage">
                  <v-text-field 
                    label="message..."
                    filled
                    rounded
                    dense
                    v-model="msg" 
                    hide-details="auto"
                    append-outer-icon="mdi-send"
                    @click:append-outer="sendMessage"
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Chat',
  props: ['messages'],
  data () {
    return {
      msg: '',
      mm: '',
      tt: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'tour'])
  },
  created () {
    if (this.user.tour) this.getUserTour(this.user.tour).then(() => { this.scrollToBottom() })
    else this.$router.push('/')
  },
  watch: { 
    messages: function() {
      setTimeout(() => {
        this.scrollToBottom()
      }, .0000000001)
    }
  },
  methods: {
    ...mapActions(['getUserTour']),
    trans (mm, dd) {
      this.mm = mm
      document.getElementById(dd + 'ps').style.display = "block"
      this.translate().then(res => {
        this.tt = res
        document.getElementById(dd).innerHTML = this.tt
        document.getElementById(dd + 'ps').style.display = "none"
      }).catch(() => {
        document.getElementById(dd + 'ps').style.display = "none"
      })
    },
    async translate () {
      try {
        let target = null
        if (this.user) target = this.codeLanguage(this.user.language)
        else if (this.tourguide) target = this.codeLanguage(this.tourguide.language)
        const data = {
          q: this.mm,
          source: 'auto',
          target: target
        }
        const response = await axios.post('https://libretranslate.com/translate', data)
        return response.data.translatedText
      } catch (e) {
        throw new Error()
      }
    },
    codeLanguage (language) {
      let langCode = null
      switch (language) {
        case 'English':
          langCode = 'en'
          break;
        case 'Arabic':
          langCode = 'ar'
          break;
        case 'Chinese':
          langCode = 'zh'
          break;
        case 'French':
          langCode = 'fr'
          break;
        case 'German':
          langCode = 'de'
          break;
        case 'Hindi':
          langCode = 'hi'
          break;
        case 'Irish':
          langCode = 'ga'
          break;
        case 'Italian':
          langCode = 'it'
          break;
        case 'Japanese':
          langCode = 'ja'
          break;
        case 'Korean':
          langCode = 'ko'
          break;
        case 'Portuguese':
          langCode = 'pt'
          break;
        case 'Russian':
          langCode = 'ru'
          break;
        case 'Spanish':
          langCode = 'es'
          break;
      }
      return langCode
    },
    populateUser (id) {
      const user = this.tour.users.find(user => user._id == id)
      if (user) return user
      else if (id == this.tour.creator._id) return this.tour.creator
    },
    scrollToBottom () {
      document.getElementsByClassName('scrolled-content')[0].scrollTop =
      document.getElementsByClassName('scrolled-content')[0].scrollHeight
    },
    sendMessage () {
      if (this.msg == '') return
      this.$emit('sendMessage', this.msg)
      this.msg = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.message-left{
  padding:12px 13px;
  cursor: pointer;
  border-radius:5px 5px 5px 0px;
  clear:both;
  position:relative;
  float:left;
  max-width: 80%;
  @media (min-width: 764px) {
    max-width: 40%;
  }
  min-width: 150px;
  .user-avatar{
    position:absolute!important;
    bottom:0px;
    left:-55px!important;
  }
  p{
    margin-bottom:0px;
  }
  .corner{
    position: absolute;
    left:0px;
    bottom:0px;
    width:20px;
    height:10px;
    background-color:inherit;
    transform: skewX(-40deg)
  }
}
.message-right{
  padding:12px 13px;
  cursor: pointer;
  border-radius:5px 5px 0px 5px;
  clear:both;
  p, h6{
    color:#FFF!important;
  }
  p{
    margin-bottom:0px;
  }
  position:relative;
  float:right;
  max-width: 80%;
  @media (min-width: 764px) {
    max-width: 40%;
  }
  min-width: 150px;
  .corner{
    position: absolute;
    right:0px;
    bottom:0px;
    width:20px;
    height:10px;
    background-color:inherit;
    transform: skewX(30deg)
  }
}
</style>