<template>
    <div class="p-5" v-if="findNotic">
        <div class="flex items-cente justify-between">
            <div>
                <h1 class="font-bold">{{ findNotic[1].titleNotic }}</h1>
                <h2 class="mt-3 mb-5 text-xl"> <i class="fa-solid fa-pencil text-lg"></i> {{ userDatas.name }}</h2>
            </div>
            <router-link class="btn rounded-full" :to="`/EditNotic/${findNotic[0]}`">ویرایش اطلاعیه</router-link>
        </div>
        <div class="flex justify-between gap-5 items-start">
            <div class="w-2/3">
                <img :src="findNotic[1].imgNotic" :alt="findNotic[1].titleNotic" class="rounded-3xl">
                <p class="mt-3 text-xl" v-html="findNotic[1].noticData"></p>
            </div>
            <LikeDisLike :data="findNotic"></LikeDisLike>
        </div>
    </div>
</template>

<script>
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import LikeDisLike from '../components/LikeDisLike.vue';
export default {
    components: {
        LikeDisLike,
    },
    setup() {
        let allNotics = inject('allNotics')
        let userDatas = inject('userDatas')
        let route = useRoute()
        let findNotic = computed(() => allNotics.value.find(notic => notic[0] == route.params.notic))


        return {
            findNotic,
            userDatas,
        }
    }
}
</script>