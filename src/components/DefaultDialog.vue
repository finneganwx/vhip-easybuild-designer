<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    title: {
        type: String,
        default: "Dialog Title",
    },
    width: {
        type: String,
        default: "40vw",
    },
    showClose: {
        type: Boolean,
        default: true,
    },
});

const dialog = ref();

const showDialog = () => {
    dialog.value.showModal();
};

const closeDialog = () => {
    dialog.value.close();
};

defineExpose({
    showDialog,
    closeDialog,
});
</script>

<template>
    <dialog ref="dialog"
            class=" rounded p-2 overflow-hidden "
            :style="{ width: width }">
        <div class="flex justify-start items-center py-1">
            <div class=" font-semibold font-sans">{{ title }}</div>
            <font-awesome-icon v-if="showClose"
                               :icon="['fas', 'xmark']"
                               class="px-1 py-0.5 ml-auto hover:text-red-600"
                               @click="closeDialog" />
        </div>
        <div class="max-h-[80vh] overflow-y-auto overflow-x-hidden">
            <slot>
                <div>Dialog Content</div>
            </slot>
        </div>

        <div class="py-1">
            <slot name="footer">
            </slot>
        </div>
    </dialog>
</template>

<style scoped></style>