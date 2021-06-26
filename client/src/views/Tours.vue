<template>
  <section>
    <v-progress-linear fixed :value="toursProgress" :active="toursProgress < 100 ? true : false"></v-progress-linear>
    <v-container>
      <h1 class="font-weight-light darkText--text uk-heading-bullet">TOURS</h1>
      <v-row v-if="!loaded">
        <v-col v-for="(n, index) in 8" :key="index" cols="12" sm="6" md="4" lg="3">
          <v-skeleton-loader
            class="mx-auto my-4"
            elevation="2"
            type="image, article, divider, list-item-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row>
        <v-col 
          class="py-0"
          cols="12" sm="6" md="4" lg="3"
          v-for="(tour, index) in tours" :key="index"
        >
          <Tour v-if="loaded" :tour="tour" @tourJoined="$emit('tourJoined')" @tourLefted="$emit('tourLefted')" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Tour from '@/components/Tour'

export default {
  name: 'Tours',
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['tours', 'toursProgress'])
  },
  components: {
    Tour
  },
  created () {
    this.getTours().then(() => {
      this.loaded = true
    })
  },
  methods: {
    ...mapActions(['getTours'])
  }
}
</script>