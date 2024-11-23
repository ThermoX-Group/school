<template>
    <div class="w-full h-full fixed top-0 z-10">
        <div class="blur w-full h-full" @click="$emit('closeModal')"></div>
        <div class="z-10 w-1/2 fixed right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 bg-base-200 rounded-md p-3">
            <div class="flex justify-between items-center text-2xl">
                <span class="text-3xl cursor-pointer" @click="$emit('closeModal')">x</span>
                <p>ویرایش اطلاعات فرد کادر</p>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-3">
                <div>
                    <label for="name-personnel" class="block mb-2 mr-2">نام فرد</label>
                    <input type="text" id="name-personnel" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="نام فرد را وارد کنید..." v-model="personnelData.name">
                </div>
                <div>
                    <label for="family" class="block mb-2 mr-2">نام و نام خانوادگی فرد</label>
                    <input type="text" id="family" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="نام و نام خانوادگی فرد را وارد کنید..." v-model="personnelData.family">
                </div>
                <div>
                    <label for="rule" class="block mb-2 mr-2">وظیفه فرد مورد نظر</label>
                    <select id="rule" v-model="personnelData.rule"
                        class="w-full rounded-full outline-base-300 p-3 cursor-pointer">
                        <option value="" disabled>وظیفه فرد مورد نظر را انتخاب کنید</option>
                        <option value="معاون">معاون</option>
                        <option value="معلم">معلم</option>
                        <option value="نظافتچی">نظافتچی</option>
                        <option value="سرایدار">سرایدار</option>
                    </select>
                </div>
                <div>
                    <label for="expertise-rule" class="block mb-2 mr-2">وظیفه تخصصی فرد مورد نظر</label>
                    <input type="text" id="expertise-rule" class="rounded-full w-full p-3 outline-gray-300"
                        placeholder="وظیفه تخصصی  فرد را وارد کنید..." v-model="personnelData.expertiserRule">
                </div>
            </div>
            <button
                class="w-full bg-base-100 mt-5 rounded-full p-3 cursor-pointer transition hover:bg-base-300"
                @click="editPersonnel">{{ btnText }}</button>
        </div>
    </div>
</template>

<script>
import { reactive, ref, inject } from 'vue';
export default {
    props: ['data'],
    setup(props, { emit }) {
        let personnelData = reactive({
            name: props.data[1].name,
            family: props.data[1].family,
            rule: props.data[1].rule,
            expertiserRule: props.data[1].expertiserRule
        })

        let getPersonnels = inject('getPersonnels')

        let btnText = ref('ویرایش کردن اطلاعات')

        function editPersonnel() {
            if (!personnelData.name || !personnelData.family || !personnelData.rule || !personnelData.expertiserRule) {
                alert('اطلاعات را درست و کامل وارد کنید')
            } else {
                btnText.value = "درحال ویرایش کردن اطلاعات فرد..."
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/personnels/${props.data[0]}.json`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(personnelData)
                })
                    .then(res => {
                        btnText.value = "ویرایش کردن اطلاعات"
                        emit('closeModal')
                        getPersonnels()
                    })
            }
        }
        return {
            personnelData,
            btnText,
            editPersonnel
        }
    }
}
</script>