<template>
    <div class="mt-5">
        <div class="grid grid-cols-2 gap-5">
            <input type="text" id="img-notic"
                class="w-full my-3 rounded-full border border-gray-300 p-3 outline-gray-400"
                placeholder="لینک پوستر را وارد کنید..." v-model="imgNotic">
            <input type="text" id="title-notic"
                class="w-full my-3 rounded-full border border-gray-300 p-3 outline-gray-400"
                placeholder=" عنوان اطلاعیه را وارد کنید..." v-model="titleNotic">
        </div>
        <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
        <button class="btn rounded-full w-full mt-3" @click="addNoticHandler">{{ btnText }}</button>
        <AlertBox :class="[alertBg, { '-right-96': !showAlert, 'right-3': showAlert }]">{{ alertText }}
        </AlertBox>
    </div>
</template>

<script>
import { ref } from 'vue';
import AlertBox from "./AlertBox.vue"
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading } from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

export default {
    name: 'app',
    components: {
        AlertBox
    },
    setup() {
        const editor = ref(ClassicEditor);
        const editorData = ref('');

        const editorConfig = ref({
            language: { ui: 'fa', content: 'fa' },
            plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading],
            toolbar: ['undo', 'redo', '|', 'bold', 'italic', 'heading'],
            heading: {
                options: [
                    { model: 'heading1', view: 'h1', title: 'عنوان 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'عنوان 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'عنوان 3', class: 'ck-heading_heading3' },
                    { model: 'paragraph', title: 'پاراگراف', class: 'ck-heading_paragraph' },
                ]
            },
        });
        let imgNotic = ref('')
        let titleNotic = ref('')
        let btnText = ref('اضافه کردن اطلاعیه')

        let showAlert = ref(false)
        let alertText = ref('')
        let alertBg = ref('')

        function hideModal() {
            setTimeout(() => {
                showAlert.value = false
                alertBg.value = ""
            }, 5000)
        }
        function addNoticHandler() {
            if (!editorData.value || !imgNotic.value || !titleNotic.value) {
                alertText.value = "محتوا را درست و کامل وارد کنید"
                showAlert.value = true
                alertBg.value = "bg-red-500"
                hideModal()
            } else {
                btnText.value = "درحال اضافه کردن اطلاعیه..."
                fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/notics.json`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        noticData: editorData.value,
                        imgNotic: imgNotic.value,
                        titleNotic: titleNotic.value
                    })
                })
                    .then(res => {
                        btnText.value = "اضافه کردن اطلاعیه"
                        alertText.value = "اطلاعیه اضافه شد!"
                        showAlert.value = true
                        alertBg.value = "bg-green-500"
                    })
                    .finally(() => {
                        hideModal()
                        editorData.value = ""
                        imgNotic.value = ""
                        titleNotic.value = ""
                    })
            }
        }
        return {
            editor,
            editorData,
            editorConfig,
            imgNotic,
            titleNotic,
            btnText,
            addNoticHandler,
            showAlert,
            alertText,
            alertBg
        };
    }
};
</script>
