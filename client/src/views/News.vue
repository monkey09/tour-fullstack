<template>
  <section>
    <v-progress-linear fixed :value="newsProgress" :active="newsProgress < 100 ? true : false"></v-progress-linear>
    <v-container>
      <h1 class="font-weight-light darkText--text uk-heading-bullet">NEWS</h1>
      <v-row v-if="!loaded">
        <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-skeleton-loader
            class="mx-auto my-4"
            elevation="2"
            type="image, card-heading, divider, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>  
        <v-col v-for="(oneNew, index) in news" :key="index" cols="12" sm="6" md="4" lg="3">
          <New v-if="loaded" :oneNew="oneNew" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template> 
<script>
import { mapGetters, mapActions } from 'vuex'
import New from '@/components/New'

export default {
  name: 'News',
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['news', 'newsProgress'])
  },
  created () {
    this.getNews().then(() => {
      this.loaded = true
    })
  },
  methods: {
    ...mapActions(['getNews'])
  },
  components: {
    New
  }
}
</script>