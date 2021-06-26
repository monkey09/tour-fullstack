<template>
  <div>
    <UserProfile v-if="authUser" />
    <GuideProfile v-if="authGuide" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import UserProfile from '@/components/UserProfile'
import GuideProfile from '@/components/GuideProfile'
export default {
  name: 'Profile',
  computed: {
    ...mapGetters([
      'authUser',
      'authGuide'
    ])
  },
  components: {
    UserProfile,
    GuideProfile
  }
}
</script>