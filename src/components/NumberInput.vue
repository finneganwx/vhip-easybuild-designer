<script setup>
const [model, modifiers] = defineModel({
    set(v) {
        if (modifiers.number) {
            return v.replace(/[^\d.]/g, "");
        }
        return value;
    },
});

const props = defineProps({
    width: {
        type: String,
        default: "2rem",
    },
    prefix: {
        type: String,
        default: "",
    },
    postfix: {
        type: String,
        default: "",
    },
});
</script>

<template>
    <div class=" border border-[#EDEDED] text-[13px] p-2 overflow-hidden rounded ">
        <label class=" text-gray-500">{{ prefix }}</label>
        <input v-model="model"
               class="h-full focus:outline-none mx-4"
               :style="{width: width}" />
        <label class=" text-gray-500">{{ postfix }}</label>
    </div>
</template>

<style scoped></style>