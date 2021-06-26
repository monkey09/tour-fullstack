<template>
  <section style="height:100vh;overflow:hidden">
      <v-row align="center" style="height:100%;" no-gutters>
        <v-col cols="12" sm="6" lg="3" offset-sm="3" offset-lg="0">
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
            <v-card flat class="mx-3 darkBg">
              <v-card-title class="font-weight-light">
                <img 
                  v-if="$vuetify.theme.isDark"
                  src="@/assets/brand.svg"
                  width="50" class="mr-3"
                />
                <img 
                  v-if="!$vuetify.theme.isDark"  
                  src="@/assets/brand2.svg"
                  width="50" class="mr-3"
                />
                LOGIN
                <v-spacer></v-spacer>
                <v-btn text icon @click="reset">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submit" ref="form">
                  <v-text-field v-model="form.email" required label="E-mail">
                  </v-text-field>
                  <v-text-field 
                  v-model="form.password" 
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  required
                  label="Password">
                  </v-text-field>
                  <v-btn color="primary" block class="mb-5 mt-3" type="submit">
                    LOGIN
                  </v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text block router to="/signup">
                  not registered?
                </v-btn>
              </v-card-actions>
            </v-card>
            <p class="grey--text darkText--text text-center">
              Copyright © 2021 NULLissues Inc. All rights reserved
            </p>
        </v-col>
        <v-col class="d-none d-lg-inline" lg="9">
          <v-carousel height="100vh" :show-arrows="false" hide-delimiters>
            <v-carousel-item src="@/assets/main.jpg">
              <v-sheet
                color="rgba(0,0,0,0)"
                height="100%"
                tile
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <div class="display-3">
                    <p id="textStyle" class="font-weight-light"></p>
                  </div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>          
        </v-col>
      </v-row>
  </section>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      showPassword: false,
      snackbar: false,
      snackbarType: '',
      text: ''
    }
  },
  mounted () {
    const myEle = document.getElementById("textStyle")
    if (myEle) this.textApear(myEle, "WELCOME TO TOURIST'S SERVICES!")
  },
  methods: {
    ...mapActions([
      'loginUser',
      'loginGuide'
    ]),
    reset () {
      this.$refs.form.reset()
    },
    async submit () {
      try {
        if (this.form.email == '' || this.form.password == ''){
          this.activateSnackbar('error', 'Form must be filled!')
          return
        }
        const result = await this.loginUser(this.form)
        if (result) {
          this.loginGuide(result).then(() => {
            this.$emit('logedIn')
            this.$router.push('/')
          })
        } else {
          this.$emit('logedIn')
          this.$router.push('/') 
        }
      } catch (e) {
        this.activateSnackbar('error', 'Account is not found!')
      }
    },
    textApear (container, text) {
      for (let i = 0; i < text.length; i++){
        let mySpan = document.createElement("span")
        let myText = document.createTextNode(text[i])
        mySpan.appendChild(myText)
        container.appendChild(mySpan)
        mySpan.style.opacity = "0"
        mySpan.style.transition = "opacity .5s ease-in-out"
        setTimeout(() => {
          container.children[i].style.opacity = "1"
        }, i * 100)
        setTimeout (() => {
          setTimeout(() => {
            container.children[i].style.opacity = "0"
          }, i * 100)
        }, 1000)
        setTimeout(() => {
          container.children[i].style.opacity = "1"
        }, 5000)
      }
    },
    activateSnackbar (type, text) {
      this.text = text
      this.snackbarType = type
      this.snackbar = true
    }
  }
}
</script>