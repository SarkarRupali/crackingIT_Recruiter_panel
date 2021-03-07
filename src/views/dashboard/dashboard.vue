<template>
  <div class="team">
    <h1 class="subheading grey--text text-center">Dashboard</h1>
    <v-container>
      <v-layout row wrap class="pa-2">
        <v-flex sm12 xs12 md8 lg8 class="mb-2">
          <!-- *********** Three Card *************-->

          <v-row >
            <v-col  cols="12" md="4" sm="4"  class="small" v-for="card in cards"
            :key="card.title">
              <v-card light outlined tile >
                <v-card-title>
                  <span class="title font-weight-light" v-text="card.title"></span>
                </v-card-title>

                <v-layout row wrap>
                  <v-flex lg8 sm8>
                    <v-card-text class="headline font-weight-bold" align="center" v-text="card.value"></v-card-text>
                  </v-flex>
                  
                  <v-flex lg4 sm4>
                    <v-icon large right >
                      {{card.icon}}
                    </v-icon>
                  </v-flex>
                </v-layout>
                <div><v-divider></v-divider></div>
                <v-card-actions>
                  <v-list-item class="grow">
                    <v-row align="center" justify="start">
                      <v-badge inline left tile color="green" content="-2.4%"></v-badge>
                      <span class="subheading "><small>From previous period</small></span>
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
   
          <!-- ******** Exam Score Analytics **************-->
          <v-row>
            <v-col>
              <v-card class="pa-3 ml-3 mr-3">
                <v-row>
                  <v-col col-4>
                    <v-title>Exam Score Analytics </v-title>
                  </v-col>
                  <v-col col-8>
                    <v-tabs right>
                      <!-- <v-tab>Today</v-tab> -->
                      <!-- <v-tab>Weekly</v-tab> -->
                      <v-tab>Monthly</v-tab>
                    </v-tabs>
                  </v-col>
                </v-row>
                <v-container>
                  <ChartBar/>
                </v-container> 
              </v-card>
            </v-col>
          </v-row>
        </v-flex>
     
        <!-- ****** Subject Analytics *****-->
        <v-flex sm12 xs12 md4 lg4 class="mb-2">
          <v-row>
            <v-col>
              <v-card class="pa-3 ml-3 mr-3 mb-3 chart">
                <v-title>Subject Analytics </v-title>
                <v-container>
                  <ChartDoughnut/>
                </v-container> 
              </v-card>
            </v-col>
          </v-row>
          
          <!-- ************* Score Reports ************** -->
          <v-card class="pa-3 ml-3 mr-3">
            <v-title>Score Reports </v-title>
            <v-list-item >  
              <v-list-item-content>
                <div class="text-center">
                  <v-row>
                    <v-col md="6">
                      <v-progress-circular
                        :rotate="360"
                        :size="80"
                        :width="12"
                        :value="value1"
                        color="primary"
                      >{{value1}}%
                      </v-progress-circular>
                    </v-col>
                    <v-col md="6">
                      <v-progress-circular
                        :rotate="360"
                        :size="80"
                        :width="12"
                        :value="value2"
                        color="teal"
                      >
                        {{value2}}%
                      </v-progress-circular>
                    </v-col>
                  </v-row>
                </div>
                <div><v-divider></v-divider></div><br>
                <div class="text-center">
                  <v-row>
                    <v-col>
                      <h5>Weekly Score</h5><br>
                      <p class="text-muted">{{value1}}%</p>
                    </v-col>
                    <v-col>
                      <h5>Absolute Score</h5><br>
                      <p class="text-muted">{{value2}}%</p> 
                    </v-col>
                  </v-row>
                </div>
              </v-list-item-content> 
            </v-list-item>
          </v-card>
        </v-flex>

        <v-flex sm12 xs12 md6 lg6 class="mb-2">
          <v-card class="pa-3 ml-3 mr-3">
            <v-title>Subjects</v-title>
            <div class="text-center">
              <v-title>Average Scores</v-title>
              <h3>83 %</h3>
              <small style="color:green;">- 2.2%</small>
            </div>
            <div class="text-center pt-3" >
              <SubjectTable/>
            </div>
          </v-card>
        </v-flex>
        <v-flex sm12 xs12 md6 lg6 class="mb-2">
          <div>
            <ActivityFeed/>
          </div>
        </v-flex>

        <!-- table -->
        <v-flex sm12 xs12 md12 lg12 class="mb-2 pa-3">
          <v-card class="pa-3">
            <v-title>Latest Examinations</v-title>
            <div class="text-center pt-3" >
              <Table/>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<style>
  .chart{
    height:450px;
  }
</style>

<script lang="ts" src="./dashboard.ts">

</script>




  
