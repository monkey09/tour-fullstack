<template>
  <div>
    <v-card
      class="mb-4"
    >
      <v-img
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
        <v-app-bar
          flat
          color="rgba(000, 000, 000, .3)"
        >
          <v-spacer></v-spacer>
          
          <v-btn
            class="mr-4"
            color="green"
            @click="expandPost"
            fab
            dark
            small
          >
            <v-icon>mdi-open-in-new</v-icon>
          </v-btn>

          <v-btn
            color="red"
            @click="deletePost"
            fab
            dark
            small
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-app-bar>
      </v-img>

      <v-card-subtitle>
        {{ post.content }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Post',
  props: ['post'],
  methods: {
    ...mapActions(['deleteGuidePost']),
    expandPost () {
      this.$emit('openDialog')
    },
    deletePost () {
      this.$emit('deleted')
      this.deleteGuidePost(this.post._id)
    }
  }
}
</script>