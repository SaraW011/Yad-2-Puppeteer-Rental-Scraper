<template>
    <div class="area-filter">
        <!-- Start of select dropdown -->
        <div class="area-filter__wrap">
            <select class="area-filter__select" v-model="section">
                <option
                    v-for="(section, index) in sections"
                    :key="index"
                    :value="section"
                >
                    {{ capitalize(section) }}
                </option>
            </select>
        </div>
        <!-- End of select dropdown -->
        <button class="area-filter__button" @click="fetch">
            חיפוש
        </button>
    </div>
</template>

<script>
import { computed } from 'vue'
import sectionsData from './sections'

export default {
    props: {
        modelValue: String,
        fetch: Function
    },
    setup(props, { emit }) {
        const section = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
        })

        return {
            section
        }
    },
    data() {
        return {
            sections: sectionsData
        }
    },
    methods: {
        capitalize(value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    }
}
</script>

<style>
.area-filter {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.area-filter__select {
    background-color: #f1efef;
    border: none;
    margin: 0;
    font-size: 1.2em;
    outline: 0;
    border-radius: 5px;
    direction: rtl;
    min-width: 100px;
    height: 30px;
}

.area-filter__wrap {
    margin: 10px;
}

.area-filter__button {
    color: #05324f;
    border: 0;
    border-radius: 5px;
    margin: 0;
    max-width: 100px;
    height: 30px;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.15);
}
</style>
