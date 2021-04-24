<template>
    <!-- dark mode footer & position is bottom absolutely -->
    <v-footer app color="primary" dark absolute :footer="footer">
      <v-spacer></v-spacer>
      <div>
        {{new Date().getFullYear() + ' ' + footer }}
      </div>
      <v-btn icon color="yellow" @click="openDialog"><v-icon>mdi-file-edit</v-icon></v-btn>
      <v-dialog v-model="dialog" max-width="300px">
        <v-card>
          <v-card-title>
            Edit Footer
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="text" outlined label="new Footer" @keypress.enter="save" hide-details></v-text-field>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-footer>
</template>

<script>
export default {
  props: ['footer'],
  data () {
    return {
      dialog: false,
      text: this.footer
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    save () {
      this.$firebase.database().ref().child('site').update({ footer: this.text })
      this.dialog = false
    }
  }
}
</script>
