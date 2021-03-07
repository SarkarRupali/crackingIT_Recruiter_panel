<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold">Question Upload</h1>
          </v-card-title>
          <v-divider class="mx-4" horizontal></v-divider>

          <v-tabs v-model="tab" background-color="transparent" color="primary" class="pt-5" grow>
            <v-tab v-for="item in tabName" :key="item" v-text="item"></v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" >
            <v-tab-item>
              <v-card class="pa-8" >
                <v-card-text>
                  <v-form
                    ref="singleUploadForm"
                    v-model="valid"
                    v-if="shwData == true"
                  >
                  <div>
                    
                    <!-- <v-radio-group v-model="questionType" :mandatory="false" row>
                      <template v-slot:label>
                          <div>Select Question Type</div>
                      </template>
                        <v-radio label="MCQ" :value="firstOpt" name="qType" checked></v-radio>
                        <v-radio label="MSQ" :value="secondOpt" name="qType"></v-radio>
                        <v-radio label="NAT" :value="thirdOpt" name="qType"></v-radio>
                    </v-radio-group>                       -->
                    <!-- <v-text-field
                      label="Question Type"
                      required
                      :rules="quesionTypeRequired"
                      v-model="quesionType"
                    ></v-text-field> -->

                    <v-select
                      :items="quesType"
                      label="Question Type"
                      dense
                      :rules="quesionTypeRequired"
                      v-model="id"
                      item-text="type"
                      item-value="id"
                      required
                    ></v-select>

                  </div>

                    <!-- for checking question type radio -->
                    <div>
                      <h1 class="font-weight-bold">Question</h1>
                      <v-textarea
                        label="Type question here"
                        v-model="question"
                        required
                        ref="ref_text"
                        :rules="questionRequired"
                      ></v-textarea>
                      <!-- <vue-mathjax :formula="question" :safe="false"></vue-mathjax> -->
                      <!-- <div v-html="question" style="white-space: pre-wrap;"></div> -->
                    </div>
                
                    <!-- <h1 class="font-weight-bold">Options</h1>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Option 1"
                          v-model="answer1"
                        ></v-text-field>
                          <v-text-field
                          label="Option 2"
                          v-model="answer2"
                        ></v-text-field>
                          <v-text-field
                          label="Option 3"
                          v-model="answer3"
                        ></v-text-field>
                          <v-text-field
                          label="Option 4"
                          v-model="answer4"
                        ></v-text-field>
                      </v-col>
                    </v-row> -->
                    <div>
                      <h1 class="font-weight-bold">Answer</h1>
                      <v-text-field
                        label="Answer"
                        v-model="answer"
                      ></v-text-field>
                    </div>
                     <v-text-field
                        label="Preparation Time in min"
                        v-model="preparationTime"
                      ></v-text-field>
                      <v-text-field
                        label="No of time candidate can retake"
                        v-model="takes"
                      ></v-text-field>
                       <v-text-field
                        label="Response Time in min"
                        v-model="responseTime"
                      ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="primary"
                    :disabled="!valid"
                    v-on:click="uploadQuestion"
                  >Add</v-btn>
                </v-card-actions>
                <v-snackbar v-model="snackbar">
                  {{questionMessage }}
                  <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                </v-snackbar>

                <div v-if="saveQuestion.length!=0">
                  <h1>Question List</h1>
                    <div class="text-center pt-4" >
                      <v-data-table
                        v-model="selectedQuestion"
                        :headers="headers"
                        :items="saveQuestion"
                        item-key="id"
                        show-select
                        class="elevation-1"
                        hide-default-footer
                      >
                    </v-data-table>
                    <v-card-actions class="justify-center">
                      <v-btn
                        color="primary"
                        v-on:click="saveAllQuestion"
                      >Upload</v-btn>
                  </v-card-actions>
                  </div>

                  <v-dialog v-model="dialog" max-width="500px">
                    <v-card :loading="quesLoading">
                      <v-card-title>
                        <span class="headline">Question Set Name</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-form ref="qSetForm" v-model="setQNameForm">
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="setName"
                                  label="Enter Question Set Name"
                                  :rules="setNameRequired"
                                  counter="100"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="saveQName" :disabled="!qSetForm">Save</v-btn>
                      </v-card-actions>
                      <v-snackbar v-model="snackbar">
                        {{questionMessage }}
                        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                      </v-snackbar>
                    </v-card>
                  </v-dialog>

                </div>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <h1>Candidate List</h1>
              
              <v-data-table
                v-model="selectedCandidate"
                :headers="headersC"
                :items="candidateData"
                item-key="id"
                show-select
                class="elevation-1"
                hide-default-footer
              >
              </v-data-table>
                <v-card-actions class="justify-center">
                  <v-btn
                    color="primary"
                    v-on:click="inviteCandidates"
                  >Invite Candidate</v-btn>
                </v-card-actions>

                 <v-snackbar v-model="snackbar">
                        {{questionMessage }}
                        <v-btn color="pink" text @click="snackbar = false">Close</v-btn>
                      </v-snackbar>

            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>

<script lang="ts" src="./question-upload.ts"></script>
