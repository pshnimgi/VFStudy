import Vue from 'vue'
// import * as firebase from 'firebase/app'
import { firebase } from '@firebase/app'
import 'firebase/auth'
import 'firebase/firebase-database'
import 'firebase/firestore'
// import vuetify from './vuetify'
import firebaseConfig from '../../firebaseConfig'

firebase.initializeApp(firebaseConfig)

Vue.prototype.$firebase = firebase
