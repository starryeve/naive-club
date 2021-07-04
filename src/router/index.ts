import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/club',
    name: 'Club',
    component: () => import('../views/Club/index.vue'),
    redirect: '/club/list',
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('../views/Club/List.vue')
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('../views/Club/Add.vue')
      },
      {
        path: 'activity',
        name: 'Activity',
        component: () => import('../views/Club/Activity.vue')
      },
      {
        path: 'apply',
        name: 'Apply',
        component: () => import('../views/Club/Apply.vue')
      },
      {
        path: 'c-setting',
        name: 'CSetting',
        component: () => import('../views/Setting.vue')
      }
    ]
  },
  {
    path: '/student',
    name: 'Student',
    component: () => import('../views/Student/index.vue'),
    redirect: '/student/attend',
    children: [
      {
        path: 'attend',
        name: 'Attend',
        component: () => import('../views/Student/Attend.vue')
      },
      {
        path: 'attended',
        name: 'Attended',
        component: () => import('../views/Student/Attended.vue')
      },
      {
        path: 's-setting',
        name: 'SSetting',
        component: () => import('../views/Setting.vue')
      }

    ]
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: () => import('../views/Teacher/index.vue'),
    redirect: '/teacher/comment',
    children: [
      {
        path: 'clubs',
        name: 'Clubs',
        component: () => import('../views/Teacher/Clubs.vue')
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('../views/Teacher/Comment.vue')
      },
      {
        path: 't-setting',
        name: 'TSetting',
        component: () => import('../views/Setting.vue')
      }

    ]
  },
  {
    path: '/union',
    name: 'Union',
    component: () => import('../views/Union/index.vue'),
    redirect: '/union/all-clubs',
    children: [
      {
        path: 'all-clubs',
        name: 'AllClubs',
        component: () => import('../views/Union/AllClubs.vue')
      },
      {
        path: 'audit',
        name: 'Audit',
        component: () => import('../views/Union/Audit.vue')
      },
      {
        path: 'all-activities',
        name: 'AllActivities',
        component: () => import('../views/Union/AllActivities.vue')
      },
      {
        path: 'u-setting',
        name: 'USetting',
        component: () => import('../views/Setting.vue')
      }

    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
console.log();


export default router