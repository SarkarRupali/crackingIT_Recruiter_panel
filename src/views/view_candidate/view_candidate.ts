import Axios from 'axios';
import Vue from 'vue';
import Confirm from '../../components/confirmation/confirm.vue';

export default Vue.extend({
    components: {
        Confirm
    },

    data: () => ({
        tab: 0,
        allCandidatesData : [],
        dataLoading : false,
        snackbar : false,
        viewMessage : '',
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'candidateName',
            },
            
            { text: 'Job Title', value: 'jobTitle' },
            { text: 'Status', value: 'status'},
            { text: 'Invited', value: 'inviteDate'},
            { text: 'Submitted', value: 'submittedDate' },
            { text: 'Question Set', value: 'qName' },
            { text: 'Review', value: 'action' },
        ],
        
    }),

    async created() {
       await this.initialize();
      
    },

    methods: {
        async initialize() {
            try {
                this.dataLoading = true;
                const tokenZr = localStorage.getItem('jwt');
                const tokenP = localStorage.getItem('jwt_peek');
                if (tokenZr) {
                    Axios.post('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-job-details',{
                        'token': tokenZr
                    }).then(result => {
                        console.log(result);
                        console.log(result.data);
                        if(!result.data.error){
                            this.jobIdAll =  result.data.data;
                        

                            this.jobIdAll.forEach(element => {
                                Axios.get('https://uat.peekhire.com/transaction/candidates',{
                                    headers:{
                                        "Authorization": `Bearer ${tokenP}` 
                                    },
                                    params:{
                                        'jobId' : element.job_id,	
                                        'status': "TOTAL"

                                    }
                                    
                                })
                                .then(response => {
                                    
                                    for (let i = 0; i < response.data.data.length; i++) {
                                        console.log("dataDSFDS",response);
                                        this.allCandidatesData.push({
                                            'id':response.data.data[i].id,
                                            'candidateName' : response.data.data[i].candidate.fName+'  '+response.data.data[i].candidate.lName,
                                            'jobTitle' : response.data.data[i].job.jobTitle,
                                            'jobId' : response.data.data[i].job.jobId,
                                            'status' : response.data.data[i].candidateTransactionStatus,
                                            'inviteDate' : response.data.data[i].invitationDate,
                                            'submittedDate' : response.data.data[i].dateSubmitted,
                                            'qName' : response.data.data[i].questionSet.name,
                                            'questinSet' : response.data.data[i].questionSet,
                                            'allQuestins' : response.data.data[i].questions
                                        })
                                    }
                                })
                            })
                        }    
                    })
                }   
            } catch (error) {
                console.log('Something went wrong, please try again later.');
            }
        },

        reviwPage(id){
            console.log(id);
            this.allCandidatesData.forEach(element => {
                if (element.id == id) {
                   console.log("data",element.jobId)
                //    localStorage.setItem("data",element.jobId)
                   localStorage.setItem("data",JSON.stringify(element))
                }
            });
            this.$router.push('/view-candidate/review_candidate') 
        }
    }

     
});
