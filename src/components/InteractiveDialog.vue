<script setup>
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
    title: {
        type: String,
        default: "Dialog Title",
    },
});

const emits = defineEmits(["confirm", "cancel"]);

const dialog = ref();
const defaultTitle = ref(props.title);

const showDialog = (title) => {
    if (title) {
        defaultTitle.value = title;
    }
    dialog.value.showModal();
};

const closeDialog = () => {
    dialog.value.close();
};

function onCancel() {
    emits("cancel");
    closeDialog();
}

function onConfirm() {
    emits("confirm");
}

defineExpose({
    showDialog,
    closeDialog,
});
</script>

<template>
    <dialog ref="dialog"
            class="rounded divide-y min-w-[15vw]">
        <div class="mx-2 mt-0.5 mb-1">
            <div class="flex justify-start items-center shadow-sm h-[2.5rem]">
                <div class=" font-semibold font-sans">{{ defaultTitle }}</div>
                <font-awesome-icon :icon="['fas', 'xmark']"
                                   class="px-1 py-0.5  ml-auto hover:text-red-600"
                                   @click="dialog.close()" />
            </div>
            <div>
                <slot>
                    <p class="mt-1 mb-4">默认内容</p>
                </slot>
            </div>

            <div>
                <slot name="footer">
                    <div class=" flex justify-end gap-2">
                        <button class="px-2.5 py-1 bg-sky-400 text-[0.85rem] text-white rounded hover:bg-sky-300"
                                @click="onConfirm">确认</button>
                    </div>
                </slot>
            </div>
        </div>
    </dialog>
</template>

<style scoped></style>