<script setup>
import { computed, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const model = defineModel();
const props = defineProps({
    options: {
        type: Array,
        default: () => [
            {
                label: "Option 1",
                value: "option1",
            },
        ],
    },
    width: {
        type: String,
        default: "10rem",
    },
});
const emits = defineEmits(["change"]);

let open = ref(false);

const icon = computed(() => {
    return open.value ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down";
});

const selectedStyle = (option) => {
    if (model.value === option.value) {
        return {
            backgroundColor: "rgb(255 237 213)",
            color: "rgb(249 115 22)",
        };
    }
};

function onChange(option) {
    model.value = option.value;
    emits("change", option);
    open.value = false;
}
</script>

<template>
    <div class="rounded border border-gray-300 "
         :style="{'width':width}"
         @mouseleave="open=false">
        <div class="h-full flex justify-start items-center ml-2.5 mr-1.5"
             @click="open = !open">
            <div class="text-sm">{{ model }}</div>
            <font-awesome-icon :icon="icon"
                               size="sm"
                               class="mx-1 ml-auto" />
        </div>
        <Transition>
            <div>
                <div class="h-1 bg-transparent"></div>
                <ul v-if="open"
                    :style="{'width':width}"
                    class=" absolute border border-gray-200 bg-white z-50 rounded-md text-sm">
                    <li v-for="(o,idx) in options"
                        :key="idx"
                        :style="selectedStyle(o)"
                        @click="onChange(o)"
                        class="p-2 hover:bg-orange-100 hover:text-orange-500 text-gray-500">
                        {{ o.label }}
                    </li>
                </ul>
            </div>

        </Transition>
    </div>
</template>

<style scoped>
</style>