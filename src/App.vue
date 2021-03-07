
<template>
  <v-app>
    <NavBar :pageTitle="pageTitle" v-if="!['login'].includes($route.name)"  />
    <!-- <NavBar :pageTitle="pageTitle" /> -->
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>




<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import NavBar from "./components/navigation/nav.vue";

@Component({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  pageTitle= '';

  @Watch("$route")
  onRouteChanged(to: string, from: string) {
    //@ts-ignore
    this.pageTitle = to.meta.title;
    console.log("this.pageTitle",this.pageTitle);
  }

  // computed: {
  //     hide (){
  //     return this.$route.path === '/' ;
  //   }
  // }
}
</script>
