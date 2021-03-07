import Axios from 'axios';
import Vue from 'vue';
import Confirm from '../../components/confirmation/confirm.vue';

export default Vue.extend({
    components: {
        Confirm
    },

    data: () => ({
        tab : 0,
        name:'',
        questiondata : [],
        setQuestin:[]
    }),

    async created() {
       await this.initialize() ;
    },

    methods: {
        async initialize() {

            try{
                let id : any;
               id =  JSON.parse(localStorage.getItem("data"));
               console.log("hh",id);
               this.name = id.candidateName;
               this.role = id.jobTitle;
               this.questiondata = id.allQuestins;
               console.log("this.questiondata",this.questiondata);

               for (let i = 0; i < this.questiondata.length; i++) {
                console.log("this.questiondata",this.questiondata[i].question.question);
                let url = this.questiondata[i].answer
                url = url.replace(/\//g, "~")
                ${apiURL}file/download/${url}

                this.setQuestin.push({
                    'id':i+1,
                    'answers' : this.questiondata[i].answer,
                    'question' : this.questiondata[i].question.question
                })
               }
          
            } catch (error) {
                console.log('Something went wrong, please try again later.');
            }
        },

      

       
    },
});
