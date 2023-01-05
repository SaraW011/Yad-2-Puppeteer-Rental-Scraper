<template>
    <div>
        <Listings v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
</template>

<script>
import Listings from './Listings.vue'
export default {
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: {
        Listings
    }
}
</script>
