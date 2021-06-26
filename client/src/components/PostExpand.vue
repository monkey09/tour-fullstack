<template>
  <div>
    <v-skeleton-loader
      v-if="!loaded"
      class="mx-auto white darkCard"
      elevation="2"
      type="image, article, divider, list-item-three-line, list-item-three-line"
    ></v-skeleton-loader>
    <v-card
      v-if="post && loaded"
    >
      <v-img
        :src="post.image"
        min-height="200px"
        max-height="400px"
      >
        <v-app-bar
          flat
          color="rgba(000, 000, 000, .3)"
        >
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            @click="$emit('closeDialog')"
            icon
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-app-bar>
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
        <v-avatar size="50">
          <v-img
            class="grey lighten-2"
            :src="post.owner.avatar"
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
          <span class="ml-3 font-weight-light">{{ post.owner.name }}</span>
          <span class="ml-3 clock--text caption">{{ post.createdAt | moment("from") }}</span>
        </div>
      </v-card-title>
      <v-card-subtitle class="mt-4">{{ post.content }}</v-card-subtitle>
      <v-divider></v-divider>
      <v-card-actions>
        <div style="width:100%;overflow:hidden">
          <v-form @submit.prevent="addComment" ref="form">
            <v-text-field 
              required 
              v-model="comment.content" 
              label="comment..."
              class="mx-5"
            >
            </v-text-field>
          </v-form>
          <v-card-text v-for="(comment, index) in comments" :key="index">
            <v-alert
              border="left"
              class="ma-0 py-0 pr-1"
            >
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
              <span class="ml-3 font-weight-light">{{ comment.owner.name }}</span>
              <span class="ml-3 d-inline-block clock--text caption">| {{ comment.createdAt | moment("from") }}</span>
              <p class="mb-0 mt-2 subtitle-2 text--disabled">{{ comment.content }}</p>
            </v-alert>
          </v-card-text>
        </div>
      </v-card-actions>
    </v-card>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'OnePost',
  props: ['id'],
  data () {
    return {
      loaded: false,
      snackbar: false,
      snackbarType: '',
      text: '',
      comment: {
        post: this.id,
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters(['post', 'comments', 'user', 'tourguide']),
  },
  created () {
    this.getPostAction(this.id)
  },
  methods: {
    ...mapActions(['getPost', 'getComments', 'addCommentAction']),
    getPostAction (id) {
      this.getPost(id)
      .then(() => {
        this.getCommentsAction(this.id)
      })
      .catch(() => {
        this.$router.push("/")
      })
    },
    getCommentsAction (id) {
      this.getComments(id).then(() => {
        this.loaded = true
      })
    },
    addComment () {
      if (!this.comment.content) {
        this.activateSnackbar('error', 'Please fill information')
        return
      }
      this.addCommentAction(this.comment).then(() => {
        this.$refs.form.reset()
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