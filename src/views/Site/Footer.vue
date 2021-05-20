<template>
    <!-- dark mode footer & position is bottom fixed/absolutely -->
    <v-footer app color="primary" dark fixed :footer="footer">
      <v-spacer></v-spacer>
      <div>
        {{new Date().getFullYear() + ' ' + footer }}
      </div>
      <v-btn icon color="yellow" @click="openDialog"><v-icon>mdi-file-edit</v-icon></v-btn>
      <v-dialog v-model="dialog" max-width="300px">
        <v-card>
          <v-card-title>
            Edit Footer
            <v-spacer></v-spacer>
            <v-btn icon color="success" @click="save"><v-icon>mdi-pencil</v-icon></v-btn>
            <v-btn icon color="blue" @click="dialog=false"><v-icon>mdi-exit-run</v-icon></v-btn>
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
      this.text = this.footer
    },
    async save () {
      try {
        this.$firebase.database().ref().child('site').update({ footer: this.text })
      // } catch (e) {
      //   console.log(e.message)
      } finally { // toast-snackbar로 에러처리하므로 catch문은 불필요
        this.dialog = false
      }
    }
  }
}
</script>
