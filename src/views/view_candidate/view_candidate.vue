<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold">View Candidates</h1>
          </v-card-title>
          <v-divider class="mx-4" horizontal></v-divider>

          <!-- <v-tabs v-model="tab" background-color="transparent" color="primary" class="pt-5" grow>
            <v-tab v-for="item in tabName" :key="item" v-text="item"></v-tab>
          </v-tabs> -->

          <v-tabs-items v-model="tab" >
            <v-tab-item>
              <v-card >
                <v-card-text>
                   <h1>Candidate List</h1>
                    
                      <v-data-table

                        :headers="headers"
                        :items="allCandidatesData"
                        
                        class="elevation-1"
                        
                      >
                       <template v-slot:[`item.action`]="{ item }">
                        <v-icon small @click="reviwPage(item.id)" color="green" v-if="item.submittedDate">mdi-plus</v-icon>
                      </template>
                    </v-data-table>
                </v-card-text>
                <v-card-actions class="justify-center">
               
                </v-card-actions>
                <v-snackbar v-model="snackbar">
                  {{viewMessage }}
                  <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                </v-snackbar>
              </v-card>
            </v-tab-item>

       
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>

<script lang="ts" src="./view_candidate.ts"></script>
