<template>
    <div class="p-5">
        <Teleport to="title">PayambarAzam | فهرست دانش آموزان</Teleport>
        <div class="flex justify-between items-center">
            <h1 class="font-bold" v-if="route.params.class == 'all'">تمامی دانش آموزان</h1>
            <h1 class="font-bold" v-else-if="route.params.class=='graduated'">فارغ التحصیل شدگان</h1>
            <h1 class="text-4xl font-bold" v-else>کلاس {{ route.params.class }} </h1>
            <input type="search" id="search-student" class="border-2 w-8/12 rounded-full p-3 outline-gray-300 h-12"
                :class="{ 'w-8/12': route.params.class !== 'graduated', 'w-9/12': route.params.class == 'graduated' }"
                placeholder="جست و جو کردن دانش آموز..." v-model="searchValue">
            <router-link class="btn rounded-full" :to="`/StudentsPage/${'graduated'}`"
                v-if="route.params.class == 'all'">فارغ التحصیل شدگان</router-link>
            <button class="btn rounded-full outline-none" @click="showAddStuModal = true"
                v-if="route.params.class != 'all' && route.params.class != 'graduated'">اضافه کردن دانش آموز</button>
        </div>
        <transition-group class="grid grid-cols-4 gap-5 mt-5" tag="div">
            <StuCard v-for="item in filteredSearch" :key="item[0]" :data="item"
                @openEditModal="openEditModalFunc(item)"></StuCard>
        </transition-group>
        <Transition>
            <AddStudentModal v-if="showAddStuModal" @closeModal="showAddStuModal = false" :class="route.params.class"
                @showAlertError="showErrorFunc" @showAlertSuccess="showSuccessFunc">
            </AddStudentModal>
        </Transition>
        <Transition>
            <EditStudentModal v-if="showEditStuModal" :data='targetStu' @closeModal="showEditStuModal = false"
                @showAlertError="showErrorFunc" @editSuccess="editSuccessFunc">
            </EditStudentModal>
        </Transition>
        <AlertBox :class="{ 'right-5': showAlert, '-right-1/4': !showAlert }" :style="alertBg">
            {{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { ref, inject, computed } from 'vue';
import { useRoute } from 'vue-router';
import AddStudentModal from '../components/AddStudentModal.vue';
import StuCard from '../components/StuCard.vue';
import EditStudentModal from '../components/EditStudentModal.vue';
import AlertBox from '../components/AlertBox.vue';

export default {
    components: {
        AddStudentModal,
        EditStudentModal,
        StuCard,
        AlertBox
    },
    setup() {
        let route = useRoute()
        let showAddStuModal = ref(false)
        let showEditStuModal = ref(false)
        let allStudents = inject('allStudents')
        let searchValue = ref('')

        let filterStudents = computed(() => {
            if (route.params.class == "all") {
                return allStudents.value.filter(studnet => studnet[1].isGraduated == false)
            } else if (route.params.class == 'graduated') {
                return allStudents.value.filter(student => student[1].isGraduated)
            } else {
                return allStudents ? allStudents.value.filter(student => student[1].classStu == route.params.class && student[1].isGraduated == false) : []
            }
        });
        let filteredSearch = computed(() => {
            let students = filterStudents.value;

            // اعمال فیلتر جستجو
            if (searchValue.value) {
                students = students.filter(student => {
                    const fullName = `${student[1].nameStu} ${student[1].familyStu}`;
                    return fullName.includes(searchValue.value.trim());
                });
            }

            return students.sort((a, b) => {
                return a[1].familyStu.localeCompare(b[1].familyStu); // مرتب‌سازی صعودی
            });
        });


        let showAlert = ref(false)
        let alertText = ref('')
        let alertBg = ref('')
        let targetStu = ref('')

        function openEditModalFunc(data) {
            targetStu.value = data
            showEditStuModal.value = true
        }

        function showHideAlert() {
            showAlert.value = true
            setTimeout(() => {
                showAlert.value = false
            }, 3000)
        }

        function showErrorFunc() {
            showHideAlert()
            alertText.value = "اطلاعات را درست و کامل وارد کنید"
            alertBg.value = "background:red"
        }

        function showSuccessFunc() {
            showHideAlert()
            alertText.value = "دانش آموز با موفقیت اضافه شد!"
            alertBg.value = "background:rgb(0, 211, 0)"
        }

        function editSuccessFunc() {
            showHideAlert()
            alertText.value = "اطلاعات دانش آموز با موفقیت بروز شد!"
            alertBg.value = "background:rgb(0, 211, 0)"
        }
        return {
            route,
            showAddStuModal,
            showEditStuModal,
            filterStudents,
            openEditModalFunc,
            targetStu,
            searchValue,
            alertText,
            showAlert,
            showErrorFunc,
            alertBg,
            showSuccessFunc,
            editSuccessFunc,
            filteredSearch
        }
    }
}
</script>