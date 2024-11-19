<template>
    <div class="p-5">
        <div class="flex justify-between items-center">
            <h1 class="text-4xl font-bold">پرسنل مدرسه</h1>
            <button class="btn rounded-full" @click="showAddPersonnel = true">اضافه کردن فرد جدید</button>
        </div>
        <h2 class="text-2xl mb-2 mt-4">معاونین</h2>
        <TransitionGroup tag="div" class="mb-5 border-b border-gray-300 pb-4 grid grid-cols-4 gap-5">
            <PersonnelCard v-for="item in assistants" :key="item[0]" :data="item"
                @openEditModal="openEditModalHandler(item)"></PersonnelCard>
        </TransitionGroup>
        <h2 class="text-2xl mb-2">معلمان</h2>
        <TransitionGroup tag="div" class="mb-5 border-b border-gray-300 pb-4 grid grid-cols-4 gap-5">
            <PersonnelCard v-for="item in teachers" :key="item[0]" :data="item"
                @openEditModal="openEditModalHandler(item)">
            </PersonnelCard>
        </TransitionGroup>
        <Transition>
            <AddPersonnelModal @closeModal="showAddPersonnel = false" v-if="showAddPersonnel"></AddPersonnelModal>
        </Transition>
        <Transition>
            <EditPersonnelModal :data="targetPersonnel" v-if="showEditPersonnel"
                @closeModal="showEditPersonnel = false"></EditPersonnelModal>
        </Transition>
        <router-link to="/editPage" class="absolute left-3 bottom-3 text-2xl">مدیریت : آقای {{ userDatas.name
            }}</router-link>
    </div>
</template>

<script>
import AddPersonnelModal from '../components/AddPersonnelModal.vue';
import EditPersonnelModal from '../components/EditPersonnelModal.vue';
import PersonnelCard from '../components/PersonnelCard.vue';
import { ref, inject, computed } from 'vue';
export default {
    components: {
        AddPersonnelModal,
        EditPersonnelModal,
        PersonnelCard
    },
    setup() {
        let userDatas = inject('userDatas')

        let showAddPersonnel = ref(false)
        let allPersonnels = inject('allPersonnels')

        let showEditPersonnel = ref(false)

        let assistants = computed(() => {
            return allPersonnels.value.filter(personnel => personnel[1].rule == "معاون")
        })

        let teachers = computed(() => {
            return allPersonnels.value.filter(personnel => personnel[1].rule == "معلم")
        })

        let targetPersonnel = ref('')
        function openEditModalHandler(item) {
            showEditPersonnel.value = true
            targetPersonnel.value = item

        }
        return {
            showAddPersonnel,
            allPersonnels,
            assistants,
            teachers,
            userDatas,
            showEditPersonnel,
            openEditModalHandler,
            targetPersonnel
        }
    }
}
</script>