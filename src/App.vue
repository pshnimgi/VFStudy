<template>
  <v-app>
    <!-- app은 vue코드에서 가장 중요한 역할, 작업위치의 정의 -->
    <v-app-bar app color="primary" dark>
      <!-- 클릭하면 drawer의 값이 true와 false를 왕복 -->
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <!-- title부분을 site폴더 아래에 파일을 만들어 컴포넌트로 이용 -->
      <!-- title명을 주고받을 경우, 오브젝트내의 타이틀로 진행함을 선언 -->
      <site-title :title="site.title"></site-title>
      <v-spacer/>
      <!-- button link setting -->
      <!-- <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="save"><v-icon>mdi-check</v-icon></v-btn>
      <v-btn icon @click="read"><v-icon>mdi-read</v-icon></v-btn>
      <v-btn icon @click="readOnce"><v-icon>mdi-one-up</v-icon></v-btn> -->
    </v-app-bar>

    <!-- side menu area: for sentence, app으로 app영영에서 사용됨을 선언 -->
    <v-navigation-drawer app v-model="drawer" width="400">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-icon>mdi-checkbox-intermediate</v-icon> MENUs
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-icon>mdi-subdirectory-arrow-right</v-icon> subMENUs
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- 메뉴데이타는 site오브젝트이용 -->
      <site-menu :items="site.menu"></site-menu>
<!--
        <v-list
        denseVue와 Firebase로 나만의 사이트 만들기
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
    <v-main>
      <!-- 컨텐츠화면표시영역 -->
      <router-view></router-view>
    </v-main>

    <!-- dark mode footer & position is bottom absolutely -->
    <!-- <v-footer app color="primary" dark absolute>
      <v-spacer></v-spacer>
      <div>
        {{new Date().getFullYear()}}
      </div>
    </v-footer> -->
    <!-- site 오브젝트의 footer값 이용 -->
  <site-footer :footer="site.footer"></site-footer>
  </v-app>
</template>

<script>
// Call the component in Site folder and the name is SiteTitle and SiteFooter
import SiteTitle from '@/views/Site/Title' // Site폴더에 있는 title.vue파일을 SiteTitle이란 컴포넌트명으로 임포트
import SiteFooter from '@/views/Site/Footer'
import SiteMenu from '@/views/Site/Menu'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu }, // 임포트한 컴포넌트 파일들을 등록
  name: 'App',
  data () { // 제어할 변수 보관영역
    return {
      drawer: false,
      // items: [
      //   { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      //   { title: 'Dashboard', icon: 'mdi-view-dashboard' },
      //   { title: 'Photos', icon: 'mdi-image' },
      //   { title: 'About', icon: 'mdi-help-box' }
      // ],
      // right: null,
      // 사이트 접속 시, 최신 데이타 입수를 위해 데이타들을 site란 이름의 오브젝트로 모은다
      site: {
        // menu: [],
        menu: [
          {
            title: 'HOME',
            icon: 'mdi-checkbox-intermediate',
            subItems: [
              {
                title: 'Dashboard',
                icon: 'mdi-subdirectory-arrow-right',
                to: '/'
              },
              {
                title: 'About',
                icon: 'mdi-subdirectory-arrow-right',
                to: '/About'
              }
            ]
          },
          {
            title: 'CONTENTs',
            icon: 'mdi-checkbox-intermediate',
            subItems: [
              {
                title: 'Ready',
                icon: 'mdi-subdirectory-arrow-right',
                to: '/Ready'
              },
              {
                title: 'Etc',
                icon: 'mdi-subdirectory-arrow-right',
                to: '/*'
              }
            ]
          }
        ],
        title: '',
        footer: ''
      }
      // items: [],
      // title: 'My Title',
      // footer: 'My Footer'
    }
  },
  // 사이트 시작할 때
  created () { // 시작(백지상태)
    this.subscribe() // 시작과 동시에 화면에 표시할 데이타들을 구독함수 호출
  },
  mounted () { // DOM요소를 불러온 상태
    // console.log(this.$firebase)
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()
        if (!v) { // 데이타가 없으면 객체를 통째로 가져와서 저장
          this.$firebase.database().ref().child('site').set(this.site)
          return // 읽어서 세트하고 빠져나가 무한루프 방지
        }
        this.site = v // 있으면 그걸 사용
        console.log('sT: ' + v.items.title)
      },
      // 리스너는 일반적인 try-catch문이 적용되지 않으며 하기의 코드로 에러처리
      e => {
        console.log(e.message)
      })
    },
    // 리얼디비 세이브테스트
    save () {
      console.log('saveRTDB')
      // ref:root
      var today = new Date()
      this.$firebase.database().ref().child('SAVE').set({
        title: 'RTDB',
        text: 'Save: ' + today
      })
    },
    // keep listening
    read () {
      // sn: snapshot
      this.$firebase.database().ref().child('SAVE').on('value', (sn) => {
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
    // 일회성 리딩이므로 async 후 상수같은 것으로 받아두는 것이 좋음(async & await: 비동기 처리패턴)
    async readOnce () {
      // sn: snapshot
      const sn = await this.$firebase.database().ref().child('SAVE').once('value')
      console.log(sn.val())
    }
  }
}
</script>
