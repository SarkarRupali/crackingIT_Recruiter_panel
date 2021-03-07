<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold">Job Application</h1>
      </v-card-title>
      <v-divider class="mx-4" inset horizontal></v-divider>

      <!-- <v-tabs v-model="tab" background-color="transparent" color="primary" class="pt-5" grow>
        <v-tab v-for="item in items" :key="item" v-text="item"></v-tab>
      </v-tabs> -->

      <v-tabs-items v-model="tab">
        <!--Add Exam Tab-->
        <v-tab-item :loading="jobLoading">
          <v-card flat color="basil" >
            <v-form ref="jobCreateForm" v-model="valid">
              <v-row>
                <v-col sm="8" md="8" lg="8" offset-sm="2" offset-lg="2">
                  <v-card-text>
                    <v-text-field
                      label="Job Title"
                      v-model="jobName"
                      :rules="jobNameRequired"
                      counter="100"
                      required
                    ></v-text-field>

                     <v-select
                      :items="filteredLocation"
                      label="Job Location"
                      dense
                      :rules="locationRequired"
                      v-model="locationId"
                      item-text="city"
                      item-value="id"
                      required
                    ></v-select>

                    <v-textarea
                      label="Job Description"
                      v-model="jobDescription"
                      :rules="jobDescriptionRequired"
                      required
                    ></v-textarea>

                    <div>
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="startdate"
                          label="Job Creation Date"
                          prepend-inner-icon="mdi-calendar-check"
                          :rules="dateRequired"
                          v-bind="attrs"
                          v-on="on"
                         ></v-text-field>
                      </template>
                      <v-date-picker v-model='startdate' :min="myDate" is-inline>
                        <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.dialog.save(startdate)">OK</v-btn>
                      </v-date-picker>
                      </v-dialog>
                    </div> 
                    
                    <div>
                      <v-dialog
                        ref="expdialog"
                        v-model="modal1"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                      >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="submissionDeadline"
                          label="Submission Date"
                          prepend-inner-icon="mdi-calendar-check"
                          :rules="submissionRequired"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model='submissionDeadline' :min="myDate" is-inline>
                        <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal1= false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.expdialog.save(submissionDeadline)">OK</v-btn>
                      </v-date-picker>
                      </v-dialog>
                    </div> 
                    
                      <h3>Rating</h3> 
                      <v-spacer></v-spacer>
                      <!-- <span class="grey--text text--lighten-2 caption mr-2">({{ rating }})</span> -->
                      <v-rating
                        v-model="rating"
                        background-color="grey"
                        dense
                        half-increments
                        hover
                        size="38"
                      ></v-rating>
                  </v-card-text> 
                  <v-card-actions class="justify-center">
                    <v-btn color="primary" v-on:click="saveRecruitData" :disabled="!valid">Save</v-btn>
                  </v-card-actions>
                  <v-snackbar v-model="snackbar">
                    {{ showMessage }}
                    <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                  </v-snackbar>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-tab-item>

      
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<style scoped>
.exam-id-hidden {
  display: none;
}
</style>

<script lang="ts" src="./job-application.ts"></script>
