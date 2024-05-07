import HomeView from '../views/HomeView.vue'
import TeacherView from '../views/TeacherView.vue'
import LoginView from '../views/LoginView.vue'
import StudentView from '@/views/StudentView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: TeacherView,
    meta: {
      requiresAuth: true,
      requiresTeacher: true
    }
  },
  {
    path: '/student',
    name: 'Student',
    component: StudentView,
    meta: {
      requiresAuth: true,
      requiresStudent: true
    }
  },
  {
    path: '/ask',
    name: 'AskQuestion',
    component: () => import('../views/CreateQuestionView.vue')
  },
  {
    path: '/questions',
    name: 'SeeQuestions',
    component: () => import('../views/SeeQuestionsView.vue')
  },
  {
    path: '/students',
    name: 'SeeStudents',
    component: () => import('../views/SeeStudentsView.vue')
  },
  {
    path: '/categories',
    name: 'CreateCategory',
    component: () => import('../views/CreateCategoryView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

export default routes
