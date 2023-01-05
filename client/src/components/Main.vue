<template>
    <Header />
    <main class="main">
        <slot />
    </main>
    <Footer />
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
    components: {
        Header,
        Footer
    }
}
</script>

<style>
.main {
    width: 95%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 768 */
@media screen and (max-width: 768px) {
    .main {
        max-width: 768px;
    }
}

@media screen and (max-width: 520px) {
    .main {
        max-width: 520px;
    }
}

@media screen and (max-width: 320px) {
    .main {
        max-width: 320px;
    }
}
</style>
