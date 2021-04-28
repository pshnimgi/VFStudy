// Only one tag in template tag
<template>
    <toolbar-title>
        <!-- Page Title ######  -->
        {{ title }}
        <!-- Button for edit title -->
        <v-btn icon @click="openDialog"><v-icon>mdi-pencil</v-icon></v-btn>
        <v-dialog v-model="dialog" max-width="300px">
          <v-card>
            <v-card-title>
              Edit Title
              <v-spacer></v-spacer>
              <!-- <button @click="dialog=false"><v-icon>mdi-close-circle</v-icon></button> -->
              <v-btn icon @click="save"><v-icon>mdi-update</v-icon></v-btn>
              <v-btn icon @click="dialog=false"><v-icon>mdi-close-circle</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
              <!-- Press Enter -> start saving -->
              <v-text-field v-model="text" outlined label="newTitle" @keypress.enter="save" hide-details></v-text-field>
            </v-card-text>
          </v-card>
        </v-dialog>

    </toolbar-title>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      dialog: false,
      text: this.title
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    // part change -> .update
    // code for debugging
    async save () {
      try {
        await this.$firebase.database().ref().child('site').update({ title: this.text })
      // } catch (e) {
      //   console.log(e.message)
      } finally {
        // Close dialog after saving
        this.dialog = false
      }
    }
  }
}
</script>
