<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-toolbar
      color="teal"
      dark
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Topics</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn> -->
    </v-toolbar>

    <v-list>
      <!-- <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      > -->
      <!-- Overlapping avoidance & define icon -->
      <v-list-group
        v-for="(item, i) in items"
        :key="i"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >

        <!-- Display the title and subtitle using for statement -->
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.subItems"
          :key="subItem.title"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      items:
      [
        {
          title: 'HOME',
          active: true,
          icon: 'mdi-home',
          subItems:
          [
            {
              title: 'Dashboard',
              to: '/'
            },
            {
              title: 'About',
              to: '/about'
            }
          ]
        },
        {
          title: 'ABOUT',
          // active: true,
          icon: 'mdi-information-outline',
          to: '/About'
        }
      ]
    }
  }
}
</script>
