<template>
    <div class="bg-gray-100 rounded-2xl h-96 relative">
        <router-link :to="`/TargetNotic/${data[0]}`">
            <img :src="data[1].imgNotic" alt="" class="rounded-xl h-52 w-full">
        </router-link>
        <div class="p-3">
            <h4 class="text-xl font-bold">
                {{ data[1].titleNotic }}
            </h4>
            <p class="text-gray-500 line-clamp-2 mt-2">
                {{ cleanText }}
            </p>
            <div class="flex items-center mt-3 gap-3 absolute bottom-3">
                <i class="fa-solid fa-pencil"></i>
                <h5>آقای {{ userDatas.name }}</h5>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, computed } from 'vue';

export default {
    props: ['data'],
    setup(props) {
        let userDatas = inject('userDatas');

        const cleanText = computed(() => {
            const div = document.createElement('div');
            div.innerHTML = props.data[1].noticData;
            return div.textContent || div.innerText || '';
        });

        return {
            userDatas,
            cleanText
        };
    }
}
</script>
