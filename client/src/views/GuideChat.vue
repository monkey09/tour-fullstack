<template>
  <section v-if="tourguide" style="height:calc(100vh - 64px)">
    <v-container style="height:100%" class="pt-8">
      <v-row style="height:100%">
        <v-col style="height:100%" class="d-none pt-0 d-md-block" cols="12" md="4">
          <v-card
            class="mx-auto"
            style="height:100%"
          >
            <v-toolbar flat class="lightHeader">
              <v-toolbar-title class="font-weight-light">
                ROOMS
              </v-toolbar-title>
            </v-toolbar>
            <v-divider class="my-0"></v-divider>
            <v-list style="height:calc(100% - 64px);overflow-y:scroll">
              <v-list-item-group v-model="model" color="primary" mandatory>
                <v-list-item
                  v-for="(manageTour, index) in manageTours"
                  :key="index"
                  @click="scrollToBottom"
                >
                  <v-list-item-icon>
                    <v-img
                      height="50"
                      width="50"
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
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="manageTour.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col style="height:100%;position:relative;overflow:hidden" class="pt-0" cols="12" md="8">
          <v-navigation-drawer
            temporary
            v-model="drawer"
            class="d-md-none lightHeader"
            absolute
          >
            <v-list style="height:100%;overflow-y:scroll">
              <v-list-item-group v-model="model" color="primary" mandatory>
                <v-list-item
                  v-for="(manageTour, index) in manageTours"
                  :key="index"
                  @click="scrollToBottom"
                >
                  <v-list-item-icon>
                    <v-img
                      height="50"
                      width="50"
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
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="manageTour.title"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
          <v-card style="height:100%">
            <v-tabs-items v-model="model" style="height:100%">
              <v-tab-item
                style="height:100%"
                v-for="(manageTour, index) in manageTours"
                :key="index"
              >
                <v-toolbar flat class="lightHeader">
                  <v-toolbar-title class="font-weight-light">
                    <v-avatar class="mr-3">
                        <v-img
                        height="50"
                        width="50"
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
                    </v-avatar>
                    {{ manageTour.title }}
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
                            </v-img>
                          </v-avatar>
                        </v-list-item-icon>
                        <v-list-item-title>{{ tourguide.name }}</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        v-for="(tourUser, index) in manageTour.users"
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
                  <v-btn
                    icon
                    class="d-md-none"
                    style="z-index:1000"
                    @click.stop="drawer = !drawer"
                  >
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-divider class="my-0"></v-divider>
                <div class="scrolled-content pt-2 pl-16 pr-5" style="height:calc(100% - 130px);overflow-y:scroll">
                  <template v-if="manageTour.messages">
                    <template v-for="message in manageTour.messages">
                      <div 
                        :class="message.userId == tourguide._id ? 'message-right primary' : 'message-left grey lighten-4'"
                        class="mb-4" :key="message._id"
                      >
                        <v-avatar v-if="message.userId != tourguide._id" class="user-avatar" size="45">
                          <v-img
                            class="grey lighten-2"
                            :src="populateUser(message.userId, manageTour).avatar"
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
                        <h6 v-if="message.userId != tourguide._id" class="mb-0 mt-0 text--white font-weight-bold">
                          {{ populateUser(message.userId, manageTour).name }}
                        </h6>
                        <p class="mt-0 text--white font-weight-light">
                          {{ message.content }}
                        </p>
                        <span class="grey--text subtitle-2 font-weight-light font-italic float-right">
                          {{ message.clock | moment("h:mm A") }}
                        </span>
                        <div class="corner"></div>
                      </div>
                    </template>
                  </template>
                  <template v-if="messages">
                    <template v-for="(message, index) in messages">
                      <template v-if="message.room == manageTour._id">
                        <div 
                          :class="message.userId == tourguide._id ? 'message-right primary' : 'message-left grey lighten-4'"
                          class="mb-4" :key="index"
                        >
                          <v-avatar v-if="message.userId != tourguide._id" class="user-avatar" size="45">
                            <v-img
                              class="grey lighten-2"
                              :src="populateUser(message.userId, manageTour).avatar"
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
                          <h6 v-if="message.userId != tourguide._id" class="mb-0 mt-0 text--white font-weight-bold">
                            {{ populateUser(message.userId, manageTour).name }}
                          </h6>
                          <p class="mt-0 text--white font-weight-light">
                            {{ message.content }}
                          </p>
                          <span class="grey--text subtitle-2 font-weight-light font-italic float-right">
                            {{ message.clock | moment("h:mm A") }}
                          </span>
                          <div class="corner"></div>
                        </div>
                      </template>
                    </template>
                  </template>
                </div>
                  <v-card-actions class="pa-0 ma-0">
                  <v-card-text class="pb-0 pt-3 pt-md-1 px-md-8 ma-0">
                    <v-form @submit.prevent="sendMessage(manageTour._id)">
                      <v-text-field 
                        label="message..."
                        filled
                        rounded
                        dense
                        v-model="msg" 
                        hide-details="auto"
                        append-outer-icon="mdi-send"
                        @click:append-outer="sendMessage(manageTour._id)"
                      ></v-text-field>
                    </v-form>
                  </v-card-text>
                </v-card-actions>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'GuideChat',
  props:['messages'],
  data() {
    return {
      model: 0,
      drawer: null,
      msg: '',
      container: null,
      elem: null,
    }
  },
  computed: {
    ...mapGetters(['manageTours', 'tourguide'])
  },
  created () {
    this.getManageTours().then(() => {
      if (this.manageTours.length) this.scrollToBottom()
      else this.$router.push('/')
    })
  },
  watch: { 
    messages: function() {
      setTimeout(() => {
        this.scrollToBottom()
      }, .0000000001)
    }
  },
  methods: {
    ...mapActions(['getManageTours']),
    populateUser (id, manageTour) {
      const user = manageTour.users.find(user => user._id == id)
      if (user) return user
      else if (id == this.tourguide._id) return this.tourguide
    },
    scrollToBottom () {
      document.getElementsByClassName('v-window-item--active')[0].children[2].scrollTop =
      document.getElementsByClassName('v-window-item--active')[0].children[2].scrollHeight
    },
    sendMessage (manageRoom) {
      if (this.msg == '') return
      this.$emit('sendMessage', this.msg, manageRoom)
      this.msg = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.message-left{
  padding:12px 13px;
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