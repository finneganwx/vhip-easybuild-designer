<script setup>
import { computed, defineProps } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    text: {
        type: String,
        default: "Click me",
    },
    icon: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        validator: (value) => {
            return [
                "primary",
                "success",
                "warning",
                "danger",
                "plain",
            ].includes(value);
        },
    },
});

const emits = defineEmits(["click"]);

const handleClick = () => {
    emits("click");
};

const getColor = computed(() => {
    switch (props.type) {
        case "primary":
            return "bg-sky-500 hover:bg-sky-400 text-white";
        case "success":
            return "bg-emerald-500 hover:bg-emerald-400 text-white";
        case "warning":
            return "bg-amber-500 hover:bg-amber-400 text-white";
        case "danger":
            return "bg-rose-500 hover:bg-rose-400 text-white";
        case "plain":
            return "bg-gray-200 hover:bg-gray-300 text-gray-700";
        default:
            return "bg-sky-500 hover:bg-sky-400 text-white";
    }
});
</script>

<template>
    <div>
        <button @click="handleClick"
                class="rounded-md py-2 px-4 text-[13px]"
                :class="getColor">
            <font-awesome-icon v-if="icon"
                               :icon="icon"
                               class="mx-1" />
            {{ text }}
        </button>
    </div>
</template>

<style scoped></style>