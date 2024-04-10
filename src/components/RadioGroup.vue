<script setup>
import { defineProps, watch } from "vue";

const props = defineProps({
    radios: {
        type: Array,
        default: () => [
            {
                text: "开",
                value: "default",
            },
            {
                text: "关",
                value: "close",
            },
        ],
    },
});

const model = defineModel();

const emits = defineEmits(["change"]);

watch(model, (newVal) => {
    emits("change", newVal);
});
</script>

<template>
    <div class="flex justify-center items-center w-fit gap-4">
        <div v-for="(item,idx) in radios"
             :key="idx"
             class="flex justify-center items-center">
            <input v-model="model"
                   :value="item.value"
                   type="radio" />
            <label class="mx-1">{{ item.text }}</label>
        </div>
    </div>
</template>

<style scoped></style>