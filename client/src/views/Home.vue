<template>
  <section class="home">
     <v-speed-dial
      v-model="fab"
      fixed
      bottom
      right
      direction="top"
      open-on-hover
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-cog
          </v-icon>
        </v-btn>
      </template>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            fab
            dark
            small
            color="red"
            @click="$emit('globalLog')"
            label="logout"
          >
            <v-icon>mdi-forward</v-icon>
          </v-btn>
        </template>
        <span>logout</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            fab
            dark
            small
            @click="refresh"
            color="green"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span>refresh</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            fab
            dark
            small
            @click="topFunction"
            color="indigo"
          >
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </template>
        <span>scroll top</span>
      </v-tooltip>
    </v-speed-dial>
    <v-progress-linear fixed :value="postsProgress" :active="postsProgress < 100 ? true : false"></v-progress-linear>
    <v-container>
      <v-row>
        <v-col cols=12 lg=5 xl="3" class="d-none d-lg-block">
          <div style="position:fixed">
            <v-card
              width="450"
              class="mx-auto mb-5"
            >
              <v-toolbar flat>
                <v-toolbar-title class="font-weight-light">GUIDES OF THE MONTH</v-toolbar-title>
              </v-toolbar>
              <v-divider class="my-0"></v-divider>
              <template v-if="!loaded">
                  <v-skeleton-loader
                    v-for="i in 3"
                    :key="i"
                    type="list-item-two-line"
                  ></v-skeleton-loader>
                </template>
              <v-list v-if="loaded">
                <v-list-item
                  v-for="(guide, index) in month"
                  :key="guide._id"
                >
                  <v-list-item-icon>
                    <v-icon
                      v-if="index == 0"
                      color="pink"
                    >
                      mdi-star
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ guide.name }}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar>
                    <v-img :src="guide.avatar"></v-img>
                  </v-list-item-avatar>
                </v-list-item>
              </v-list>
            </v-card>
            <v-card
              width="450"
              class="mx-auto"
            >
              <v-toolbar flat>
                <v-toolbar-title class="font-weight-light">TOURS</v-toolbar-title>
              </v-toolbar>
              <v-divider class="my-0"></v-divider>
              <v-list three-line max-height="400" style="overflow-y:scroll">
                <v-subheader>Latest</v-subheader>
                <template v-if="!loaded2">
                  <v-skeleton-loader
                    v-for="i in 8"
                    :key="i"
                    class="mb-3"
                    type="list-item-avatar-two-line, divider"
                  ></v-skeleton-loader>
                </template>
                <template v-if="loaded2">
                  <template v-for="(tour, index) in tours">
                    <v-divider v-if="index != 0" :key="index" inset></v-divider>
                    <v-list-item
                      :key="tour._id"
                    >
                      <v-list-item-avatar>
                        <v-img :src="tour.creator.avatar"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ tour.title }}</v-list-item-title>
                        <v-list-item-subtitle>
                          <span class="text--primary">{{ tour.creator.name }}</span> &mdash; {{ tour.description }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                </template>
              </v-list>
            </v-card>
          </div>
        </v-col>
        <v-col cols=12 sm=7 xl=6 class="px-lg-16">
          <Posts />
        </v-col>
        <v-col cols=12 sm=3 class="d-none d-xl-block">
          <div style="position:fixed">
            <v-skeleton-loader
              v-if="!loaded3"
              height="250"
              width="400"
              class="mx-auto mb-5"
              elevation="2"
              type="image"
            ></v-skeleton-loader>
            <v-carousel
              v-if="loaded3"
              class="mb-5"
              cycle
              height="250"
              width="400"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item
                v-for="(slide, i) in brief"
                :key="i"
                width="400"
                :src="slide.image"
              >
                <v-sheet
                  color="rgba(000, 000, 000, .3)"
                  height="100%"
                >
                  <v-row
                    class="fill-height text-center"
                    align="center"
                    justify="center"
                  >
                    <div>
                      <p class="mb-0">{{ slide.title }}</p>
                    </div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
            <v-card
              id="weatherapp" :class="typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''"
              class="mx-auto"
              width="400"
            >
             <div>
                <div class="main">
                  <div class="search-box">
                    <input 
                      type="text" 
                      class="search-bar" 
                      placeholder="Search..."
                      v-model="query"
                      @keypress="fetchWeather"
                    />
                  </div>

                  <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
                    <div class="location-box">
                      <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
                      <div class="date">{{ dateBuilder() }}</div>
                    </div>

                    <div class="weather-box">
                      <div class="temp primary--text">{{ Math.round(weather.main.temp) }}°c</div>
                      <div class="weather font-weight-light">{{ weather.weather[0].main }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Posts from '@/components/Posts.vue'

export default {
  name: 'Home',
  data () {
    return {
      loaded: false,
      loaded2: false,
      loaded3: false,
      fab: false,
      api_key: 'e3bd0846c0db6cab86894aad43373af8',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: 'cairo',
      weather: {},
      onboarding: 0,
    }
  },
  computed: {
    ...mapGetters(['postsProgress', 'tours', 'month', 'brief'])
  },
  components: {
    Posts
  },
  created () {
    let e = { key: 'Enter' }
    this.fetchWeather(e)
    this.getMonth().then(() => {
      this.loaded = true
    })
    this.getTours().then(() => {
      this.loaded2 = true
    })
    this.getBrief().then(() => {
      this.loaded3 = true
    })
  },
  methods: {
    ...mapActions(['getTours', 'getMonth', 'getPosts', 'getBrief']),
   topFunction () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    refresh () {
      this.topFunction()
      this.getPosts()
    },
    fetchWeather (e) {
      if (e.key == "Enter" && this.query != '') {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => {
            return res.json();
          }).then(this.setResults);
      }
    },
    setResults (results) {
      this.weather = results;
    },
    dateBuilder () {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
   
    },
    next () {
      this.onboarding = this.onboarding + 1 === this.length
        ? 0
        : this.onboarding + 1
    },
    prev () {
      this.onboarding = this.onboarding - 1 < 0
        ? this.length - 1
        : this.onboarding - 1
    },
  }
}
</script>
<style scoped>
#weatherapp {
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
}
.main {
  min-height: 500px;
  width: 100%;
  padding: 25px;
}
.search-box {
  width: 100%;
  margin-bottom: 30px;
}
.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  font-size: 20px;
  appearance: none;
  border:none;
  outline: none;
  background: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0px 16px 0px 16px;
  transition: 0.4s;
}
.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 16px 0px 16px 0px;
}
.location-box .location {
  font-size: 32px;
  font-weight: 500;
  text-align: center;
}
.location-box .date {
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box {
  text-align: center;
}
.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  /* color: #FFF; */
  font-size: 102px;
  font-weight: 900;
  background-color:rgba(200, 200, 200, 0.25);
  border-radius: 16px;
  margin: 30px 0px;
}
.weather-box .weather {
  /* color: #FFF; */
  font-size: 48px;
  font-weight: 700;
  font-style: italic;
}
</style>