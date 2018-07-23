import Vue from "vue";
import Vuex from "vuex";
import firebase, {
  firestore
} from "firebase";
import {
  toDateString
} from "@/utils";

Vue.use(Vuex);

var config = {
  aapiKey: "AIzaSyBkYlXm2z2MDvJJ60cwiXNk3hbayuRdGFE",
  authDomain: "dicemap-ced28.firebaseapp.com",
  databaseURL: "https://dicemap-ced28.firebaseio.com",
  projectId: "dicemap-ced28",
  storageBucket: "dicemap-ced28.appspot.com",
  messagingSenderId: "667146309486"
};
var db;

(function () {
  try {
    firebase.initializeApp(config);
  } catch (error) {
    if (error.code !== "app/duplicate-app") {
      console.log(error);
    }
  } finally {
    db = firebase.firestore();
  }
})();

export default new Vuex.Store({
  state: {
    justSaved: false,
    maps: [],
    map: {},
    tabs: ["Maps", "Tools", "Tags"],
    tab: "Maps",
    showNav: false,
    search: "",
    tags: []
  },
  getters: {
    showTab: (state) => (tab) => state.tab === tab
  },
  mutations: {
    changeTab: (state, tab) => state.tab = tab
  },
  actions: {
    fetchLast5Maps: (context) => {
      db.collection("maps").orderBy("editDate", "desc").limit(5).onSnapshot(entries => {
        context.state.maps = entries.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
            editDate: toDateString(doc.data().editDate)
          }
        })
      })
    },
    fetchTags: (context) => {
      db.collection("tags").orderBy("name").onSnapshot(entries => {
        context.state.tags = entries.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
      })
    },
    editMap: (context, map) => {
      context.state.map = map;
      context.commit("changeTab", "Tools")
    },
    newMap: (context) => {
      var map = {
        name: "New Map",
        editDate: new Date().getTime(),
        points: []
      }
      db.collection("maps").add(map).then(doc => context.dispatch('editMap', Object.assign(map, {
        id: doc.id
      })))
    },
    newTag: (context) => {
      var tag = {
        name: "New Tag"
      }
      console.log(tag)
      db.collection("tags").add(tag).then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    },
    saveMap: (context) => {
      db
        .collection("maps").doc(context.state.map.id)
        .set({
          name: context.state.map.name,
          editDate: new Date().getTime(),
          points: context.state.map.points
        })
        .then(function () {
          console.log("Document successfully written!");

          context.state.justSaved = true
          setTimeout(() => context.state.justSaved = false, 1000)
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    },
    saveTag: (context, tag) => {
      db.collection("tags").doc(tag.id).set({
        name: tag.name
      })
    },
    deleteMap(context, id) {
      db.collection("maps").doc(id).delete()
    },
    deleteTag(context, tag) {
      db.collection("tags").doc(tag.id).delete()
    },
    search(context, event) {
      //console.log(event)
      if (context.state.search.length >= 3)
        console.log("SIKERLER")
    }
  }
})