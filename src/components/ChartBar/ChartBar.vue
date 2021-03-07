<template >
  <v-card title="Bar">
    <v-card img-bottom >
      <ChartBarBase :chart-data="chartData" />
    </v-card>
  </v-card>
</template>

<style>

</style>

<script>
import ChartBarBase from "./ChartBarBase.js";
import Axios from 'axios';

export default {
  components: {
    ChartBarBase
  },
  data() {
    return {
      chartData: null,
      chartYAll : [],
      chartPYAll : [],
      year:'',
      score : 0,
      pscore : 0,

    };
  },
  mounted() {
    this.fillData();
    let date = new Date();
    this.year = date.getFullYear();
    
  
  },
  methods: {
    fillData() {
      let candiMnthData = [];
      let candiPMnthData = [];
      Axios.get('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-panel-info')
      .then(response => {
        console.log("2",response.data);
        if(!response.data.error){
          let candidata = response.data.data.candidate_dataWithDates;
          for (let i = 0; i < candidata.length; i++) {
            if (this.year == candidata[i].year) {
              candiMnthData.push(candidata[i]);
            }
            else if (this.year-1 == this.chartAll[i].year) {
              candiPMnthData.push(candiMnthData[i]);
            }
          }

          if (candiMnthData.length!=0) {  
            for (let j = 1; j < 13; j++) {
            this.score = 0
              for (let k = 0; k < candiMnthData.length; k++) {
                if(j == candiMnthData[k].month_num) {
                  if (this.score<candiMnthData[k].Score) {
                    this.score = candiMnthData[k].Score;
                  }
                }                    
              }
              this.chartYAll.push(this.score);
              console.log(this.chartYAll);
            }
          }


           if (candiPMnthData.length!=0) {  
            for (let j = 1; j < 13; j++) {
            this.pscore = 0
              for (let k = 0; k < candiPMnthData.length; k++) {
                if(j == candiPMnthData[k].month_num) {
                  if (this.pscore<candiPMnthData[k].Score) {
                    this.pscore = candiPMnthData[k].Score;
                  }
                }                    
              }
              this.chartPYAll.push(this.pscore);
              console.log(this.chartPYAll);
            }
          }
 
        
          this.chartData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug" , "Sep", "Oct","Nov","Dec"],
            datasets: [
              {
                type:"line",
                backgroundColor: "transparent",
                borderColor: "#de98ab",
                data: this.chartPYAll,
                label: this.year-1
              },
              {
                type:"bar",
                backgroundColor: "#98ddde",
                borderColor: "#030c0c",
                data: this.chartYAll,
                label: this.year
              }
            ]
          };
        }
      }); 
    },
  }
}
</script>