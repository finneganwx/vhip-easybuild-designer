<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    title: {
        type: String,
        default: "Dialog Title",
    },
    message: {
        type: String,
        default: "Dialog Message",
    },
    confirmText: {
        type: String,
        default: "Confirm",
    },
    cancelText: {
        type: String,
        default: "Cancel",
    },
    showClose: {
        type: Boolean,
        default: true,
    },
});

const emits = defineEmits(["cancel", "confirm"]);

const dialog = ref(null);
onMounted(() => {
    dialog.value.showModal();
});

function onCancel() {
    dialog.value.close();
    emits("cancel");
}

function onConfirm() {
    dialog.value.close();
    emits("confirm");
}
</script>

<template>
    <dialog ref="dialog"
            class="rounded min-w-[18vw] px-2 pb-2">
        <div class="flex justify-start items-center h-[2.8rem]">
            <div class=" font-semibold font-sans">{{ title }}</div>
            <font-awesome-icon v-if="showClose"
                               :icon="['fas', 'xmark']"
                               class="px-1 py-0.5  ml-auto hover:text-red-600"
                               @click="onCancel" />
        </div>
        <div class="mx-1">
            <slot>
                <p class="mt-1 mb-4">{{ message }}</p>
            </slot>

        </div>
        <div>
            <div class=" flex justify-end gap-2">
                <button class="px-2.5 py-1 border border-gray-300 text-[0.85rem] rounded text-gray-500 hover:text-sky-400 hover:border-sky-400"
                        @click="onCancel">{{ cancelText }}</button>
                <button class="px-2.5 py-1 bg-sky-400 text-[0.85rem] text-white rounded hover:bg-sky-300"
                        @click="onConfirm">{{ confirmText }}</button>
            </div>
        </div>
    </dialog>
</template>

<style scoped></style>