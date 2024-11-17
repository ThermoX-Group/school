<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/2 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-300 rounded-md p-3">
            <div class="flex justify-between items-center text-2xl">
                <span class="text-3xl cursor-pointer" @click="$emit('closeModal')">x</span>
                <p>افزودن کلاس درس</p>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
                <div>
                    <label for="educational-base" class="block mb-2 mr-2">پایه تحصیلی</label>
                    <input type="number" id="educational-base" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="پایه تحصیلی را وارد کنید..." v-model="classData.classBase" @paste.prevent
                        @keydown.{keyAlias}.enter="addClass()">
                </div>
                <div>
                    <label for="name" class="block mb-2 mr-2">نام کلاس</label>
                    <input type="text" id="name" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="نام کلاس را وارد کنید..." v-model="classData.className"
                        @keydown.{keyAlias}.enter="addClass()">
                </div>
            </div>
            <button class="w-full bg-base-100 mt-5 rounded-full p-3 cursor-pointer transition hover:bg-base-200"
                @click="addClass">{{
                    btnText }}</button>
        </div>
    </div>
</template>

<script>
import { ref, reactive, inject } from 'vue';
export default {
    setup(_, { emit }) {
        let btnText = ref("اضافه کردن کلاس")
        let getClass = inject("getClass")

        let classData = reactive({
            className: '',
            classBase: ''
        })

        function addClass() {
            if (!classData.classBase || !classData.className || classData.classBase < 10 || classData.classBase > 12 || isNaN(classData.classBase)) {
                btnText.value = "اطلاعات را درست و کامل وارد کنید!"
            } else {
                btnText.value = "درحال اضافه کردن کلاس..."
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/class.json`, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify(classData)
                })
                    .then(res => {
                        classData.className = ''
                        classData.classBase = ''
                        emit('closeModal')
                        getClass()
                    })
                    .catch(err => btnText.value = 'ارتباط با سرور برقرار نشد!')
                    .finally(() => {
                        setTimeout(() => {
                            btnText.value = "اضافه کردن کلاس"
                        }, 3000)
                    })
            }
        }

        return {
            btnText,
            addClass,
            classData
        }
    }
}
</script>


<style>
.blur {
    background-color: rgba(5, 5, 5, 0.2)
}
</style>