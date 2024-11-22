<template>
    <div class="p-5" v-if="targetStu">
        <div class="flex justify-between items-center">
            <h1 class="text-4xl font-bold">دانش آموز "{{ targetStu[1].nameStu }} {{ targetStu[1].familyStu }}"</h1>
            <div>
                <button class="btn rounded-full" @click="showUpgradeModal = true" v-if="stuNumClass[0] < 12">ارتقا
                    به کلاس بالاتر</button>
                <button class="btn rounded-full" v-else>فارغ التحصیلی</button>
            </div>
        </div>
        <StuData :data="targetStu"></StuData>
        <DeciplineTable @showAddCase="showDeciplineModal = true" :data=targetStu
            @showDeleteModal="showDeleteModalHandler"></DeciplineTable>
        <Transition>
            <DeciplineModal @closeModal="showDeciplineModal = false" v-if="showDeciplineModal" :data="targetStu">
            </DeciplineModal>
        </Transition>
        <Transition>
            <DeleteDesciplineCaseModal :data="targetCase" v-if="showDeleteModal" @closeModal="showDeleteModal = false">
            </DeleteDesciplineCaseModal>
        </Transition>
        <Transition>
            <UpgradeClassModal v-if="showUpgradeModal" @closeModal="showUpgradeModal = false" :data="targetStu">
            </UpgradeClassModal>
        </Transition>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed, inject, ref } from 'vue';
import DeciplineModal from '../components/DeciplineModal.vue';
import StuData from '../components/StuData.vue';
import DeciplineTable from '../components/DeciplineTable.vue';
import DeleteDesciplineCaseModal from '../components/DeleteDesciplineCaseModal.vue';
import UpgradeClassModal from '../components/UpgradeClassModal.vue';
export default {
    components: {
        StuData,
        DeciplineTable,
        DeciplineModal,
        DeleteDesciplineCaseModal,
        UpgradeClassModal
    },
    setup() {
        let route = useRoute()
        let allStudents = inject('allStudents')
        let targetStu = computed(() => {
            return allStudents.value ? allStudents.value.find(student => student[0] === route.params.stu) : '';
        })
        let stuNumClass = computed(() => {
            return targetStu.value[1].classStu.split(" ")
        })

        let showDeciplineModal = ref(false)
        let showDeleteModal = ref(false)
        let targetCase = ref('')

        function showDeleteModalHandler(item) {
            showDeleteModal.value = true
            targetCase.value = item
        }

        let showUpgradeModal = ref(false)
        return {
            targetStu,
            showDeciplineModal,
            showDeleteModal,
            showDeleteModalHandler,
            targetCase,
            showUpgradeModal,
            stuNumClass
        }
    }
}
</script>