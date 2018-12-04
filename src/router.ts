import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HomeRoute',
      component: () => import('./views/HomeView.vue'),
    },
    {
      path: '/member/',
      name: 'MemberListRoute',
      component: () => import('./views/member/MemberListView.vue'),
    },
    {
      path: '/member/:id',
      name: 'MemberDetailRoute',
      component: () => import('./views/member/MemberDetailView.vue'),
    },
    {
      path: '/club/',
      name: 'ClubListRoute',
      component: () => import('./views/club/ClubListView.vue'),
    },
    {
      path: '/club/:id',
      name: 'ClubDetailRoute',
      component: () => import('./views/club/ClubDetailView.vue'),
    },
    {
      path: '/voting/:id',
      name: 'VotingDetailRoute',
      component: () => import('./views/voting/VotingDetailView.vue'),
    },

    {
      path: '/api',
      name: 'APIRoute',
      component: () => import('./views/FlatPageView.vue'),
    },
    {
      path: '/o-nas',
      name: 'AboutUsRoute',
      component: () => import('./views/FlatPageView.vue'),
    },
  ],
});
