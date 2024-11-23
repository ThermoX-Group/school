<template>
    <div class="p-5">
        <div class="flex justify-between items-ceter">
            <h1 class="text-4xl font-bold">کلاس های درس</h1>
            <input type="search" class="border-2 w-8/12 rounded-full p-3 outline-gray-300 h-12"
                placeholder="جست و جو کردن کلاس" v-model="searchValue">
            <button class="btn rounded-full outline-none" @click="showAddClass = true">اضافه کردن کلاس درسی</button>
        </div>
        <transition-group class="grid grid-cols-4 gap-5 mt-5" tag="div">
            <ClassCard v-for="item in searchedClass" :key="item[0]" :data="item"
                @openEditModal="openEditModalFunc(item)">
            </ClassCard>
        </transition-group>
        <Transition>
            <ClassModal v-if="showAddClass" @closeModal="showAddClass = false"></ClassModal>
        </Transition>
        <Transition>
            <EditClassModal v-if="showEditClass" :data="targetClass" @closeModal="showEditClass = false"></EditClassModal>
        </Transition>
    </div>
</template>

<script>
import { ref, inject, computed } from 'vue';
import ClassModal from "../components/ClassModal.vue"
import ClassCard from "../components/ClassCard.vue"
import EditClassModal from '../components/EditClassModal.vue';

export default {
    components: {
        ClassModal,
        ClassCard,
        EditClassModal
    },
    setup() {
        let showAddClass = ref(false)

        let showEditClass = ref(false)
        let allClass = inject('allClass')
        let searchValue = ref('')

        let searchedClass = computed(() => {
            let filteredClasses = allClass.value ? allClass.value.filter(myClass => {
                const fullClassName = `${myClass[1].classBase} ${myClass[1].className}`;
                return fullClassName.includes(searchValue.value.trim());
            }) : [];

            return filteredClasses.sort((a, b) => {
                return a[1].className.localeCompare(b[1].className, 'fa');
            });
        });

        let targetClass = ref('')

        function openEditModalFunc(data) {
            targetClass.value = data
            showEditClass.value = true
        }

        return {
            showAddClass,
            showEditClass,
            allClass,
            searchValue,
            searchedClass,
            openEditModalFunc,
            targetClass
        }
    }
}
</script>

<style>
.v-enter-active,
.v-leave-active {
    transition: all .3s;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>