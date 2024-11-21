<template>
    <div class="bg-gray-100 w-1/4 p-3 rounded-xl sticky top-3">
        <p class="text-2xl text-center">آیا این مطلب برای شما مفید بود؟</p>
        <div class='flex justify-center gap-5 mt-3 text-2xl'>
            <LoadingSpinner v-if="loadingLike" class="text-green-500"></LoadingSpinner>
            <div v-else class="text-center text-green-500">
                <i class="fa-solid fa-thumbs-up cursor-pointer" @click="submitLike"></i>
                <span class="block">{{ data[1].likes }}</span>
            </div>
            <LoadingSpinner v-if="loadingDisLike" class="text-red-500"></LoadingSpinner>
            <div v-else class="text-center text-red-500">
                <i class="fa-solid fa-thumbs-down cursor-pointer" @click="submitDisLike"></i>
                <span class="block">{{ data[1].dislike }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

export default {
    components: {
        LoadingSpinner
    },
    props: ['data'],
    setup(props) {
        let loadingLike = ref(false)
        let loadingDisLike = ref(false)
        let likes = ref(props.data[1].likes)
        let dislike = ref(props.data[1].dislike)
        function submitLike() {
            likes.value++
            loadingLike.value = true
            fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/notics/${props.data[0]}.json`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    dislike: props.data[1].dislike,
                    likes: likes.value,
                    imgNotic: props.data[1].imgNotic,
                    noticData: props.data[1].noticData,
                    titleNotic: props.data[1].titleNotic,
                })
            })
                .then(res => {
                    if (res.ok) {
                        props.data[1].likes = likes.value
                    } else {
                        throw new Error('خطا')
                    }
                })
                .catch(err => console.log(err))
                .finally(() => loadingLike.value = false)
        }

        function submitDisLike() {
            loadingDisLike.value = true
            dislike.value++
            fetch(`https://payambar-azam-a7b19-default-rtdb.firebaseio.com/notics/${props.data[0]}.json`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    dislike: dislike.value,
                    likes: props.data[1].likes,
                    imgNotic: props.data[1].imgNotic,
                    noticData: props.data[1].noticData,
                    titleNotic: props.data[1].titleNotic,
                })
            })
                .then(res => {
                    if (res.ok) {
                        props.data[1].dislike = dislike.value
                    } else {
                        throw new Error('خطا')
                    }
                })
                .catch(err => alert(err))
                .finally(() => loadingDisLike.value = false)
        }
        return {
            loadingLike,
            loadingDisLike,
            submitLike,
            submitDisLike,
            dislike
        }
    }
}
</script>