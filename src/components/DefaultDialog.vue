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
        default: "fit-content",
    },
    height: {
        type: String,
        default: "fit-content",
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
            class="rounded overflow-y-hidden overflow-auto box-content max-w-full max-h-full"
            :style="{ 'height': height, 'width': width}">
        <!-- title -->
        <div class="flex justify-start items-center pt-4 pb-2.5 px-4">
            <div class=" font-semibold font-sans">{{ title }}</div>
            <font-awesome-icon v-if="showClose"
                               :icon="['fas', 'xmark']"
                               class="px-1 py-0.5 ml-auto hover:text-red-600"
                               @click="closeDialog" />
        </div>

        <!-- body -->
        <div class="bg-transparent px-4 py-1">
            <slot>
                <div>Dialog Content</div>
            </slot>
        </div>

        <!-- footer -->
        <div class="px-4 pb-2">
            <slot name="footer">
            </slot>
        </div>
    </dialog>
</template>

<style scoped>
</style>