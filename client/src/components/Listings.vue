<template>
    <section class="listings">
        <h2 class="listings__date">{{ post.createdOn.split('T')[0] }}</h2>

        <h3 class="listings__title">
            <span class="listings__vacant"> {{ post.rooms }}</span> חדרים
            ב{{ post.area }}, 
            
             <span class="listings__vacant"> {{ post.vacancies }}</span>  דירות להשכרה
        </h3>

        <p class="listings__info">מחיר בש"ח למקסימום {{ post.topSQM }} מ"ר</p>

        <ul class="listings__list">
            <li class="listings__element">
                מְמוּצָע:
                <span class="listings__number">{{ post.average }}</span>
            </li>

            <li class="listings__element">
                חֲצִיוֹן:
                <span class="listings__number">{{ post.median }}</span>
            </li>

            <li class="listings__element">
                מוּתאָם:*
                <span class="listings__number"> {{ post.adjusted }}</span>
            </li>

            <li class="listings__element">
                הֲכִי נָמוּך:
                <span class="listings__number"> {{ post.lowest }}</span>
            </li>

            <li class="listings__element">
                הֲכִי גָבוֹהַ:
                <span class="listings__number"> {{ post.highest }}</span>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    },
    methods: {}
}
</script>
<style>
.listings {
    background-color: #f7f7f7;
    border-radius: 16px;
    margin: 10px 0;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
    min-width:288px;
}

.listings__date {
    text-align: left;
    font-weight: lighter;
    font-size: 0.9em;
    margin: 0;
    padding: 10px 15px;
    color: #6d6d6d;
}

.listings__title {
    text-align: center;
    font-weight: lighter;
    margin: 0;
    padding: 0 15px 10px;
}

.listings__info {
    color: #f27127;
    margin: 0 30px;
    font-size: 14px;
}

.listings__list {
    margin: 0 40px;
    padding: 0;
}

.listings__element {
    list-style: none;
    margin-top: 10px;
    font-weight: lighter;
    color: #2c2c2c;
    padding: 0;
    letter-spacing: 1px;
}

.listings__element:last-child {
    padding-bottom: 15px;
}

.listings__number {
    margin-left: 5px;
}

.listings__vacant {
    font-weight: bolder;
}
</style>
