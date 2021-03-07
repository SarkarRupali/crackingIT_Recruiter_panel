<template>
  <v-container>
  <v-row>
      <v-col>
      <v-card>
        <v-card-container align="center">
        <v-row>
        <v-col cols="12" sm="6" md="6">
          <!-- <li  v-for='question in questiondata' :key="question.id"></li> -->
          <v-tabs right>
            <v-tab
              v-for="tab of setQuestin"
              :key="tab.id"
            >
            <button>{{tab.id}}</button>
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <p>Name : <span>{{name}}</span></p>
          <p>Role : <span>{{role}}</span></p>

        </v-col>
        </v-row>
        </v-card-container>
      </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card  v-for="ques of setQuestin"
              :key="ques.id">
          <v-card-title class="text-center justify-center py-6">
            <h6 class="font-weight-bold">Question {{ques.id}}: {{ques.question}}</h6>
          </v-card-title>
          <v-divider class="mx-4" horizontal></v-divider>

          <v-tabs-items v-model="tab" >
            <v-tab-item >
              <v-card class="pa-8" >
                <v-card-text>
  
                </v-card-text>
                <v-card-actions class="justify-center">
                 
                </v-card-actions>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
          <v-card-actions class="pa-5">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="7"
            >     
              <label>Comment</label>
              <v-textarea
              class="mt-1"
                auto-grow
                outlined
                rows="3"
                row-height="25"
                clearable
                clear-icon="mdi-close-circle"
                
              ></v-textarea>
            </v-col>
            <v-col cols="12"
            sm="3"
            md="3"
            >
              <label>Recomendation</label>

              <v-autocomplete
              class="mt-1"
                v-model="values"
                :items="items"
                outlined
                dense
                small-chips
                multiple
                deletable-chips
            
              ></v-autocomplete>
            </v-col>
            <v-col cols="12"
              sm="3"
              md="2"
              >
              <label>Rating</label>

              <v-autocomplete
              class="mt-1"
                v-model="values"
                :items="items"
                outlined
                dense
                small-chips
                deletable-chips
                
              ></v-autocomplete>
            </v-col>
            </v-row>
         </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>

<script lang="ts" src="./review_candidate.ts"></script>
