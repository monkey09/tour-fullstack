<template>
  <v-app dark>
    <Appbar ref="myAppBar" v-if="authUser || authGuide || authAdmin" />
    <div v-if="authUser || authGuide" id="mobile-nav" class="uk-hidden@m" uk-offcanvas="mode: reveal; overlay: true">
			<div class="uk-offcanvas-bar pa-0">
        <v-list flat dark class="uk-nav">
          <v-subheader>CATEGORIES</v-subheader>
          <v-list-item-group
            color="primary"
          >
            <v-list-item v-if="user || tourguide" router to="/">
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>HOME</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="user || tourguide" router to="/about">
              <v-list-item-icon>
                <v-icon>mdi-information</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>ABOUT</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="authUser" router to="/services">
              <v-list-item-icon>
                <v-icon>mdi-menu</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>SERVICES</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="authUser" router to="/tours">
              <v-list-item-icon>
                <v-icon>mdi-hail</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>TOURS</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="user || tourguide" router to="/news">
              <v-list-item-icon>
                <v-icon>mdi-newspaper-variant-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>NEWS</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="authGuide" router to="/places">
              <v-list-item-icon>
                <v-icon>mdi-map-marker-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>PLACES</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="authGuide" router to="/managetours">
              <v-list-item-icon>
                <v-icon>mdi-cogs</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>MANAGE TOURS</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="user && user.tour" router to="/chat">
              <v-list-item-icon>
                <v-icon>mdi-message-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>CHAT</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="authGuide && manageTours" router to="/guidechat">
              <v-list-item-icon>
                <v-icon>mdi-message-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>CHAT</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="user || tourguide" router to="/profile">
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>PROFILE</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="user || tourguide" router to="/payment">
              <v-list-item-icon>
                <v-icon>mdi-credit-card-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>PAYMENT</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
			</div>
		</div>
    <v-main>
      <router-view 
        @globalLog="globalLog" @logedIn="logedIn" @tourJoined="logedIn"
        @tourLefted="leaveRoom" @sendMessage="sendMessage" :messages="messages"
      ></router-view>
    </v-main>
  </v-app>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters, mapActions } from 'vuex'
import Appbar from '@/components/Appbar'

export default {
  name: 'App',
  data () {
    return {
      socket: io('/'),
      messages: [],
    }
  },
  computed: {
    ...mapGetters([
      'authUser',
      'authGuide',
      'authAdmin',
      'manageTours',
      'user',
      'tourguide'
    ])
  },
  components: {
    Appbar
  },
  created () {
    this.socket.on('message', message => {
      if (this.user || this.tourguide) {
        this.messages.push(message)
      }
    })
    this.socket.on('userJoined', () => {
      this.messages = []
      if (this.user.tour) this.getUserTour(this.user.tour)
      if (this.tourguide) this.getManageTours()
    })
    this.socket.on('userLefted', () => {
      this.messages = []
    })
    if (this.user) this.logedIn()
    else if (this.tourguide) this.logedIn()
  },
  methods: {
    ...mapActions(['getUserTour', 'getManageTours']),
    globalLog () {
      this.$refs.myAppBar.log()
    },
    logedIn() {
      this.messages = []
      if (this.user.tour) this.socket.emit('logedIn', this.user._id)
      else if (this.tourguide) this.socket.emit('logedIn2', this.tourguide._id)
    },
    leaveRoom (room) {
      this.messages = []
      this.socket.emit('leaveRoom', room)
    },
    sendMessage (message, manageRoom) {
      let msg = null
      if (this.user) msg = { message, room: this.user.tour, userId: this.user._id }
      else if (this.tourguide) msg = { message, room: manageRoom, userId: this.tourguide._id }
      this.socket.emit('sendMessage', msg)
    }
  }
}
</script>
<style lang="scss">
a{
  text-decoration: none !important;
}
</style>
