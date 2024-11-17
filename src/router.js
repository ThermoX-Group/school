import { createRouter, createWebHistory } from "vue-router";

import MainPage from "./pages/MainPage.vue";
import EditPage from "./pages/EditPage.vue";
import StudentsClass from "./pages/StudentsClass.vue";
import TargetClass from "./pages/targetClass.vue";
import TargetStudent from "./pages/TargetStudent.vue";
import PersonnelSchool from "./pages/PersonnelSchool.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: MainPage },
        { path: "/editpage", component: EditPage },
        { path: "/studentsclass", component: StudentsClass },
        { path: "/TargetClass/:class", component: TargetClass },
        { path: "/TargetStudent/:stu", component: TargetStudent },
        { path: "/personnel", component: PersonnelSchool },
    ]
})

export default router
