<template>
  <section id="posts">
    <h1 class="font-weight-light darkText--text uk-heading-bullet">POSTS</h1>
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
    <div class="add-post mb-5 grey lighten-4 pa-8">
      <v-form @submit.prevent="addPost" ref="form">
        <v-text-field  
          v-model="form.content" 
          prepend-icon="mdi-text"
          label="content..."
        >
        </v-text-field>
        <v-file-input
          label="File input"
          v-model="form.file"
          prepend-icon="mdi-camera"
        ></v-file-input>
        <v-btn 
          icon dark class="primary" 
          type="submit"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-form>
    </div>
    <div v-if="!loaded">
      <v-skeleton-loader
        class="mx-auto mb-4"
        elevation="2"
        type="card, article, divider, actions"
      ></v-skeleton-loader>
      <v-skeleton-loader
        class="mx-auto"
        elevation="2"
        type="card, article, actions"
      ></v-skeleton-loader>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="500px"
      transition="dialog-top-transition"
    >
      <PostExpand :id="postId" :key="postId" @closeDialog="dialog=false" />
    </v-dialog>
    <div v-for="(post, index) in posts" :key="index">
      <Post v-if="loaded" :post="post" @openDialog="expand(post._id)"></Post>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import PostExpand from '@/components/PostExpand'
  import Post from '@/components/Post'
  export default {
    name: 'Posts',
    data () {
      return {
        postId: 0,
        dialog: false,
        loading: false,
        loaded: false,
        snackbar: false,
        snackbarType: '',
        text: '',
        form: {
          content: '',
          file: []
        }
      }
    },
    components: {
      PostExpand,
      Post
    },
    computed: {
      ...mapGetters([
        'posts'
      ])
    },
    created () {
      this.updateInitialState()
    },
    mounted () {
      this.scroll()
    },
    methods: {
      ...mapActions([
        'addPostAction',
        'getPosts',
        'getMorePosts'
      ]),
      scroll () {
        window.onscroll = () => {
          const bottomOfWindow = Math.floor(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
          if (bottomOfWindow) {
            this.getMorePosts()
          }
        }
      },
      updateInitialState() {
        this.getPosts().then(() => {
          this.loaded = true
        })
      },
      addPost () {
        this.loading = true
        const formData = new FormData()
        formData.append('content', this.form.content)
        formData.append('file', this.form.file)
        if (!this.form.content || !this.form.file) {
          this.loading = false
          this.activateSnackbar('error', 'Please fill information')
          return
        }
        this.addPostAction(formData).then(() => {
          this.loading = false
          this.activateSnackbar('success', 'Post added!')
          this.$refs.form.reset()
        }).catch(() => {
          this.loading = false
          this.activateSnackbar('error', 'Something went wrong please try again!')
          this.$refs.form.reset()
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
