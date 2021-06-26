<template>
  <section style="height:100vh">
    <v-container style="height:100%;">
      <v-row align="center" style="height:100%;">
        <v-col cols="12" sm="8" offset-sm="2" lg="4" offset-lg="4">
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
          <v-sheet class="mx-xl-16">
            <v-card>
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
                SIGN
                <v-spacer></v-spacer>
                <v-btn text icon @click="reset">
                  <v-icon>mdi-refresh</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text>
                <v-form 
                  id="sign"
                  ref="form"
                  @submit.prevent="sign"
                  v-model="form.valid"
                >
                  <v-text-field 
                    v-model="form.name.value"
                    :rules="form.name.rules"
                    :counter="15"
                    required
                    label="Name"
                  >
                  </v-text-field>
                  <v-text-field 
                    v-model="form.email.value"
                    :rules="form.email.rules"
                    required
                    label="E-mail"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form.phone.value"
                    :rules="form.phone.rules"  
                    required
                    label="Phone"
                  >
                  </v-text-field>
                  <v-text-field
                    v-model="form.license.value"
                    :rules="form.license.rules"  
                    required
                    label="License"
                  >
                  </v-text-field>
                  <v-select
                    :items="langs"
                    v-model="form.language.value"
                    :rules="form.language.rules"  
                    label="Language"
                  ></v-select>
                  <v-text-field 
                    v-model="form.password.value"
                    :rules="form.password.rules"
                    :append-icon="form.password.show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="form.password.show ? 'text' : 'password'"
                    @click:append="form.password.show = !form.password.show"
                    required
                    label="Password"
                  >
                  </v-text-field>
                  <v-btn 
                    block 
                    color="success" 
                    class="mb-5 mt-1" 
                    type="submit"
                    form="sign"
                    :disabled="!form.valid"
                  >
                    SIGN
                  </v-btn>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn text router to="/login">
                  have account?
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn text router to="/signup">
                  signup as tourist
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'Signup',
  data() {
    return {
      snackbar: false,
      snackbarType: '',
      text: '',
      langs: ['English', 'Arabic', 'Chinese', 'French', 'German', 'Hindi', 'Irish', 'Italian', 'Japanese', 'Korean', 'Portuguese', 'Russian', 'Spanish'],
      form: {
        valid: false,
        name: {
          value: '',
          rules: [
            v => !!v || 'Name is required',
            v => (v && v.length >= 3) || 'Name must 3 characters or more',
            v => (v && v.length <= 15) || 'Name must be within 15 characters'
          ]
        },
        email: {
          value: '',
          rules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail mus be valid'
          ]
        },
        license: {
          value: '',
          rules: [
            v => !!v || 'License is required'
          ]
        },
        phone: {
          value: '',
          rules: [
            v => !!v || 'Phone is required'
          ]
        },
        language: {
          value: '',
          rules: [
            v => !!v || 'Language is required'
          ]
        },
        password: {
          value: '',
          show: false,
          rules: [
            v => !!v || 'Password is required',
            v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
            v => (v && v.length >= 7) || 'Passowrd must be at least 6 characters'
          ]
        }
      }
    }
  },
  methods: {
    ...mapActions ([
      'signupGuide'
    ]),
    reset () {
      this.$refs.form.reset()
    },
    sign () {
      if (this.form.valid) {
        const form = {
          name: this.form.name.value,
          email: this.form.email.value,
          phone: this.form.phone.value,
          language: this.form.language.value,
          license: this.form.license.value,
          password: this.form.password.value
        }
        this.signupGuide(form)
        .then(() => {
          this.$router.push("/login")
        })
        .catch(() => {
          this.activateSnackbar('error', 'Something went wrong please try again!')
        })
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