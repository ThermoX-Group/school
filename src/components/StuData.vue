<template>
    <div class="flex items-center mt-5">
        <div class="text-2xl border border-gray-400 w-1/4 h-520 flex justify-center items-center rounded-3xl"
            v-if="!data[1].imgStu">
            <p>دانش آموز عکس ندارد!</p>
        </div>
        <img :src=data[1].imgStu :alt=data[1].nameStu class="w-1/4 h-520 rounded-3xl" v-else>
        <ul class="absolute left-1/2 -translate-x-1/2 text-2xl leading-9">
            <li>
                <h4 class="inline-block text-gray-600">نام دانش آموز : </h4> {{ data[1].nameStu }}
            </li>
            <li>
                <h4 class="inline-block text-gray-600">نام خانوادگی دانش آموز : </h4> {{ data[1].familyStu }}
            </li>
            <li>
                <h4 class="inline-block text-gray-600">نام پدر دانش آموز : </h4> {{ data[1].fatherName }}
            </li>
            <li>
                <h4 class="inline-block text-gray-600">کد ملی دانش آموز : </h4> {{ formatingCodeStu }}
            </li>
        </ul>
    </div>
</template>

<script>
import { computed } from 'vue';
export default {
    props: ['data'],
    setup(props) {
        let formatingCodeStu = computed(() => {
            const codeStudent = props.data[1].codeStu
            const firstTwoCodes = String(codeStudent).slice(0, 2)
            const moreCodes = String(codeStudent).slice(2)
            return `${firstTwoCodes}-${moreCodes}`
        })
        return {
            formatingCodeStu
        }
    }
}
</script>