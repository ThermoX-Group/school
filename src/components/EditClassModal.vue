<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/2 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 rounded-md p-3">
            <div class="flex justify-between items-center text-2xl">
                <span class="text-3xl cursor-pointer" @click="$emit('closeModal')">x</span>
                <p>ویرایش کلاس درس</p>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
                <div>
                    <label for="educational-base" class="block mb-2 mr-2">پایه تحصیلی</label>
                    <input type="number" id="educational-base" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="پایه تحصیلی را وارد کنید..." v-model="datas.classBase">
                </div>
                <div>
                    <label for="name" class="block mb-2 mr-2">نام کلاس</label>
                    <input type="text" id="name" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="نام کلاس را وارد کنید..." v-model="datas.className">
                </div>
            </div>
            <button class="w-full bg-base-100 mt-5 rounded-full p-3 cursor-pointer transition hover:bg-base-300"
                @click="editData">{{ btnText }}</button>
        </div>
    </div>
</template>

<script>
import { inject, reactive, ref } from 'vue';

export default {
    props: ['data'],
    setup(props, { emit }) {
        let getClass = inject('getClass')

        let datas = reactive({
            className: props.data[1].className,
            classBase: props.data[1].classBase
        })

        let btnText = ref('ویرایش کردن کلاس')

        function editData() {
            if (!datas.className || !datas.classBase || isNaN(datas.classBase) || datas.classBase < 10 || datas.classBase > 12) {
                btnText.value = "اطلاعات را درست و کامل وارد کنید!"
            } else {
                btnText.value = 'درحال ویرایش کردن کلاس...'
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/class/${props.data[0]}.json`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(datas)
                })
                    .then(res => {
                        emit('closeModal')
                        getClass()
                    })
                    .catch(err => btnText.value = 'ارتباط با پایگاه داده برقرار نشد!')
                    .finally(() => {
                        setTimeout(() => {
                            btnText.value = 'ویرایش کردن کلاس'
                        }, 3000)
                    })
            }
        }
        return {
            editData,
            datas,
            btnText
        }
    }
}
</script>