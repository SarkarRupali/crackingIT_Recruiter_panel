import Vue from 'vue';


export default Vue.extend({
    data () {
      return {
        subjects: [
          {
            icon: 'mdi-database-plus',
            sub_name: 'Programming & Data Structure',
            percentage: 78,
          },
          {
            icon: 'mdi-code-not-equal-variant',
            sub_name: 'Data Science',
            percentage: 70,
          },
          {
            icon: 'mdi-ethernet',
            sub_name: 'Networking & Cyber Security',
            percentage: 82,
          },
          {
            icon: 'mdi-bulletin-board',
            sub_name: 'Analytical Ability',
            percentage: 69,
          },
          {
            icon: 'mdi-book-open-page-variant',
            sub_name: 'English',
            percentage: 93,
          },
         
        ],
      }
    },
  })
