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
      </v-img>

      <v-card-subtitle>
        {{ post.content }}
      </v-card-subtitle>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'Post',
  props: ['post']
}
</script>