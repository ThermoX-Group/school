<template>
    <div class=" flx w-48 fixed flex-col transition-all rounded-2xl">
        <div class="z-10 absolute bg-gray-100 w-full bottom-0 p-2 rounded-2xl">
            <p class="hover:bg-gray-200 transition p-2 rounded-xl cursor-pointer" @click="$emit('closeContext')">salam
            </p>
            <p class="hover:bg-gray-200 transition p-2 rounded-xl cursor-pointer" @click="$emit('closeContext')">salam
            </p>
            <p class="hover:bg-gray-200 transition p-2 rounded-xl cursor-pointer" @click="$emit('closeContext')">
                salam</p>
        </div>
    </div>
</template>