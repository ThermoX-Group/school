<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/2 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 rounded-md p-3">
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
                @click="addStudent()">{{ btnText }}</button>
        </div>
    </div>
</template>

<script>
import { inject, reactive, ref } from 'vue';
export default {
    props: ['class'],
    setup(props, { emit }) {
        let studentDatas = reactive({
            nameStu: "",
            familyStu: "",
            classStu: props.class,
            codeStu: '',
            fatherName: '',
            imgStu: '',
            disciplineStatus: ['empty']
        })
        let btnText = ref("اضافه کردن دانش آموز")

        let allClass = inject('allClass')
        let getStudents = inject('getStudents')

        function addStudent() {
            if (!studentDatas.nameStu || !studentDatas.classStu || !studentDatas.codeStu || !studentDatas.fatherName) {
                emit("showAlertError")
            } else {
                btnText.value = "درحال اضافه کردن دانش آموز..."
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/students.json`, {
                    method: "POST",
                    headers: {
                        'content-type': "application/json"
                    },
                    body: JSON.stringify(studentDatas)
                })
                    .then(res => {
                        emit("showAlertSuccess")
                        emit('closeModal')
                        getStudents()
                    })
            }
        }
        return {
            addStudent,
            studentDatas,
            btnText,
            allClass
        }
    }
}

</script>
