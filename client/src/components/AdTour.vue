<template>
  <v-card
    class="mx-auto my-4"
  > 
    <v-img
      height="250"
      class="grey lighten-2" 
      :src="tour.image"
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

    <v-card-title class="pt-15" style="position:relative">
      <v-btn
          color="primary"
          dark
          absolute
          top
          right
          fab
        >
          $ {{ tour.price }}
        </v-btn>
      <v-avatar size="50">
        <v-img
          :src="tour.creator.avatar"
          class="grey lighten-2"
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
      </v-avatar>
      <span class="ml-3 font-weight-light">
        {{ tour.creator.name }}
      </span>
      <v-spacer></v-spacer>
      <v-badge
        class="mr-2"
        :color="tour.users.length == 10 ? 'grey' : 'green'"
        overlap
        :content="tour.users.length || '0'"
      >
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-badge>
    </v-card-title>
    <v-card-text class="mt-4">
      <div class="text-uppercase d-inline">
        {{ tour.title }}
      </div>
      <div class="d-inline float-right">
        <v-icon class="mr-1">mdi-map-marker-outline</v-icon>•<span class="ml-2">{{ tour.location.location }}</span>
      </div>
      <v-divider class="mt-3 mb-4"></v-divider>
      <div class="">
        {{ tour.description }}
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text v-if="tour.users.length" class="py-0 text-center">
      <v-chip-group
        column
      >
        <v-chip
          color="green"
          outlined
          v-for="(user, index) in tour.users" :key="index"
        >
          <v-avatar left>
            <v-img 
              :src="user.avatar"
              class="grey lighten-2"
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
          </v-avatar>
          {{ user.name }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'Tour',
  props: ['tour']
}
</script>