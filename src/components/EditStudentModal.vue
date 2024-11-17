<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/2 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-300 rounded-md p-3">
            <div class="flex justify-between items-center text-2xl">
                <span class="text-3xl cursor-pointer" @click="$emit('closeModal')">x</span>
                <p>افزودن دانش آموز</p>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
                <div>
                    <label for="stu-name" class="block mb-2 mr-2">نام دانش آموز</label>
                    <input type="text" id="stu-name" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder=" نام دانش آموز را وارد کنید..." v-model="studentDatas.nameStu">
                </div>
                <div>
                    <label for="family" class="block mb-2 mr-2">نام خانوادگی دانش آموز</label>
                    <input type="text" id="family" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder=" نام خانوادگی دانش آموز را وارد کنید..." v-model="studentDatas.familyStu">
                </div>
                <div>
                    <label for="code" class="block mb-2 mr-2">کدملی دانش آموز</label>
                    <input type="number" id="code" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="کدملی دانش آموز  را وارد کنید..." v-model="studentDatas.codeStu">
                </div>
                <div>
                    <label for="father-name" class="block mb-2 mr-2">نام پدر دانش آموز</label>
                    <input type="text" id="father-name" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="نام پدر دانش آموز  را وارد کنید..." v-model="studentDatas.fatherName">
                </div>
            </div>
            <div>
                <label for="img" class="block my-2 mr-2">عکس دانش آموز</label>
                <input type="text" id="img" class="rounded-full w-full p-3 outline-gray-300"
                    placeholder=" عکس دانش آموز  را وارد کنید..." v-model="studentDatas.imgStu">
            </div>
            <button class="w-full bg-base-100 mt-5 rounded-full p-3 cursor-pointer transition hover:bg-base-200"
                @click="editData()">{{
                    btnText }}</button>
        </div>
    </div>
</template>

<script>
import { reactive, ref, inject } from 'vue';
export default {
    props: ['data'],
    setup(props, { emit }) {
        let getStudents = inject('getStudents')
        let studentDatas = reactive({
            nameStu: props.data[1].nameStu,
            familyStu: props.data[1].familyStu,
            classStu: props.data[1].classStu,
            codeStu: props.data[1].codeStu,
            fatherName: props.data[1].fatherName,
            imgStu: props.data[1].imgStu,
            disciplineStatus: props.data[1].disciplineStatus
        })
        let btnText = ref("ویرایش اطلاعات دانش آموز")
        function editData() {
            if (!studentDatas.nameStu || !studentDatas.classStu || !studentDatas.codeStu || !studentDatas.fatherName) {
                emit('showAlertError')
            } else {
                btnText.value = "درحال ویرایش اطلاعات..."
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/students/${props.data[0]}.json`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(studentDatas)
                })
                    .then(res => {
                        emit("editSuccess")
                        btnText.value = "ویرایش اطلاعات دانش آموز"
                        getStudents()
                        emit('closeModal')
                    })
            }
        }

        return {
            studentDatas,
            btnText,
            editData
        }
    }
}
</script>