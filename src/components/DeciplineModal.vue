<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/2 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 rounded-md p-3">
            <div class="flex justify-between items-center text-2xl">
                <span class="text-3xl cursor-pointer" @click="$emit('closeModal')">x</span>
                <p>ثبت مورد انضباطی</p>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
                <div>
                    <label for="type" class="block mb-2 mr-2">نوع مورد انضباطی</label>
                    <select id="type" class="w-full rounded-full outline-gray-300 p-3 cursor-pointer"
                        v-model="selectType">
                        <option value="" disabled>نوع مورد را انتخاب کنید</option>
                        <option :value="item" v-for="item in deciplineTypes">{{ item }}</option>
                    </select>
                </div>
                <div>
                    <label for="des" class="block mb-2 mr-2">توضیحات</label>
                    <input type="text" id="des" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="توضیحات را وارد کنید..." v-model="desValue">
                </div>
            </div>
            <button class="w-full bg-base-100 mt-5 rounded-full p-3 cursor-pointer transition hover:bg-base-200"
                @click="addDecipline">{{
                    btnText }}</button>
        </div>
    </div>
</template>

<script>
import { inject, ref, reactive } from 'vue';
export default {
    props: ['data'],
    setup(props, { emit }) {
        let deciplineTypes = ['غیبت', 'دعوا', 'آوردن وسایل غیر آموزشی', 'فحاشی']
        let selectType = ref('')
        let desValue = ref('')
        let btnText = ref("ثبت مورد انضباطی")
        let getDisciplinaryCases = inject('getDisciplinaryCases')

        let today = ref(new Date().toLocaleDateString('fa-IR'));

        function addDecipline() {
            if (!selectType.value) {
                alert('لطفا نوع مورد انضباطی را وارد کنید!')
            } else {
                btnText.value = "درحال ثبت مورد انضباطی..."
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/disciplinaryCase.json`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ type: selectType.value, des: desValue.value, stuId: props.data[0], isSolved: false, date: today.value })
                })
                    .then(res => {
                        emit('closeModal')
                        getDisciplinaryCases()
                    })
                    .catch(err => btnText.value = "مورد انضباطی ثبت نشد!")
            }
        }
        return {
            deciplineTypes,
            selectType,
            desValue,
            btnText,
            addDecipline
        }
    }
}
</script>