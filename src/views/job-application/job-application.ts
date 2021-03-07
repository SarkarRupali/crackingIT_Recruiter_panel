import Axios from 'axios';
import Vue from 'vue';
import Confirm from '../../components/confirmation/confirm.vue';

export default Vue.extend({
    components: {
        Confirm,
    },

    data: () => ({
        tab: 0,
        dialog: false,
        valid: true,
        snackbar: false,
        jobLoading : false,
        jobName: '',
        city:'',
        jobDescription: '',
        locationId : '',
        date: '',
        myDate : '',
        modal: false, 
        modal1: false, 
        startdate : '',
        submissionDeadline : '',
        rating : 0,
        showMessage : '',
        filteredLocation:[],
        selectedCandidate:[],
        addressData : {},
        hr: '',
        mm:'',
        ss : '',
       
        
        jobNameRequired: [
            (v: boolean) => !!v || "Job name is required",
            //@ts-ignore
            (v: boolean) => /^[a-zA-Z][\sa-zA-Z]+[0-9]*$/.test(v) || 'First character must be a letter',
            //@ts-ignore
            // (v: boolean) => /^([a-zA-Z])+( \w+)*$/.test(v) || 'Only alphabets are allowed in job name',
            //@ts-ignore
            (v: boolean) => v.length <= 100 || 'Job name must be less than 100 characters',
        ],
        locationRequired: [

        ],
        jobDescriptionRequired:[
            (v: boolean) => !!v || "Job description is required",
            //@ts-ignore
            (v: boolean) => v.length <= 100 || 'Job description must be less than 500 characters',
        ],
        dateRequired : [
            (v: boolean) => !!v || 'Please select start date'
        ],
        submissionRequired : [
            (v: boolean) => !!v || 'Please select start date'
        ],
        
       
   
    }),

    async created() {
        await this.initialize();
        var d = new Date();
        this.hr = d.getHours();
        this.mm = d.getMinutes();
        this.ss = d.getSeconds();
        //this.myDate= yy + '-' + mm + '-' + dd;
    },

    methods: {
        async initialize() {
            try {
                this.jobLoading = true;
                let token =  localStorage.getItem("jwt");
                if (token) {            
                    Axios.post('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-recruiter-details',{
                        token
                    }).then(rep => {
                        console.log("jvghvgvgv",rep.data.data.address.city);
                        if (!rep.data.error){
                            this.addressData = rep.data.data.address;console.log("jvggv", this.addressData);
                            this.filteredLocation.push(
                                {'city': rep.data.data.address.city,
                                    'id' : 0})
                                console.log("jvghvgvgv", this.filteredLocation);
                        } else {
                            
                        }
                    })
                }
            } catch (error) {
                console.log('Something went wrong, please try again later.');
            }
        },

    


        async saveRecruitData() {
            
            let cDate = this.startdate+'T'+this.hr+':'+this.mm+':'+this.ss+'.000Z';
            let subDate = this.submissionDeadline+'T'+this.hr+':'+this.mm+':'+this.ss+'.000Z';

            console.log("this.startdate",cDate);
           // console.log("this.startdate",tDate.toISOString());

            if (this.$refs.jobCreateForm.validate()) {
                this.jobLoading = true;
                const tokenAdmin = localStorage.getItem("jwt_peek");
                console.log("enter 1st");
                if (tokenAdmin) {
                    console.log("tokenAdmin",tokenAdmin);
                    let resp = await Axios.post('https://uat.peekhire.com/job/cijcreate',{
                        'jobTitle' : this.jobName,
                        'companyJobSpecific': '', 
                        'jobDescription': this.jobDescription,
                        'submissionDeadline': subDate,
                        'jobLocation': {
                            'addressLine1': this.addressData.address_line1,
                            'addressLine2': this.addressData.address_line2,
                            'city': this.addressData.city,
                            'state': this.addressData.state,
                            'country': this.addressData.country,
                            'postalCode': this.addressData.PIN,
                            'selected': true
                        },
                        // 'ratingScale': {
                        //     'ratingName': "Number",
                        //     'ratingId' : "603d0778c92c4822e0842d77"
                        // },
                        'jobCreationDate': cDate,
                        'status': {
                            'status': "ACTIVE",
                            'id': "603d0778c92c4822e0842d78"
                        },
                        'zoneId': 'Asia/Calcutta',
                        'isDeleted': false
                    }, {
                        headers: {
                          'Authorization': `Bearer ${tokenAdmin}` 
                        },
                        params:{
                            'action':"CREATE"
                        }
                    },
                    );
                    console.log("resp",resp);
                    if(resp.data.status == true && resp.status==200){
                        let token2 =  localStorage.getItem("jwt");
                        if (token2) {            
                            Axios.post('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-recruiter-details',{
                                'token' : token2,
                                'job_id' : resp.data.data.jobId,
                                // 'job_details' : '{"jobame":"John", "age":31, "city":"New York"}'
                            }).then(rep => {
                                console.log("vvresp",rep);
                                if(!rep.data.data.error){
                                    localStorage.setItem('setJobID', resp.data.data.jobId);
                                    this.snackbar = true;
                                    this.showMessage = 'Job saved. Go to question upload page'
                                    this.jobName = '';
                                    this.jobDescription = '';
                                    this.startdate= '';
                                    this.submissionDeadline = '';
                                    this.filteredLocation = [];
                                    this.$router.push('/question-upload') 
                                }
                                else{
                                    this.snackbar = true;
                                    this.showMessage = 'Not created!! Please try again.'
                                }
                            })
                        }
                    }
                    else{
                        this.snackbar = true;
                        this.showMessage = 'Not created!! Please try again.'
                    }
                 
                    // if (resp1.data.error) {
                    // this.snackbar = false;
                    // this.showMessage = "Not saved!! Please try again.";
                    // } else {
                    //     this.snackbar = true;
                    //     this.showMessage = "Jb created successfully";
                    //     this.examCreateLoading = false;
                    //     await this.initialize();
                    //     this.switchToExamsTab();
                    //     this.examName = '';
                    // }
                    // }
                }
            }
        },
       
        close() {
            this.dialog = false;
        },
    },
});
