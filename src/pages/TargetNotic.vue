<template>
    <div class="p-5" v-if="findNotic">
        <Teleport to="title"> | اطلاعیه {{ findNotic[1].titleNotic }}</Teleport>
        <div class="flex items-cente justify-between">
            <div>
                <h1 class="font-bold">{{ findNotic[1].titleNotic }}</h1>
                <h2 class="mt-3 mb-5 text-xl"> <i class="fa-solid fa-pencil text-lg"></i> آقای {{ userDatas.name }}</h2>
            </div>
            <div>
                <button class="btn rounded-full ml-5" @click="showModal = true">حذف اطلاعیه</button>
                <router-link class="btn rounded-full" :to="`/EditNotic/${findNotic[0]}`">ویرایش اطلاعیه</router-link>
            </div>
        </div>
        <div class="flex justify-between items-start">
            <div class="w-3/5">
                <img :src="findNotic[1].imgNotic" :alt="findNotic[1].titleNotic" class="rounded-3xl w-full h-520">
                <p class="mt-3 text-xl" v-html="findNotic[1].noticData"></p>
            </div>
            <LikeDisLike :data="findNotic"></LikeDisLike>
        </div>
        <Transition>
            <DeleteNoticModal v-if='showModal' @closeModal="showModal = false" :data="findNotic"></DeleteNoticModal>
        </Transition>
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import LikeDisLike from '../components/LikeDisLike.vue';
import DeleteNoticModal from '../components/DeleteNoticModal.vue';
export default {
    components: {
        LikeDisLike,
        DeleteNoticModal
    },
    setup() {
        let allNotics = inject('allNotics')
        let userDatas = inject('userDatas')
        let route = useRoute()
        let findNotic = computed(() => allNotics.value.find(notic => notic[0] == route.params.notic))

        let showModal = ref(false)
        return {
            findNotic,
            userDatas,
            showModal
        }
    }
}
</script>