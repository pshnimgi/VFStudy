// Only one tag in template tag(콤포넌트파일)
<template>
    <div>
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
              <v-text-field v-model="text" outlined @keypress.enter="save" hide-details></v-text-field>
            </v-card-text>
          </v-card>
        </v-dialog>

    </div>
</template>

<script>
export default {
  props: ['title'], // App.vue에서 props로 title값을 받아와서 this.title이 된다
  data () {
    return {
      dialog: false,
      text: this.title // 초기 타이틀값은 app.vue에서 props로 넘어온 값을 뿌려준다
    }
  },
  methods: {
    openDialog () {
      this.dialog = true
      this.text = this.title // 다이얼로그를 오픈하면 현재의 타이틀을 뿌려줌
    },
    // part change -> .update
    // code for debugging
    async save () {
      try {
        // 타이틀의 제목만 업데이트 처리
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
