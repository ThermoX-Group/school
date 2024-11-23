import { createRouter, createWebHistory } from 'vue-router'

import MainPage from './pages/MainPage.vue'
import EditPage from './pages/EditPage.vue'
import StudentsClass from './pages/StudentsClass.vue'
import StudentsPage from './pages/StudentsPage.vue'
import TargetStudent from './pages/TargetStudent.vue'
import PersonnelSchool from './pages/PersonnelSchool.vue'
import AddNotic from './pages/AddNotic.vue'
import EditNotic from './pages/EditNotic.vue'
import TargetNotic from './pages/TargetNotic.vue'
import AllNotics from './pages/AllNotics.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: MainPage },
    { path: '/editpage', component: EditPage },
    { path: '/studentsclass', component: StudentsClass },
    { path: '/StudentsPage/:class', component: StudentsPage },
    { path: '/TargetStudent/:stu', component: TargetStudent },
    { path: '/personnel', component: PersonnelSchool },
    { path: '/AddNotic', component: AddNotic },
    { path: '/EditNotic/:notic', component: EditNotic },
    { path: '/TargetNotic/:notic', component: TargetNotic },
    { path: '/AllNotics', component: AllNotics },
  ]
})

export default router
