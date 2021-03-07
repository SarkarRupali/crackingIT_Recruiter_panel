import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
      // style:{height:`150px`,width:`100px`},
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                // beginAtZero: true,
                padding:20,
                display:false
              
                
              }
            }
          ],
          
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};