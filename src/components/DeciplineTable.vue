<template>
    <div class="mt-5">
        <div class="flex justify-between items-center">
            <h2 class="text-3xl">وضعیت انضباطی</h2>
            <button class="btn rounded-full" @click="$emit('showAddCase')">ثبت مورد انضباطی</button>
        </div>
        <table class="w-full mt-3 text-center" v-if="filteredDisciplinaryCase != null">
            <tr>
                <th class="w-1/3 pb-2 border-b border-l border-gray-300">دلیل مورد انضباطی</th>
                <th class="w-1/3 pb-2 border-b border-l border-gray-300">توضیحات</th>
                <th class="w-1/3 pb-2 border-b border-gray-300">تاریخ</th>
            </tr>
            <tr>
                <td colspan="3" class="text-center text-2xl pt-2" v-if="filteredDisciplinaryCase.length == 0">موردی ثبت
                    نشده
                    است!
                </td>
            </tr>
            <tr v-for="(item, index) in filteredDisciplinaryCase" :key="index">
                <td class="border-l border-gray-300 p-1 relative"
                    :class="{ 'text-red-500': !item[1].isSolved, 'text-green-500 underline': item[1].isSolved }">{{
                        item[1].type }}
                    <div class="absolute left-10 top-1">
                        <div class="tooltip tooltip-top " data-tip="موجه / غیر موجه">
                            <i class="fa-solid fa-check text-xl ml-2 text-green-500 cursor-pointer"
                                @click="chechedCase(item)"></i>
                        </div>
                        <div class="tooltip tooltip-top" data-tip="حذف مورد انضباطی">
                            <span class=" text-xl fa-solid fa-trash text-red-500 cursor-pointer"
                                @click="$emit('showDeleteModal', item)"></span>
                        </div>
                    </div>
                </td>
                <td class="border-l border-gray-300 p-1" v-if="item[1].des == ''">توضیحات وارد نشده است</td>
                <td class="border-l border-gray-300 p-1" v-else>{{ item[1].des }}</td>
                <td class=" p-1">{{ item[1].date }}</td>
            </tr>
        </table>
        <LoadingSpinner class="text-black fixed bottom-2 left-2 w-10" v-if="loading"></LoadingSpinner>
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import LoadingSpinner from './LoadingSpinner.vue';
export default {
    components: {
        LoadingSpinner
    },
    setup() {
        let disciplinaryCase = inject('disciplinaryCase')

        let route = useRoute()
        let filteredDisciplinaryCase = computed(() => {
            return disciplinaryCase ? disciplinaryCase.value.filter(cases => cases[1].stuId === route.params.stu) : []
        })

        let isSolvedToggle = ref('')
        let loading = ref(false)

        function chechedCase(item) {
            isSolvedToggle.value = !item[1].isSolved;
            loading.value = true
            fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/disciplinaryCase/${item[0]}.json`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    date: item[1].date,
                    stuId: item[1].stuId,
                    type: item[1].type,
                    des: item[1].des,
                    isSolved: isSolvedToggle.value
                })
            })
                .then(res => res.json())
                .then(data => {
                    item[1] = data;
                    isSolvedToggle.value = '';
                    loading.value = false
                })
                .catch(err => {
                    console.error('خطا در به‌روزرسانی مورد انضباطی:', err);
                });



        }
        return {
            disciplinaryCase,
            filteredDisciplinaryCase,
            chechedCase,
            loading
        };
    }
}
</script>