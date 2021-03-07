import Vue from 'vue';
import Confirm from '../../components/confirmation/confirm.vue';
import ChartDoughnut from "../../components/ChartDoughnut/ChartDoughnut.vue";
import ChartBar from "../../components/ChartBar/ChartBar.vue";
// import MainChartExample from "../charts/MainChartExample.vue";
import Table from "../../components/table/table.vue";
import SubjectTable from "../../components/subjectTable/subjectTable.vue";
import ActivityFeed from "../../components/Feed/feed.vue";
import Axios from 'axios';




export default Vue.extend({
  components: {
    Confirm,
    ChartDoughnut,
    ChartBar,
    // MainChartExample,
    Table,
    SubjectTable,
    ActivityFeed,
  },

  data: () => ({
    studentsNo: 0,
    examTaken : 0,
    avgScore : 0,
    cards: [],
    value1:80,
    value2:75,
    dataLoading: false,
  }),

  
  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      //this.$http.get('/admin-panel-info')
      this.dataLoading = true;
      Axios.get('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-panel-info')
        .then(response => {
         
          if(!response.data.error){
            this.studentsNo = response.data.data.countStudents;
            console.log("this.studentsNo",this.studentsNo);
            this.examTaken = response.data.data.examCount;
            this.avgScore = response.data.data.avg_score.toFixed(3);

          }

          this.cards= [
            { title: 'Number of Students', value: this.studentsNo, icon: 'mdi-account' },
            { title: 'Exam Taken', value: this.examTaken, icon: 'mdi-pencil' },
            { title: 'Average Score', value: this.avgScore, icon: 'mdi-book'  },
          ]
        });
        this.dataLoading=false
    }
  }
})




