<template>
    <ul class="menu bg-base-300 rounded-full h-90% fixed right-5 top-1/2 -translate-y-1/2 w-5% py-3">
        <li>
            <router-link to="/" class="tooltip tooltip-left" data-tip="صفحه اصلی">
                <i class="fa-solid fa-home"></i>
            </router-link>
        </li>
        <li>
            <router-link class="tooltip tooltip-left" data-tip="پرسنل مدرسه">
                <i class="fa-solid fa-book-open-reader"></i>
            </router-link>
        </li>
        <li>
            <a class="tooltip tooltip-left" data-tip="Stats">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    setup() {
        return {

        }
    }
}
</script>