<template>
  <div>
    <v-app-bar app :collapse-on-scroll="true" class="elevation-0">
      <v-hover>
        <template v-slot="{ hover }">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            :elevation="hover ? 6 : 0"
            color="#989c9e"
          ></v-app-bar-nav-icon>
        </template>
      </v-hover>
      <v-toolbar-title title="title">{{pageTitle}}</v-toolbar-title>
      <div class="flex-grow-1"></div>

      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        origin="center center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-list-item-avatar color="grey" v-on="on" style="cursor: pointer">
            <v-img
              class="elevation-4"
              src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-img>
          </v-list-item-avatar>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-img
                  class="elevation-4"
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                  alt="John"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <!-- <v-list-item-title>John Leider</v-list-item-title> -->
                <v-list-item-title>Recruiter Panel Admin</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <!-- <v-btn color="primary" text @click="menu = false">Logout</v-btn> -->
            <v-btn color="primary" text @click="logOut">Logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" class="elevation-0">
      <v-card raised="true">
        <v-list color="#aab1b4">
          <v-list-item>
            <v-img src="../../assets/images/logon.png"></v-img>
          </v-list-item>
        </v-list>
      </v-card>

      <v-list dense shaped class="pt-4">
        <v-list-item link to="/dashboard">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list dense shaped class="pt-4">
        <v-list-item link to="/job-application">
          <v-list-item-icon>
            <v-icon>mdi-pencil-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Job Application</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list dense shaped class="pt-4">
        <v-list-item link to="/question-upload">
          <v-list-item-icon>
            <v-icon>mdi-application</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Question Upload</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list dense shaped class="pt-4">
        <v-list-item link to="/view-candidate">
          <v-list-item-icon>
            <v-icon>mdi-application</v-icon>
          </v-list-item-icon>

          <v-list-item-title>View/Assess Candidates</v-list-item-title>
        </v-list-item>
      </v-list>


      
    </v-navigation-drawer>
  </div>
</template>

<!--TypeScript-->
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Nav extends Vue {
  @Prop(String)
  public pageTitle!: string;

  data() {
    return {
      drawer: null,    
      title: ""
    };
  }

  get adminUser() {
    return localStorage.getItem("admin_name") !== null
      ? localStorage.getItem("admin_name")
      : "";
  }

  logOut() {
    const jwt = localStorage.getItem("jwt");
    const is_admin = localStorage.getItem("is_admin");
    const admin_name = localStorage.getItem("admin_name");
    const jwt_peek = localStorage.getItem("jwt_peek");
    if (jwt) {
      localStorage.removeItem("jwt");
    }

    if (jwt_peek) {
      localStorage.removeItem("jwt_peek");
    }
    if (is_admin) {
      localStorage.removeItem("is_admin");
    }
    if (admin_name) {
      localStorage.removeItem("admin_name");
    }
    this.$router.push("/");
  }
}
</script>
<style lang="scss">
.theme--light.v-card {
  border-radius: 0;
}
</style>
