<template>
  <section style="height:100vh;overflow:hidden">
      <v-row align="center" style="height:100%;" no-gutters>
        <v-col cols="12" sm="6" lg="3" class="mx-auto">
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
            </v-card>
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
  methods: {
    ...mapActions([
      'loginAdmin'
    ]),
    reset () {
      this.$refs.form.reset()
    },
    async submit () {
      if (this.form.email == '' || this.form.password == ''){
        this.activateSnackbar('error', 'Form must be filled!')
        return
      }
      this.loginAdmin(this.form).then(() => {
        this.$router.push('/dashboard') 
      }).catch(() => {
        this.activateSnackbar('error', 'Account is not found!')
      })
    },
    activateSnackbar (type, text) {
      this.text = text
      this.snackbarType = type
      this.snackbar = true
    }
  }
}
</script>