<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { ref } from "vue";

import { getAssetsFile } from "../assets/js/util";

const props = defineProps({
    tid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: "元素",
    },
    icon: {
        type: String,
        default: "fa-solid fa-font",
    },
    iconColor: {
        type: String,
        default: "#000000",
    },
    iconBgColor: {
        type: String,
        default: "#FFFFFFF",
    },
    image: {
        type: String,
        default: "",
    },
});

const thumb = ref(true);
</script>

<template>
    <div :tid="tid"
         class="flex rounded w-fit ep-draggable-item m-2 shadow-md overflow-hidden h-16 "
         style="border: 1px solid #E1E1E1;">
        <div class="w-16 flex justify-center items-center"
             :style="{ 'background-color': iconBgColor}"
             @mouseenter="thumb = false"
             @mouseleave="thumb = true">
            <font-awesome-icon :icon="icon"
                               :style="{ color: iconColor }"
                               size="2xl" />
        </div>
        <Transition>
            <div v-if="!thumb">
                <div class="ml-2 mt-1 text-sm font-semibold">{{ title }}</div>
                <img :src="image"
                     style="object-fit: contain;"
                     class="w-36">
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>