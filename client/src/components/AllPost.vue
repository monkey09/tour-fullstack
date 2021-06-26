<template>
  <div>
    <v-card
      class="mb-4"
    >
      <v-img
        :src="post.image"
        class="grey lighten-2"
        min-height="200px"
        max-height="300px"
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
      <v-card-subtitle>
        {{ post.content }}
      </v-card-subtitle>
      <v-divider class="mt-1 mb-4"></v-divider>  
      <v-card-actions>
        <v-btn
          color="red"
          text
          block
          @click="deleteAdPost(post._id)"
        >
          DELETE
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Post',
  props: ['post'],
  methods: {
    ...mapActions(['deleteAdPost'])
  }
}
</script>