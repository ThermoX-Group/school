<template>
    <div class="w-24 h-24 fixed bottom-5 right-5 z-20 rounded-full" @click="activeBtn = !activeBtn">
        <img src="https://secure.gravatar.com/avatar/3b3c0692f559018fd28befadf7ca88ed?s=256&d=mm&r=g"
            class="rounded-full w-full h-full z-20 absolute cursor-pointer transition-all hover:border-base-300 opacity-20 hover:opacity-100"
            alt="" v-if="!userDatas || !userDatas.img">
        <img :src="userDatas.img"
            class="rounded-full w-full h-full z-20 absolute cursor-pointer transition-all hover:border-base-300 opacity-20 hover:opacity-100"
            alt="">
        <router-link to="/">
            <div class="tooltip tooltip-left h-14 w-14 bg-base-300 rounded-full left-1/2 -translate-x-1/2 absolute transition-all duration-300
            cursor-pointer flex justify-center items-center -top-16" data-tip="صفحه اصلی"
                :class="{ 'left-1/2': activeBtn, 'left-48': !activeBtn }">
                <i class="fa-solid fa-home"></i>
            </div>
        </router-link>
        <router-link to="/personnel">
            <div class="tooltip tooltip-left h-14 w-14 bg-base-300 rounded-full left-1/2 -translate-x-1/2 absolute transition-all duration-300 delay-150 cursor-pointer
            flex justify-center items-center -top-32" data-tip="پرسنل مدرسه"
                :class="{ 'left-1/2': activeBtn, 'left-48': !activeBtn }">
                <i class="fa-solid fa-book-open-reader"></i>
            </div>
        </router-link>
        <router-link to="/studentsclass">
            <div class="tooltip tooltip-left h-14 w-14 bg-base-300 rounded-full left-1/2 -translate-x-1/2 absolute transition-all duration-300 delay-300 cursor-pointer
            flex justify-center items-center -top-48" data-tip="کلاس های درس"
                :class="{ 'left-1/2': activeBtn, 'left-48': !activeBtn }">
                <i class="fa-solid fa-chalkboard-user"></i>
            </div>
        </router-link>
        <router-link :to="`/StudentsPage/${'all'}`">
            <div class="tooltip tooltip-left h-14 w-14 bg-base-300 rounded-full left-1/2 -translate-x-1/2 absolute transition-all duration-300 delay-500 cursor-pointer
            flex justify-center items-center -top-64" data-tip="دانش آموزان"
                :class="{ 'left-1/2': activeBtn, 'left-48': !activeBtn }">
                <i class="fa-solid fa-graduation-cap"></i>
            </div>
        </router-link>

        <router-link to="/AddNotic">
            <div class="tooltip tooltip-top h-14 w-14 bg-base-300 rounded-full right-28 absolute transition-all duration-300
            cursor-pointer flex justify-center items-center -translate-y-1/2" data-tip="افزودن اطلاعیه"
                :class="{ 'top-1/2': activeBtn, 'top-48': !activeBtn }">
                <i class="fa-solid fa-plus"></i>
            </div>
        </router-link>
        <router-link to="/AllNotics">
            <div class="tooltip tooltip-top h-14 w-14 bg-base-300 rounded-full right-44 absolute transition-all duration-300 delay-150
            cursor-pointer flex justify-center items-center -translate-y-1/2" data-tip="اطلاعیه ها"
                :class="{ 'top-1/2': activeBtn, 'top-48': !activeBtn }">
                <i class="fa-solid fa-newspaper"></i>
            </div>
        </router-link>
        <router-link to="/EditPage">
            <div class="tooltip tooltip-top h-14 w-14 bg-base-300 rounded-full right-60 absolute transition-all duration-300 delay-300
            cursor-pointer flex justify-center items-center -translate-y-1/2" data-tip="ویرایش اطلاعات کاربری"
                :class="{ 'top-1/2': activeBtn, 'top-48': !activeBtn }">
                <i class="fa-solid fa-pen"></i>
            </div>
        </router-link>
    </div>
</template>

<script>
import { ref, inject } from 'vue';
export default {
    setup() {
        let activeBtn = ref(false)
        let userDatas = inject("userDatas")

        return {
            activeBtn,
            userDatas
        }
    }
}
</script>