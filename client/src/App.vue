<template>
    <Main>
        <AreaFilter v-model="section" :fetch="section" />

        <h2 class="app__title">
            עיר: <span class="app__title_span">{{ section }}</span>
        </h2>
        <p class="app__starred">
            * מותאם: מוערך לפי שכירות ממוצעת של שוכרים קיימים באזור
        </p>

        <ListingsContainer v-if="!loading && !error" :posts="posts" />
        <!-- Start of loading animation -->
        <div v-if="loading">
            <p class="app__loading">
                בטעינה...
            </p>
        </div>
        <!-- End of loading animation -->

        <!-- Start of error alert -->
        <div v-if="error">
            <h3 class="app__error">
                {{ error.title }}
            </h3>
            <p class="app__error-message">
                {{ error.message }}
            </p>
        </div>
        <!-- End of error alert -->
    </Main>
</template>

<script>
import axios from 'axios'
import Main from './components/Main.vue'
import AreaFilter from './components/AreaFilter.vue'
import ListingsContainer from './components/ListingsContainer.vue'

export default {
    components: {
        Main,
        AreaFilter,
        ListingsContainer
    },
    data() {
        return {
            section: 'עיר',
            posts: [],
            loading: false,
            error: null,
            areas: []
        }
    },
    areaName() {
        return this.posts.filter(this.areas)
    },

    methods: {
        async fetchListings() {
            try {
                this.error = null
                this.loading = true
                const url = `http://localhost:3000/listings`
                const response = await axios.get(url)
                const results = response.data?.data?.listing
                this.posts = results.map((post) => ({
                    createdOn: post.createdOn,
                    vacancies: post.vacancies,
                    average: post.average,
                    lowest: post.lowest,
                    highest: post.highest,
                    median: post.median,
                    adjusted: post.adjusted,
                    topSQM: post.topSQM,
                    rooms: post.rooms,
                    area: post.area,
                    id: post._id
                }))
                //list of areas for dropdown, reduced
                this.areas = results.reduce((init, final) => {
                    init[final.area] = final
                    return init
                }, {})
            } catch (err) {
                if (err.response) {
                    // client received an error response (5xx, 4xx)
                    this.error = {
                        title: 'Server Response',
                        message: err.message
                    }
                } else if (err.request) {
                    // client never received a response, or request never left
                    this.error = {
                        title: 'Unable to Reach Server',
                        message: err.message
                    }
                } else {
                    // There's probably an error in your code
                    this.error = {
                        title: 'Application Error',
                        message: err.message
                    }
                }
            }
            this.loading = false
        }
    },
    mounted() {
        this.fetchListings()
    }
}
</script>

<style>
#app {
    margin: 0 auto;
    padding: 20px 0;
    align-items: center;
    max-width: 1440px;
    min-width: 320px;
    background-color: #05324f;
    direction: rtl;
}

@media screen and (max-width: 768px) {
    #app {
        max-width: 768px;
    }
}

.app__select {
    border: none;
    margin: 0;
    padding: 0 10px;
    font-size: 1.5em;
    outline: 0;
    border-radius: 5px;
    min-width: 150px;
    direction: rtl;
}

.app__title {
    color: #f7f7f7;
    font-weight: lighter;
    letter-spacing: 1px;
    margin: 0 0 20px 0;
}

.app__title_span {
    color: #f7f7f7;
    font-weight: bold;
}
.app__starred {
    color: rgb(245 173 48);
    margin: 0;
    letter-spacing: 2px;
    width: 260px;
    border-style: dashed;
    border-color: rgb(245 173 48);
    border-width: 1px;
    border-left-style: none;
    border-right-style: none;
}

p.app__starred {
    padding-right: 8px;
    padding-bottom: 5px;
}

.app__error {
    color: white;
}

.app__error-message {
    color: red;
    margin: 0;
    text-align: center;
}

.app__loading {
    color: white;
}
</style>
