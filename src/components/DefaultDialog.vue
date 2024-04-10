<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";

const props = defineProps({
    title: {
        type: String,
        default: "Dialog Title",
    },
    width: {
        type: String,
        default: "40vw",
    },
    height: {
        type: String,
        default: "90vh",
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
            class="rounded overflow-hidden box-content min-w-fit"
            style="max-width: 10vw;">
        <!-- title -->
        <div class="flex justify-start items-center pt-4 pb-2.5 px-4">
            <div class=" font-semibold font-sans">{{ title }}</div>
            <font-awesome-icon v-if="showClose"
                               :icon="['fas', 'xmark']"
                               class="px-1 py-0.5 ml-auto hover:text-red-600"
                               @click="closeDialog" />
        </div>

        <!-- body -->
        <div class="max-h-[80vh] overflow-y-auto bg-transparent px-4 py-1">
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