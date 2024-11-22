<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/3 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-md p-3">
            <div class="text-2xl">
                <p>ارتقای دانش آموز</p>
            </div>
            <p class="my-5">آیا میخواهید این داشن آموز را به کلاس بالاتر ارتقا دهید؟</p>
            <div class="grid grid-cols-2 gap-5">
                <button class="btn text-white rounded-full bg-green-500 hover:bg-green-600" @click="upgradeStuFunc">{{
                    btnText }}</button>
                <button class="btn text-white rounded-full bg-red-500 hover:bg-red-600"
                    @click="$emit('closeModal')">خیر</button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, inject, ref } from 'vue';

export default {
    props: ['data'],
    setup(props, { emit }) {
        let allClass = inject('allClass');
        let getStudents = inject('getStudents')

        let btnText = ref('بله');
        let classStu = ref(props.data[1].classStu.split(' '));
        let upgradedClass = ref('');

        let isIncludeClass = computed(() => {
            let findClass = allClass.value.some(classStu => {
                let joinCLass = classStu[1].classBase + " " + classStu[1].className
                return joinCLass == upgradedClass.value
            })
            return findClass
        })
        function upgradedStuMethod() {
            fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/students/${props.data[0]}.json`, {
                method: "PATCH",
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({ classStu: upgradedClass.value }),
            })
                .then(res => {
                    emit("closeModal");
                    getStudents()
                })
        }
        function upgradeStuFunc() {
            if (classStu.value[0] < 12) {
                classStu.value[0]++;
                upgradedClass.value = classStu.value.join(" ");
            }
            if (!isIncludeClass.value) {
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/class.json`, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify({
                        className: classStu.value[1],
                        classBase: classStu.value[0]++
                    })
                }).then(res => {
                    upgradedStuMethod()
                })
            } else {
                upgradedStuMethod()
            }
        }

        return {
            btnText,
            upgradeStuFunc,
        };
    },
};
</script>