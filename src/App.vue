<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>Vue&Firebase Study</v-toolbar-title> -->
      <site-title :title="site.title"></site-title>
      <v-spacer></v-spacer>
      <!-- button link setting -->
      <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="save"><v-icon>mdi-check</v-icon></v-btn>
      <v-btn icon @click="read"><v-icon>mdi-read</v-icon></v-btn>
      <v-btn icon @click="readOnce"><v-icon>mdi-one-up</v-icon></v-btn>
    </v-app-bar>

    <!-- side menu area: for sentence -->
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            SIDE MENUs
          </v-list-item-title>
          <v-list-item-subtitle>
            subMENUs
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <site-menu :items="site.menu"></site-menu>
<!--
        <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
-->
    </v-navigation-drawer>

    <!-- The area in contents: use router -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- dark mode footer & position is bottom absolutely -->
    <!-- <v-footer app color="primary" dark absolute>
      <v-spacer></v-spacer>
      <div>
        {{new Date().getFullYear()}}
      </div>
    </v-footer> -->
  <site-footer :footer="site.footer"></site-footer>
  </v-app>
</template>

<script>
// Call the component in Site folder and the name is SiteTitle and SiteFooter
import SiteTitle from '@/views/Site/Title'
import SiteFooter from '@/views/Site/Footer'
import SiteMenu from '@/views/Site/Menu'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
  name: 'App',
  data () {
    return {
      drawer: false,
      // items: [
      //   { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      //   { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      //   { title: 'Photos', icon: 'mdi-image' },
      //   { title: 'About', icon: 'mdi-help-box' }
      // ],
      // right: null,
      // for managing of site's titles, make values to one object
      site: {
        menu: [],
        title: 'My Title',
        footer: 'My Footer'

      }
      // items: [],
      // title: 'My Title',
      // footer: 'My Footer'
    }
  },
  created () {
    this.subscribe()
  },
  mounted () {
    console.log(this.$firebase)
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
        }
        this.site = v
      },
      // try-catch sentence for listener
      e => {
        console.log(e.message)
      })
    },
    save () {
      console.log('save@@@')
      // ref:root
      this.$firebase.database().ref().child('abcd').set({
        title: 'abcd',
        text: 'save20210422'
      })
    },
    // keep listening
    read () {
      // sn: snapshot
      this.$firebase.database().ref().child('abcd').on('value', (sn) => {
        console.log(sn)
        console.log(sn.val())
      })
    },
    // listen once
    // readOnce () {
    //   // sn: snapshot
    //   this.$firebase.database().ref().child('abcd').once('value', (sn) => {
    //     console.log(sn)
    //     console.log(sn.val())
    //   })
    // },
    // It's a good idea to treat it as a variable because it's a one
    async readOnce () {
      // sn: snapshot
      const sn = await this.$firebase.database().ref().child('abcd').once('value')
      console.log(sn.val())
    }

  }
}
</script>
