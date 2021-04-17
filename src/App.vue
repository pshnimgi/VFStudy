<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <!-- <v-toolbar-title>Vue&Firebase Study</v-toolbar-title> -->
      <site-title :title="title"></site-title>
      <v-spacer></v-spacer>
      <!-- button link setting -->
      <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- side menu area -->
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
  <site-footer :footer="footer"></site-footer>
  </v-app>
</template>

<script>
// Call the component in Site folder and the name is SiteTitle and SiteFooter
import SiteTitle from '@/views/Site/Title'
import SiteFooter from '@/views/Site/Footer'

export default {
  components: { SiteTitle, SiteFooter },
  name: 'App',
  data () {
    return {
      drawer: false,
      items: [],
      title: 'My Title',
      footer: 'My Footer'
    }
  }
}
</script>
