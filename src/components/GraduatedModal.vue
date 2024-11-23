<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/3 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-100 rounded-md p-3">
            <div class="text-2xl">
                <p>فارغ التحصیلی دانش آموز</p>
            </div>
            <p class="my-5">آیا میخواهید این داشن آموز را به فارغ التحصیل کنید؟ </p>
            <div class="grid grid-cols-2 gap-5">
                <button class="btn text-white rounded-full bg-green-500 hover:bg-green-600" @click="graduatedFunc">{{
                    btnText }}</button>
                <button class="btn text-white rounded-full bg-red-500 hover:bg-red-600"
                    @click="$emit('closeModal')">خیر</button>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, ref } from 'vue';

export default {
    props: ["data"],
    setup(props,{emit}) {
        let btnText = ref("بله")
        let isGraduated = ref(props.data[1].isGraduated)
        let getStudents=inject('getStudents')

        function graduatedFunc() {
            isGraduated.value = true
            btnText.value = "درحال فارغ التحصیل کردن..."
            fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/students/${props.data[0]}.json`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ isGraduated: isGraduated.value })
            })
                .then(res => {
                    emit("closeModal")
                    getStudents()
                })
        }

        return {
            btnText,
            graduatedFunc
        }
    }
}
</script>