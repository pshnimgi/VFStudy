<template>
  <div
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
          <!-- 기존에 메뉴가 있는 경우 수정기능(어느 위치의 메뉴인지 알기 위해 index i를 걸어준다)-->
          <v-list-item-action>
            <v-btn icon @click="openDialogItem(i)"><v-icon>mdi-pencil-outline</v-icon></v-btn>
          </v-list-item-action>
        </template>

        <!-- 데이타베이스의 필드값을 내부반복처리 -->
        <v-list-item
          v-for="(subItem ,j) in item.subItems"
          :key="j"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- 새롭게 생성한 서브메뉴가 들어갈 자리 -->
        <!-- 서브아이템 처리함수는 두 개의 인덱스(부모와 본인)가 필요함 -->
        <v-list-item @click="openDialogSubItem()">
          <v-list-item-icon>
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Add Sub-Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <!-- 새롭게 생성한 메뉴가 들어갈 자리 -->
      <v-list-item @click="openDialogItem(-1)">
        <v-list-item-icon>
          <v-icon>mdi-plus-thick</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Add Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- 추가하기하면 보일 다이얼로그 -->
    <v-dialog v-model= "dialogItem" max-width="350">
      <v-card>
        <v-card-title>
          Modify
          <v-spacer></v-spacer>
          <v-btn icon @click="saveItem()"><v-icon> mdi-content-save</v-icon></v-btn>
          <v-btn color="red" icon @click="dialogItem=false"><v-icon>mdi-close-box</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formItem.title" @keypress.enter="saveItem()"></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {
      // 메뉴와 서브메뉴 정보를 입력할 다이얼로그
      // items: [],
      // items: [
      //   {
      //     title: 'HOME',
      //     icon: 'mdi-checkbox-intermediate',
      //     subItems: [
      //       {
      //         title: 'Dashboard',
      //         icon: 'mdi-subdirectory-arrow-right',
      //         to: '/'
      //       },
      //       {
      //         title: 'About',
      //         icon: 'mdi-subdirectory-arrow-right',
      //         to: '/About'
      //       }
      //     ]
      //   },
      //   {
      //     title: 'CONTENTs',
      //     icon: 'mdi-checkbox-intermediate',
      //     subItems: [
      //       {
      //         title: 'Ready',
      //         icon: 'mdi-subdirectory-arrow-right',
      //         to: '/Ready'
      //       },
      //       {
      //         title: 'Etc',
      //         icon: 'mdi-subdirectory-arrow-right',
      //         to: '/*'
      //       }
      //     ]
      //   }
      // ],
      dialogItem: false,
      dialogSubItem: false,
      formItem: {
        icon: '',
        title: ''
      },
      selectedItemIndex: -1 // 제목이 없는 최초설정값-1을 선택된 인덱스값으로 할당
    }
  },
  methods: {
    openDialogItem (index) {
      this.selectedItemIndex = index
      this.dialogItem = true
      console.log(index)

      if (index < 0) {
        this.formItem.icon = 'mdi-checkbox-intermediate'
        this.formItem.title = '' // 최초설정
      } else {
        this.formItem.title = this.items[index].title // 기존 제목표시
        this.formItem.icon = this.items[index].icon
      }
    },
    saveItem () {
      if (this.selectedItemIndex < 0) {
        this.items.push(this.formItem) // 화면표시만 저장은 아직
      } else {
        this.items[this.selectedItemIndex].icon = this.formItem.icon
        this.items[this.selectedItemIndex].title = this.formItem.title
      }
      this.save()
    },
    async save () { // 메뉴정보를 디비저장처리
      try {
        // await this.$firebase.database().ref().child('site').set({ menu: this.items })
        await this.$firebase.database().ref().child('site').child('menu').set(this.items) // 생성된 내용을 통째로 저장
      // } catch (e) {
      //   console.log(e.message)
      } finally {
        // Close dialog after saving
        this.dialogItem = false // 작업 후 다이얼로그 끄기
      }
    },
    openDialogSubItem (index, subIndex) {
      this.selectedItemIndex = index
      this.selectedSubItemIndex = subIndex
      if (subIndex < 0) { // 기존 입력값이 없는 서브아이템 생성
        this.formSubItem.title = ''
        this.formSubItem.icon = ''
      } else {
        this.formSubItem.title = this.items[index].subItems[subIndex].title
        this.formSubItem.icon = this.items[index].subItems[subIndex].icon
      }
      this.dialogSubItem = true
    }
  }
}
</script>
