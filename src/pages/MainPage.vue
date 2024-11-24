<template>
    <div class="p-5 pb-0 overflow-hidden relative">
        <Teleport to="title">PayambarAzam | صفحه اصلی</Teleport>
        <h1 class="text-5xl font-bold">صفحه اصلی</h1>
        <MainBanner></MainBanner>
        <div data-aos="fade-up" class="mt-10">
            <h2 class="mb-1">اطلاعیه ها</h2>
            <swiper :slidesPerView="4" :spaceBetween="30" class="mySwiper mb-10">
                <swiper-slide v-for="item in lastNotics" :key="item[0]">
                    <NoticCards :data="item"></NoticCards>
                </swiper-slide>
            </swiper>
        </div>
        <MainFooter></MainFooter>
    </div>
</template>

<script>
import { computed, inject } from 'vue';
import MainBanner from '../components/MainBanner.vue';
import MainFooter from '../components/MainFooter.vue';
import NoticCards from '../components/NoticCards.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

export default {
    components: {
        MainBanner,
        NoticCards,
        Swiper,
        SwiperSlide,
        MainFooter
    },
    setup() {
        let allNotics = inject('allNotics')
        let lastNotics = computed(() => allNotics.value.slice(-10))

        return {
            allNotics,
            lastNotics
        }
    }
}
</script>