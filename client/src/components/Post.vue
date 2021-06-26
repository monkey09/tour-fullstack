<template>
  <div>
    <v-card
      class="mb-4"
    >
      <v-img
        @click="expandPost"
        style="cursor:pointer"
        :src="post.image"
        class="grey lighten-2"
        min-height="200px"
        max-height="400px"
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
        <v-avatar size="50">
          <v-img
            :src="post.owner.avatar"
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
        <div class="d-flex flex-column ">
          <span class="ml-3 font-weight-light">{{ post.owner.name }}</span>
          <span class="ml-3 clock--text caption">{{ post.createdAt | moment("from") }}</span>
        </div>
      </v-card-title>

      <v-card-subtitle class="mt-4">
        {{ post.content }}
      </v-card-subtitle>
      <v-divider class="mb-3"></v-divider>
      <v-card-actions class="pt-0 pb-2">
        <div style="width:50%">
          <v-btn
            color="primary"
            class="mx-auto"
            block
            text
            @click="likeMe"
          >
            <p class="my-0 subtitle-2 mr-3 text-center font-weight-light primary--text">{{ post.likes }}</p>
            <v-icon>{{ liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}</v-icon>
          </v-btn>
        </div>
        <div style="width:50%">
          <v-btn
            color="primary"
            class="mx-auto"
            block
            text
            @click="expandPost"
          > 
            <p class="my-0 subtitle-2 mr-3 text-center font-weight-light primary--text">{{ post.comments }}</p>
            <v-icon>mdi-message</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Post',
  props: ['post'],
  computed: {
    ...mapGetters(['user', 'tourguide']),
    liked () {
      let result = false
      if (this.user) {
        result = this.user.likedPosts.some(post => {
          return post.likedPost == this.post._id
        })
      } else if (this.tourguide) {
        result = this.tourguide.likedPosts.some(post => {
          return post.likedPost == this.post._id
        })
      }
      return result
    }
  },
  methods: {
    ...mapActions(['likePost', 'pushUserLike', 'pushGuideLike']),
    likeMe () {
      if (this.user) {
        this.pushUserLike(this.post._id).then(response => {
          const data = {
            id: this.post._id,
            status: {
              'alreadyLiked': response
            }
          }
          this.likePost(data)
        })
      } else if (this.tourguide) {
        this.pushGuideLike(this.post._id).then(response => {
          const data = {
            id: this.post._id,
            status: {
              'alreadyLiked': response
            }
          }
          this.likePost(data)
        })
      }
    },
    expandPost () {
      this.$emit('openDialog')
    }
  }
}
</script>