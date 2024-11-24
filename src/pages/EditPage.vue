<template>
    <div class="p-5">
        <Teleport to="title">PayambarAzam | ویرایش پروفایل</Teleport>
        <h1 class="text-4xl font-bold">ویرایش پروفایل کاربر</h1>
        <div class="grid grid-cols-3 mt-5 gap-5">
            <div>
                <label for="name" class="block text-2xl">نام مدیر مدرسه</label>
                <input type="text" id=""
                    class="border-2 border-base-200 rounded-full p-3 outline-base-300 w-full mt-2"
                    placeholder="نام مدیر..." v-model="datas.name">
            </div>
            <div>
                <label for="name" class="block text-2xl">ایمیل مدیر مدرسه</label>
                <input type="text" id=""
                    class="border-2 border-base-200 rounded-full p-3 outline-base-300 w-full mt-2"
                    placeholder="ایمیل مدیر..." v-model="datas.email">
            </div>
            <div>
                <label for="name" class="block text-2xl">عکس مدیر مدرسه</label>
                <input type="text" id=""
                    class="border-2 border-base-200 rounded-full p-3 outline-base-300 w-full mt-2"
                    placeholder="عکس مدیر..." v-model="datas.img">
            </div>
        </div>
        <button class="btn w-full bg-base-300 rounded-full p-3 mt-5 transition hover:bg-base-400 border-none"
            @click="updateDatas()">{{ btnText }}</button>
            <p v-if="showText" class="text-center text-3xl mt-5">{{ updateText }}</p>
    </div>
</template>

<script>
import { inject, reactive, watch, ref } from 'vue';
export default {
    setup() {
        let userDatas = inject("userDatas")
        let getUserDatas = inject("getUserDatas")

        let datas = reactive({
            name: userDatas.value.name,
            email: userDatas.value.email,
            img: userDatas.value.img
        })

        let btnText = ref("ویرایش اطلاعات")
        let updateText = ref('')
        let showText = ref(false)

        watch(userDatas, () => {
            datas.name = userDatas.value.name
            datas.email = userDatas.value.email,
                datas.img = userDatas.value.img
        })
        function hideText() {
            setTimeout(() => {
                showText.value = false
            }, 3000)
        }
        function updateDatas() {
            if (!datas.name || !datas.email) {
                showText.value = true
                updateText.value = "لطفا فیلد هارا درست و کامل پر کنید!"
                hideText()
            } else {
                btnText.value = "درحال بروزرسانی..."
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/user/-OBaUdCZ2cz21J1umrlj.json`, {
                    method: "PUT",
                    headers: {
                        'content-header': "application/json"
                    },
                    body: JSON.stringify(datas)
                })
                    .then(res => {
                        showText.value = true
                        btnText.value = "ویرایش اطلاعات"
                        updateText.value = "اطلاعات شما بروز شد!"
                        getUserDatas()
                    })
                    .catch(err => {
                        showText.value = true
                        updateText.value = "خطا در برقراری ارتباط با سرور!"
                    }).finally(() => hideText())
            }
        }
        return {
            datas,
            btnText,
            updateDatas,
            updateText,
            showText,
        }
    }
}
</script>