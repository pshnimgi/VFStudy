import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

// import App from '@/App.vue'

// Vue.use(VuetifyToast)

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})

Vue.use(VuetifyToast, {
  x: 'right', // default
  y: 'bottom', // default
  color: 'info', // default
  icon: 'mdi-alert',
  iconColor: '', // default
  classes: [
    'body-2'
  ],
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  closeText: '', // default
  closeIcon: 'close', // default
  closeColor: '', // default
  slot: [], // default
  shorts: {
    custom: {
      color: 'purple'
    }
  },
  property: '$toast' // default
})

export default new Vuetify({
  // theme: {
  //   themes: {
  //     light: {
  //       primary: '#ee44aa',
  //       secondary: '#424242',
  //       accent: '#82B1FF',
  //       error: '#FF5252',
  //       info: '#2196F3',
  //       success: '#4CAF50',
  //       warning: '#FFC107'
  //     }
  //   }
  // }
})
