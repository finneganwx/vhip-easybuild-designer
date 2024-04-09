<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    btns: {
        type: Array,
        default: () => [
            {
                icon: "fa-solid fa-minus",
                click: () => {
                    alert("button 1");
                },
            },
            {
                text: "100%",
                click: () => {
                    alert("button 1");
                },
            },
            {
                icon: "fa-solid fa-plus",
                click: () => {
                    alert("button 2");
                },
            },
        ],
    },
});
</script>

<template>
    <div class=" rounded-md flex overflow-hidden divide-x">
        <button class="border p-2 text-[13px] bg-[#86B837] hover:bg-[#C5E763] text-white hover:text-gray-600"
                v-for="(btn,idx) in btns"
                :key="idx"
                @mouseenter="btn.hover"
                @click="btn.click"
                @dblclick="btn.dbclick">
            <font-awesome-icon v-if="btn.icon"
                               :icon="btn.icon"
                               class="mx-1" />
            {{ btn.text }}</button>
    </div>
</template>

<style scoped></style>