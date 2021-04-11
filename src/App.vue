<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon to="/"></v-app-bar-nav-icon>
      <v-toolbar-title>Vue&Firebase Study</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- button link setting -->
      <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    
    <!-- The area in contents: use router -->
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>

</template>

<script>

export default {
  name: 'App'

}
</script>
