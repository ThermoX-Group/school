<template>
    <div class="p-5">
        <h1 class="font-bold text-4xl">ویرایش اطلاعیه</h1>
        <TextEditorEdit :data="findNotic"></TextEditorEdit>
    </div>
</template>

<script>
import { computed, inject } from 'vue';
import { useRoute } from 'vue-router';
import TextEditorEdit from '../components/TextEditorEdit.vue';


export default {
    components: {
        TextEditorEdit
    },
    setup() {
        let allNotics = inject('allNotics')
        let route = useRoute()
        let findNotic = computed(() => allNotics.value.find(notic => notic[0] == route.params.notic))
        return {
            findNotic
        }
    }
}
</script>