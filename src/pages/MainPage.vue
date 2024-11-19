<template>
    <div class="p-5 overflow-hidden">
        <h1 class="text-5xl font-bold">صفحه اصلی</h1>
        <MainBanner></MainBanner>
        <div data-aos="fade-up" class="mt-10">
            <h2 class="mb-1">اطلاعیه ها</h2>
            <swiper :slidesPerView="4" :spaceBetween="30" class="mySwiper">
                <swiper-slide v-for="item in allNotics" :key="item[0]">
                    <NoticCards :data="item"></NoticCards>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script>
import { inject, ref } from 'vue';
import MainBanner from '../components/MainBanner.vue';
import NoticCards from '../components/NoticCards.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

export default {
    components: {
        MainBanner,
        NoticCards,
        Swiper,
        SwiperSlide,
    },
    setup() {
        let allNotics = inject('allNotics')

        return {
            allNotics,
        }
    }
}
</script>