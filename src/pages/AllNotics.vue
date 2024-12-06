<template>
    <div class="p-5">
        <Teleport to="title">| اطلاعیه ها </Teleport>

        <div class="flex justify-between mb-2">
            <h1 class="font-bold">اطلاعیه ها</h1>
            <input type="search" id="search-notic"
                class="border-2 border-gray-300 w-5/6 rounded-full p-3 outline-gray-400"
                placeholder="جست و جوی اطلاعیه ها..." v-model="searchValue">
            </div>
            <h2 class="mb-5 text-lg">تعداد اطلاعیه ها : {{ filteredNotics.length }} اطلاعیه</h2>
        <TransitionGroup tag="div" class="grid grid-cols-4 gap-5">
            <NoticCards v-for="item in filteredNotics" :data="item" :key="item[0]"></NoticCards>
        </TransitionGroup>
    </div>
</template>

<script>
import { ref, inject, computed } from 'vue';
import NoticCards from "../components/NoticCards.vue"
export default {
    components: {
        NoticCards
    },
    setup() {
        let allNotics = inject('allNotics')
        let searchValue = ref('')
        let filteredNotics = computed(() => {
            if (!searchValue.value) {
                return allNotics.value
            } else {
                return allNotics.value.filter(notic => notic[1].titleNotic.includes(searchValue.value))
            }
        })
        return {
            allNotics,
            searchValue,
            filteredNotics
        }
    }
}
</script>