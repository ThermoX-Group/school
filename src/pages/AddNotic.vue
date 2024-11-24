<template>
    <div class="p-5">
        <Teleport to="title">PayambarAzam | افزودن اطلاعیه</Teleport>
        <h1 class="text-4xl font-bold">افزودن اطلاعیه</h1>
        <TextEditorAdd></TextEditorAdd>
    </div>
</template>

<script>
import TextEditorAdd from '../components/TextEditorAdd.vue';

export default {
    components: {
        TextEditorAdd
    },
    setup() {
        return {

        }
    }
}
</script>