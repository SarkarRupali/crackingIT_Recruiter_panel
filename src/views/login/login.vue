<template>
  <v-app id="dental-login">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12" :loading="adminLoginLoading">
            <v-toolbar color="#989c9e" dark flat>
              <v-toolbar-title>Recruiter Panel Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="adminLoginForm" v-model="adminValid">
                <v-text-field
                  label="Email"
                  name="email"
                  v-model="adminEmail"
                  type="text"
                  :rules="emailRequired"
                  autocomplete="off" 
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  v-model="adminPassword"
                  type="password"
                  :rules="passwordRequired"
                />

                <v-snackbar v-model="loginsnackbar">
                  {{ loginErrorMessage }}
                  <v-btn color="pink" text @click="loginsnackbar = false">Close</v-btn>
                </v-snackbar>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" :disabled="!adminValid" v-on:click="loginAsAdmin">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts" src="./login.ts">
</script>

<style scoped>
</style>


