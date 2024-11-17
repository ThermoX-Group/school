<template>
    <div
        class="border shadow-md rounded-md p-8 text-center transition overflow-hidden relative hover:shadow-xl hover:-translate-y-0.5">
        <router-link :to='`/targetClass/${data[1].classBase + " " + data[1].className}`'>
            <h4> {{ data[1].classBase }} {{ data[1].className }}</h4>
        </router-link>
        <div class="absolute left-3">
            <i class="fa-solid fa-trash ml-3 cursor-pointer" @click="deleteMode = true"></i>
            <i class="fa-solid fa-pen cursor-pointer" @click="$emit('openEditModal')"></i>
        </div>
        <div class="text-lack flex flex-col absolute w-1/2 right-3 rounded-md transition-all duration-300 px-3 py-1 border"
            :class="{ '-bottom-20': !deleteMode, 'bottom-1': deleteMode }" id="delete-box">
            <button class="w-full text-right mb-1" @click="deleteClass">{{ deleteBtnText }}</button>
            <button class="w-full text-right" @click="deleteMode = false">لغو</button>
        </div>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
export default {
    props: ['data'],
    setup(props) {
        let deleteMode = ref(false)
        let getClass = inject('getClass')

        let deleteBtnText = ref('حذف کلاس')
        function deleteClass() {
            deleteBtnText.value = "درحال حذف کردن..."
            fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/class/${props.data[0]}.json`, {
                method: "DELETE"
            })
                .then(res => {
                    getClass()
                })
                .catch(err => console.log(err)
                )
        }
        return {
            deleteMode,
            deleteClass,
            deleteBtnText
        }
    }
}
</script>

<style>
#delete-box {
    backdrop-filter: blur(5px) saturate(180%);
    background-color: rgba(5, 5, 5, 0.06);
}
</style>