<script setup>
import { onMounted, ref } from "vue";
import DefaultDialog from "../DefaultDialog.vue";

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

const alertDialog = ref(null);
onMounted(() => {
    alertDialog.value.showDialog();
});

function onCancel() {
    alertDialog.value.closeDialog();
    emits("cancel");
}

function onConfirm() {
    alertDialog.value.closeDialog();
    emits("confirm");
}
</script>

<template>
    <DefaultDialog ref="alertDialog"
                   :title="title"
                   width="18vw"
                   hight="10vh"
                   :showClose="showClose">
        <p class="mx-1 mt-1 mb-4"
           v-html="message"></p>

        <template #footer>
            <div class=" flex justify-end gap-2">
                <button class="px-2.5 py-1 border border-gray-300 text-[0.85rem] rounded text-gray-500 hover:text-sky-400 hover:border-sky-400"
                        @click="onCancel">{{ cancelText }}</button>
                <button class="px-2.5 py-1 bg-sky-400 text-[0.85rem] text-white rounded hover:bg-sky-300"
                        @click="onConfirm">{{ confirmText }}</button>
            </div>
        </template>
    </DefaultDialog>
</template>

<style scoped></style>