import { mapGetters } from 'vuex'

export const authUser = {
  ...mapGetters({
    loggedIn: 'auth/loggedIn',
    user: 'auth/user',
  })
}