import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
      style:{height:`280px`},
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
                padding: 25,
                
                
              }
            }
          ],
          xAxes: [
            {
                
                  barPercentage: 0.6
                
            }
        ]
          
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