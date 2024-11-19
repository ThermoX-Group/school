<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/3 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 rounded-md p-3">
            <div class="text-2xl">
                <p>حذف مورد انضباطی</p>
            </div>
            <p class="my-5">آیا میخواهید که این مورد انضباطی را حذف کنید؟</p>
            <div class="grid grid-cols-2 gap-5">
                <button class="btn text-white rounded-full bg-green-500 hover:bg-green-600"
                    @click="deleteDesciplineCase">{{ btnText }}</button>
                <button class="btn text-white rounded-full bg-red-500 hover:bg-red-600"
                    @click="$emit('closeModal')">خیر</button>
            </div>
        </div>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
export default {
    props: ['data'],
    setup(props, { emit }) {
        let btnText = ref("بله")
        let getDisciplinaryCases = inject('getDisciplinaryCases')

        function deleteDesciplineCase(item) {
            btnText.value="درحال حذف کردن..."
            fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/disciplinaryCase/${props.data[0]}.json`, {
                method: "DELETE"
            })
                .then(res => {
                    getDisciplinaryCases()
                    emit('closeModal')
                })
        }
        return {
            btnText,
            deleteDesciplineCase
        }
    }
}
</script>