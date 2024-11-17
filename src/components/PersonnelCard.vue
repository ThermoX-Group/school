<template>
    <div
        class="border shadow-md rounded-md p-8 text-center transition overflow-hidden relative hover:shadow-xl hover:-translate-y-0.5">
        <h4>آقای {{ data[1].name }} {{ data[1].family }}</h4>
        <div class="absolute left-3">
            <div class="tooltip tooltip-right cursor-pointer w-fit" data-tip="حذف">
                <i class="fa-solid fa-trash ml-3" @click="deleteMode = true"></i>
            </div>
            <div class="tooltip tooltip-right cursor-pointer w-fit" data-tip="ویرایش اطلاعات">
                <i class="fa-solid fa-pen cursor-pointer" @click="$emit('openEditModal')"></i>
            </div>
        </div>
        <div class="text-lack flex flex-col absolute w-1/2 right-3 rounded-md transition-all duration-300 px-3 py-1 border"
            :class="{ '-bottom-20': !deleteMode, 'bottom-1': deleteMode }" id="delete-box">
            <button class="w-full text-right mb-1" @click="deletePersonnel">{{ deleteBtnText }}</button>
            <button class="w-full text-right" @click="deleteMode = false">لغو</button>
        </div>
        <p class="absolute right-3 bottom-3 text-gray-500">{{ data[1].expertiserRule }}</p>
    </div>
</template>

<script>
import { ref,inject } from 'vue';
export default {
    props: ['data'],
    setup(props) {
        let deleteMode = ref(false)
        let getPersonnels = inject('getPersonnels')

        let deleteBtnText = ref('حذف فرد مورد نظر')
        function deletePersonnel() {
            deleteBtnText.value="درحال حذف کردن..."
            fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/personnels/${props.data[0]}.json`,{
                method:"DELETE"
            })
            .then(res=>{
                // alert(5)
                getPersonnels()
            })
        }
        return {
            deleteMode,
            deleteBtnText,
            deletePersonnel
        }
    }
}
</script>