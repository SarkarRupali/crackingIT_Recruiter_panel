import Axios from "axios";
import Vue from "vue";
import router from '../../router';
export default Vue.extend({

    data: () => ({
        adminEmail: "",
        adminPassword: "",
        adminValid: true,
        adminLoginLoading: false,
        emailRequired: [
            (v: boolean) => !!v || "Email is required"
        ],
        passwordRequired: [
            (v: boolean) => !!v || "Password is required"
        ],
        loginsnackbar: false,
        loginErrorMessage: "",
    }),
    created() {
        const token = localStorage.getItem("jwt");
        if (token) {
            router.push("/dashboard");
        }
    },
    methods: {
        async loginAsAdmin() {
            try {
                if (this.$refs.adminLoginForm.validate()) {
                    this.adminLoginLoading = true;
                    // this.response = Axios.post('https://uat.peekhire.com/authenticate', {
                    //     username: this.adminEmail,
                    //     password: this.adminPassword,
                    // });
                    
                    Axios.post('https://yqroi4mbbd.execute-api.us-east-1.amazonaws.com/prod/admin-login-v2', {
                        'email': this.adminEmail,
                        'password': this.adminPassword,
                    }).then(resp=>{
                       console.log("data",resp.data); 
                     
                        if (resp.data.error) {
                            if (resp.data.errorCode == 103) {
                                this.loginsnackbar = true;
                                this.loginErrorMessage = "Incorrect email or password given";
                            }
                            else{
                                this.loginsnackbar = true;
                                this.loginErrorMessage = "Incorrect email given";
                            }
                            this.adminLoginLoading = false;
                        } else if (resp.data.data.userType != 3) {
                            this.loginsnackbar = true;
                            this.loginErrorMessage = "Login Permission Denied For The User";
                            this.adminLoginLoading = false;
                        } else {
                            Axios.post('https://uat.peekhire.com/authenticate', {
                                    "username": "ayanmistri@gmail.com",
                                    "password": "Am@1234"
                            }).then(resp1=>{
                                if (resp1.data.status === true && resp1.data.message == 'AUTHORIZED') {
                                    
                                    let is_admin = resp.data.data.userType ;
                                    let userToken = resp.data.data.userToken; // zreyas token
                                    let admin_name = resp.data.data.name;
                                    let adminToken = resp1.data.token; // peekhire token

                                    console.log("(is_admin ",is_admin); 
                                    console.log("token ",userToken); 
                                    console.log("userToken ",adminToken); 
                                    
                                    localStorage.setItem("jwt", userToken);
                                    localStorage.setItem("is_admin", is_admin);
                                    localStorage.setItem("admin_name", admin_name);
                                    localStorage.setItem("jwt_peek", adminToken);


                                    if (localStorage.getItem("jwt") != null) {
                                        if (this.$route.params.nextUrl != null) {
                                            this.$router.push(this.$route.params.nextUrl);
                                        } else {
                                            if (is_admin === 1) {
                                                this.$router.push("/dashboard");
                                            } else if (is_admin === 3) {
                                                this.$router.push("/dashboard");
                                            } else {
                                                this.$router.push({ name: 'login' }).catch(err => { });
                                            }
                                        }
                                    }
                                    this.loginsnackbar = true;
                                    this.loginErrorMessage = "Successfully Login";
                                    this.adminLoginLoading = false;
                                   
                                }
                            })
                        }
                    }) 

                }
            }
            catch (error) {
                console.log('Something went wrong, please try again later.');
            }
        }
    }
});
