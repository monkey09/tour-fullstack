<template>
  <section>
    <v-progress-linear fixed :value="manageToursProgress" :active="manageToursProgress < 100 ? true : false"></v-progress-linear>
    <v-container>
      <h1 class="font-weight-light darkText--text uk-heading-bullet">MANAGE TOURS</h1>
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
          v-for="(manageTour, index) in manageTours" :key="index"
        >
          <ManageTour v-if="loaded" :manageTour="manageTour" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ManageTour from '@/components/ManageTour'

export default {
  name: 'ManageTours',
  data () {
    return {
      loaded: false
    }
  },
  computed: {
    ...mapGetters(['manageTours', 'manageToursProgress'])
  },
  components: {
    ManageTour
  },
  created () {
    this.getManageTours().then(() => {
      this.loaded = true
    })
  },
  methods: {
    ...mapActions(['getManageTours'])
  }
}
</script>