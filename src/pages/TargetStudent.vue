<template>
    <div class="p-5" v-if="targetStu">
        <Teleport to="title">| دانش آموز {{ targetStu[1].nameStu }} {{ targetStu[1].familyStu }}</Teleport>
        <div class="flex justify-between items-center">
            <h1 class="text-4xl font-bold">دانش آموز "{{ targetStu[1].nameStu }} {{ targetStu[1].familyStu }}"</h1>
            <div>
                <button class="btn rounded-full" @click="showUpgradeModal = true" v-if="stuNumClass[0] < 12">ارتقا
                    به کلاس بالاتر</button>
                <button class="btn rounded-full" v-else-if="stuNumClass[0] == 12 && !targetStu[1].isGraduated" @click="showGadutedModal = true">فارغ التحصیلی</button>
                <p v-else>فارغ التحصیل شده</p>
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
        <Transition>
            <GradutedModal v-if="showGadutedModal" @closeModal="showGadutedModal = false" :data="targetStu">
            </GradutedModal>
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
import GradutedModal from '../components/GraduatedModal.vue';
export default {
    components: {
        StuData,
        DeciplineTable,
        DeciplineModal,
        DeleteDesciplineCaseModal,
        UpgradeClassModal,
        GradutedModal
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
        let showGadutedModal = ref(false)
        return {
            targetStu,
            showDeciplineModal,
            showDeleteModal,
            showDeleteModalHandler,
            targetCase,
            showUpgradeModal,
            stuNumClass,
            showGadutedModal
        }
    }
}
</script>