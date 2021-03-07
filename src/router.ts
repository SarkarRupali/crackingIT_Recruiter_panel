import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login/login.vue'),
      meta: {
        // requiresAuth: false,
        guest: true,
      }
    },
    {
      path: '/dashboard',
      name: 'home',
      component: () => import('./views/dashboard/dashboard.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true,
      },
    },
    {
      path: '/job-application',
      name: 'job-application',
      component: () => import('./views/job-application/job-application.vue'),
      meta: {
        title: 'Job Application',
        requiresAuth: true,
      },
    },
    {
      path: '/question-upload',
      name: 'question-upload',
      component: () => import('./views/question-upload/question-upload.vue'),
      meta: {
        title: 'Question Upload',
        requiresAuth: true,
      },
    },
    {
      path: '/view-candidate',
      name: 'view-candidate',
      component: () => import('./views/view_candidate/view_candidate.vue'),
      meta: {
        title: 'View/Assess Candidates',
        requiresAuth: true,
      },
    },
    {
      path: '/view-candidate/review_candidate',
      name: 'review_candidate',
      component: () => import('./views/review_candidate/review_candidate.vue'),
      meta: {
        title: 'Review Candidates',
        requiresAuth: true,
      },
    }
  ]
});


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      // console.log('URL: ', to.path); // /add-exam
      next({
        path: '/',
        params: { nextUrl: to.path },
      });
    } else {
      next();
    }
  } else {
    next();
  }

});

export default router;
