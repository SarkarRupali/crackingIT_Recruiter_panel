import Vue from 'vue';


export default Vue.extend({
    data: () => ({
      messages: [
        {
          from: '28 Apr,2020',
          message: `Exam Started on "Cyber Security"`,
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: '21 Apr,2020',
          message: 'Student Enroll on "Data Science"',
          time: '08:37am',
          color: 'green',
        },
        {
          from: '18 Apr,2020',
          message: 'Score Published on "Exam 3 English',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
        {
            from: '11 Apr,2020',
            message: 'Responded to Interview "Analytical Ability"',
            time: '03:47am',
            color: 'yellow',
          },
      ],
    }),
  })
