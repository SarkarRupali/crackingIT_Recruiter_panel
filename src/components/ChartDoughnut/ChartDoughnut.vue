<template>
  <v-card title="Doughnut">
    <v-card img-bottom>
      <ChartDoughnutBase :chart-data="chartData" />
    </v-card>
  </v-card>
</template>

<script>
import Axios from 'axios';
import ChartDoughnutBase from "./ChartDoughnutBase.js";

export default {
  components: {
    ChartDoughnutBase
  },
  data() {
    return {
      chartData: null,
      dataCunt : '',
      data:[],
      labels : []
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      //this.$http.get('/admin-panel-info').then(response => {
      Axios.get('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-panel-info').then(response => {  
        if(!response.data.error){
          this.dataCunt = response.data.data.count;
          this.data=Object.values(this.dataCunt);
          for (let i=0 ; i < Object.getOwnPropertyNames(this.dataCunt).length-1; i++) {
            this.labels.push(Object.getOwnPropertyNames(this.dataCunt)[i]);
          }
         
        }
        this.chartData = {
          datasets: [
            {
              backgroundColor: ["#185190","#f36e60", "#ffdb3b" ],
              hoverBackgroundColor: ["#d1e3f7","#fbd2cd", "#fef5c9"],
              data: this.data
            }
          ],
          labels: this.labels
        };
      })
    }
  }
};
</script>
