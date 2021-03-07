import Axios from 'axios';
import Vue from 'vue';
import Confirm from '../../components/confirmation/confirm.vue';

export default Vue.extend({
    components: {
        Confirm
    },

    data: () => ({
        tab: 0,
        tabName: [
            "Question Upload", "Invite Candidate",
        ],
        dialog: false,
        quesType : [],
        id:0,
        question : '',
        answer1 : '',
        answer2: '',
        answer3 : '',
        answer4 : '',
        answer  : '',
        preparationTime : 1,
        takes : 1,
        responseTime : 1,
        setName : '',
        setQNameForm : '',
        valid: false,
        shwData : false,
        qSetForm : true,
        snackbar: false,
        quesLoading: false,
        questionMessage : '',
        qID : 0,qType :'',
        jobId : 0,
        saveQuestion : [],
        candidateData : [],
        selectedCandidate : [],
        candidatesData : [],
        questionRequired: [
            (v: boolean) => !!v || "Question is required",
        ],
        quesionTypeRequired:[],
        setNameRequired : [
            (v: boolean) => !!v || "Question is required",
        ],

        headers: [
            {
              text: 'Question Type',
              align: 'start',
              sortable: false,
              value: 'questionType.type',
            },
            { text: 'Question', value: 'question' },
            { text: 'Preparation Time', value: 'preparationTime' },
            { text: 'Takes Time', value: 'takes'},
            { text: 'Response Time', value: 'responseTime'},
        ],

        headersC: [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'studentName',
            },
            { text: 'Email ID', value: 'email' },
            { text: 'Phone', value: 'phone' },
            { text: 'College', value: 'college'},
            { text: 'Qualification', value: 'degree'},
            { text: 'ExamDate', value: 'dateAttempted' },
            { text: 'Score', value: 'Score' },
        ],
        selectedQuestion : [],
    }),

    async created() {
       
        this.jobId = localStorage.getItem('setJobID');
        if (this.jobId!=null) {
            this.shwData = true;
        } else {
            this.shwData = false;
        }

        const tokenAdmin =  localStorage.getItem("jwt_peek");
                
                Axios.get('https://uat.peekhire.com/question/gettypes',{ headers: { 'Authorization': `Bearer ${tokenAdmin}` } })
                .then(resp => {
                    console.log("data",resp);
                    if (resp.status===200) {
                        console.log("data",resp);
                        console.log("data",resp.data.data);
                        this.quesType = resp.data.data;
                    }
                    else {
                    }
                });

        console.log("this.jobId",this.jobId);
    },

    methods: {
        async initialize() {
           

            
            try {
                this.jobLoading = true;
                Axios.get('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-candidate-list')
                .then(response => {
                    console.log("data",response.data.data);
                    if(!response.data.error){
                        this.candidateData = response.data.data;

                        for (let i = 0; i < this.candidateData.length; i++) {
                            let datec = new Date(this.candidateData[i].dateAttempted);
                            console.log(datec);
                            this.candidateData[i].dateAttempted = datec.toLocaleDateString();
                        }
                    }
                })

                //const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJheWFubWlzdHJpQGdtYWlsLmNvbSIsImV4cCI6MTYxNDg2ODgxMiwiaWF0IjoxNjE0ODUwODEyfQ.8wGhTTMGlfuj_HqlKdLPKbFwHSo6XdtNAfcQ_5A4QErbHccJWzrgH7LQtKfDjQQfGYiOF5V0PMkN-3--6BMcJg';
                // const tokenAdmin =  localStorage.getItem("jwt_peek");
                
                // Axios.get('https://uat.peekhire.com/question/gettypes',{ headers: { 'Authorization': `Bearer ${tokenAdmin}` } })
                // .then(resp => {
                //     console.log("data",resp);
                //     if (resp.status===200) {
                //         console.log("data",resp);
                //         console.log("data",resp.data.data);
                //         this.quesType = resp.data.data;
                //     }
                //     else {
                //     }
                // });
            } catch (error) {
                console.log('Something went wrong, please try again later.');
            }
        },

        async uploadQuestion() {
            if (this.$refs.singleUploadForm.validate()) {
                for (let j = 0; j < this.quesType.length; j++) {
                    if (this.quesType[j].id == this.id) {
                        this.qType = this.quesType[j].type;
                    }
                }
                
                this.saveQuestion.push({
                    'questionType': {
                        'id': this.id,
                        'type': this.qType,
                        'checked': true
                    },
                    'tags': [],
                    'question': this.question,
                    'url': '',
                    'option1': this.answer1,
                    'option2': this.answer2,
                    'option3': this.answer3,
                    'option4': this.answer4,
                    'answer': this.answer,
                    'preparationTime': this.preparationTime,
                    'takes': this.takes,
                    'responseTime': this.responseTime
                });

                let i = 0;
                this.saveQuestion.map(n => {
                    n['id'] = i;
                    i++;
                })
                this.id=0;
                this.question = '';
                this.answer1 = '';
                this.answer2 = '';
                this.answer3 = '';this.answer4='';this.answer='';
                this.preparationTime=1, this.takes =1, this.responseTime =1
                console.log("2",this.saveQuestion);
            }
        },

        async saveAllQuestion() {
            let resp: any;
            this.dialog = true;
        },
        async saveQName(){
            let resp : any;
            
            try {
                this.quesLoading = true;
                const tokenAdmin =  localStorage.getItem("jwt_peek");
                
                if (tokenAdmin) {
                    resp = await Axios.post('https://uat.peekhire.com/question/create/'+this.setName,
                        this.selectedQuestion,
                        {
                            headers: {
                            'Authorization': `Bearer ${tokenAdmin}` 
                            },
                        },
                    )
                }
                if (resp.data.status==true) {
                    console.log('resp.data',resp.data);
                    this.quesLoading = false;
                    this.snackbar = true;
                    this.questionMessage = 'Questions and Question_Set created.';
                    this.qID = resp.data.data.id;
                    this.dialog = false;
                    this.setName = '';
                    this.selectedQuestion = [];
                    await this.initialize();
                    this.switchToExamsTab();

        
                } else {
                    this.dialog = false;
                    this.setName = '';
                    this.quesLoading = false;
                    this.snackbar = true;
                    this.questionMessage = 'Not created! Please try again.';
                }
                
            } catch (error) {
                console.log('Something went wrong, please try again later.');
            }
        },

        switchToExamsTab(){
            this.tab = 1;
        },

        async inviteCandidates(){
            this.candidatesData = [];
            console.log("sdfs",this.selectedCandidate);
            let resp  : any;
            try {
                this.quesLoading = true;


                let tDate = new Date();
                let  inDate= tDate.toISOString();

               
                let d = new Date();
                d.setDate(d.getDate() + 4);
                let submissinDate = d.toISOString();

                for (let i = 0; i < this.selectedCandidate.length; i++){
                    this.candidatesData.push({
                        'fName' : this.selectedCandidate[i].first_name,
                        'lName':  this.selectedCandidate[i].last_name,
                        'emailId': this.selectedCandidate[i].email,
                        'companyCandidateSpecific': '',   
                        'submissionDeadline': submissinDate
                    })
                };
                    
                    
                const tokenAdmin =  localStorage.getItem("jwt_peek");
                
                if (tokenAdmin) {
                    console.log(this.candidatesData);
                    resp = await Axios.post('https://uat.peekhire.com/job/cijinvitecandidate',{
                        'candidatesData': this.candidatesData,
                        'questionSet': {
                          'id': this.qID
                        },
                        'invitationEmailText': '<div>Dear #FirstName,</div><div><br></div><div>Thank you for your interest in our Company.&nbsp; We would like to get to know you a little better to assess your suitability for our organization.&nbsp;&nbsp;</div><div><br></div><div>We would like to get to know you a little better to assess your suitability for our organization.&nbsp; Please complete the pre-screening questions for this role, which can be accessed by clicking on this <a href="${INVITE_URL}">link</a>. You can complete this on a desktop or a mobile device. Please submit your responses before #Submission Date.</div><div><br></div><div>For technical support, contact toll free: 1-888-296-0836.</div><div><br></div><div>#Job Description</div><div><br></div><div>We thank you for your time in advance.&nbsp; We will only be able to contact candidates who most closely match our needs.</div><div><br></div><div>Sincerely,</div><div>The Hiring Team</div><div>#Company Name</div>',
                        'job': {
                          'jobId': this.jobId
                        },
                        'inviteDateTime': inDate,
                        'zoneId': 'Asia/Calcutta'

                        },
                        {
                            headers: {
                            'Authorization': `Bearer ${tokenAdmin}` 
                            },
                            params:{
                                'action' : 'ONE_WAY'
                            }
                        },
                    )
                }
                if (resp.data.status==true) {
                    console.log(resp.data);
                    localStorage.removeItem('setJobID');
                    this.snackbar = true;
                    this.quesLoading = false;
                    this.questionMessage = 'Candidate invited successfully';
                    this.setName = '';
                    this.jobId = 0;
                    this.shwData=false;
                    this.saveQuestion = [];
                    this.candidateData = [];
                    this.$router.push('/job-application') 
                   
        
                } else {
                    this.candidateData = [];
                    this.snackbar = true;
                    this.quesLoading = false;
                    this.questionMessage = 'Please try again';
                }
            } catch (error) {
                console.log('Something went wrong, please try again later.');
            }

        },
      
        close() {
            this.dialog = false;
        },
        switchToTab(){
            this.tab =0;
        }


       
    },
});
