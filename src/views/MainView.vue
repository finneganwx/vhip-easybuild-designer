<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import SliderOver from "../components/SliderOver.vue";

// 系统变量
const proxy = getCurrentInstance().appContext.config.globalProperties;

// 组件变量
const btnList = ref([
    {
        text: "Browser Print",
        click: onBrowserPrint,
    },
    { text: "Client Print" },
    { text: "Export To PDF" },
    { text: "Clean Canvas" },
    { text: "Rotate Paper" },
    { text: "Scale Content" },
    { text: "Choose Paper Type" },
    { text: "Set Paper Size" },
]);
// const open = ref(false);

// 数据
let hpt = reactive({});

// 函数
onMounted(() => {
    init();
});

function init() {
    proxy.$initProviders(undefined, true);
    proxy.$buildElemsByUlist("defaultModule", "#default-elems-box");
    hpt = proxy.$createCoreObj({ settingContainer: "#setting-box" });
    proxy.$design(hpt, "#canvas-box");
}

function onBrowserPrint() {
    console.log("onBrowserPrint");
}
</script>

<template>
    <div>
        <!-- Button Gutter -->
        <div class="flex px-4 py-2 gap-2">
            <button v-for="(btn,idx) in btnList"
                    :key="idx"
                    class="rounded-md border-2 border-red-500 px-2 py-1 shadow-md shadow-orange-100"
                    @click="btn.click">
                {{ btn.text }}
            </button>
        </div>

        <div class="grid grid-cols-10 mt-6">
            <!-- Elements Box -->
            <div class="col-span-2">
                <div id="default-elems-box">

                </div>
                <div id="echart-elems-box">

                </div>
            </div>
            <div class="col-span-6">
                <div id="canvas-box"
                     @click="open = true"></div>
            </div>
            <div id="setting-box"
                 class="col-span-2"></div>
        </div>
        <!-- <SliderOver v-model="open"
                    title="Setting">
            <div id="setting-box"></div>
        </SliderOver> -->
    </div>
</template>

<style scoped></style>