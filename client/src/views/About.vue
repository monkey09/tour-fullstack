<template>
  <section>
    <v-container>
      <h1 class="font-weight-light darkText--text uk-heading-bullet">ABOUT</h1>
      <v-row class="pt-16">
        <v-col cols="12" md="6" xl="4" offset-xl="2">
          <v-row align="center">
            <v-item-group
              v-model="window"
              class="shrink mr-1"
              mandatory
            >
              <v-item
                v-for="n in length"
                :key="n"
                v-slot="{ active, toggle }"
              >
                <div>
                  <v-btn
                    :input-value="active"
                    icon
                    @click="toggle"
                  >
                    <v-icon>mdi-record</v-icon>
                  </v-btn>
                </div>
              </v-item>
            </v-item-group>

            <v-col>
              <v-window
                v-model="window"
                class="elevation-1"
                vertical
              >
                <v-window-item
                  v-for="n in length"
                  :key="n"
                >
                  <v-card flat>
                    <v-card-text>
                      <v-row
                        class="mb-4"
                        align="center"
                      >
                        <strong class="title primary--text">Title {{ n }}</strong>
                        <v-spacer></v-spacer>
                      </v-row>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" xl="3">
          <v-img 
            class="grey lighten-2" 
            src="@/assets/about.jpg"
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
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
export default {
  name: 'About',
  data: () => ({
    length: 3,
    window: 0,
  }),
}
</script>
