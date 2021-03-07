import Vue from 'vue';
import Axios from 'axios';

export default Vue.extend({
    data () {
      return {
        sortByScore : [],
        
        headers: [
          { text: 'Student Name', value: 'studentName' },
          { text: 'Email', value: 'email' },
          { text: 'Date', value: 'dateAttempted' },
          { text: 'Phone', value: 'phone' },
          { text: 'Score', value: 'Score' },
        ],
      }
    },
    mounted() {
    this.initialize();
    },
    methods: {
      getColor (Overall_Status) {
        if (Overall_Status == `poor`) return 'red'
        else if (Overall_Status == `fair`) return 'orange'
        else return 'green'
      },

      initialize () {
        //this.$http.get('/admin-panel-info')
        this.dataLoading = true;
        Axios.get('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-panel-info')
          .then(response => {
            
            if(!response.data.error){
              
              this.sortByScore = response.data.data.candidate_data_sortByScore;
              for (let i = 0; i < this.sortByScore.length; i++) {
                let date = new Date(this.sortByScore[i].dateAttempted);
                this.sortByScore[i].dateAttempted = date.toISOString().substring(0, 10);
                
              }
              
            }
            })
          }
    },
  })