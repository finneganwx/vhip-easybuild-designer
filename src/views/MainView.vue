<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import ElementCard from "../components/ElementCard.vue";
import FuncButton from "../components/FuncButton.vue";
import NumberInput from "../components/NumberInput.vue";
import DefaultDialog from "../components/DefaultDialog.vue";

import images from "../assets/printe-elems/custom-elements-image";
import {
    defaultMainElements,
    defaultAsstElements,
    customElements,
} from "../assets/printe-elems/index";

import AlertDialog from "../components/alert/AlertDialog";

// 系统代理
const proxy = getCurrentInstance().appContext.config.globalProperties;
console.log(proxy);

// 数据
let hpt = reactive({});
let printData = reactive({});
let html = ref("");
let batchNum = ref(1);
let scale = ref(100);

// 按钮列表
const btnList = ref([
    {
        text: "浏览器打印",
        type: "primary",
        icon: "fa-solid fa-print",
        click: function () {
            proxy.$browserPrint(hpt, printData, batchNum.value);
        },
    },
    {
        text: "客户端打印",
        type: "primary",
        icon: "fa-solid fa-computer",
        click: function () {
            proxy.$clientPrint(hpt, printData, batchNum.value);
        },
    },
    {
        text: "导出为PDF",
        type: "primary",
        icon: "fa-regular fa-file-pdf",
        click: function () {
            proxy.$exportToPDF(hpt, printData);
        },
    },
    {
        text: "预览",
        type: "success",
        icon: "fa-regular fa-eye",
        click: function () {
            html.value = proxy.$getPrintHTMLStr(hpt, printData);
            previewDialog.value.showDialog();
        },
    },
    {
        text: "清空",
        type: "danger",
        icon: "fa-solid fa-eraser",
        click: function () {
            AlertDialog({
                title: "清空提醒",
                message: "确定要<span style='color:red'>清空</span>画布吗？",
                confirmText: "确定",
                cancelText: "取消",
                onConfirm: () => {
                    proxy.$clearCanvas(hpt);
                },
                onCancel: () => {
                    console.log("关闭弹窗");
                },
            });
        },
    },
    {
        text: "旋转",
        type: "warning",
        icon: "fa-solid fa-rotate",
        click: function () {
            proxy.$rotatePaper(hpt);
        },
    },
    { text: "放大/缩小" },
    { text: "选择纸张" },
    { text: "设置尺寸" },
]);

const previewDialog = ref(null);

// 函数
onMounted(() => {
    init();
});

function init() {
    const group = proxy.$createElemsGroup("自定义图片元素", images);
    const provider = proxy.$createProvider("customElementsProvider", group);
    proxy.$initProviders(provider);
    proxy.$buildElemsByHtml();
    hpt = proxy.$createCoreObj({ settingContainer: "#setting-box" });
    proxy.$design(hpt, "#canvas-box");
}
</script>

<template>
    <div>
        <!-- Button Gutter -->
        <div class="flex px-4 py-2 gap-2">
            <NumberInput v-model.number="batchNum"
                         prefix="批量打印"
                         postfix="份"></NumberInput>
            <FuncButton v-for="(btn,idx) in btnList"
                        :key="idx"
                        :text="btn.text"
                        :icon="btn.icon"
                        :type="btn.type"
                        @click="btn.click"></FuncButton>
        </div>

        <div class="grid grid-cols-12 mt-2 gap-2">
            <!-- Elements Box -->
            <div class="col-span-2">
                <div>
                    <ElementCard v-for="(el,idx) in defaultMainElements"
                                 :key="idx"
                                 :tid="el.tid"
                                 :title="el.title"
                                 :icon="el.icon"
                                 :iconColor="el.iconColor"
                                 :iconBgColor="el.iconBgColor"
                                 :image="el.image"></ElementCard>

                    <ElementCard v-for="(el,idx) in defaultAsstElements"
                                 :key="idx"
                                 :tid="el.tid"
                                 :title="el.title"
                                 :icon="el.icon"
                                 :iconColor="el.iconColor"
                                 :iconBgColor="el.iconBgColor"
                                 :image="el.image"></ElementCard>

                    <ElementCard v-for="(el,idx) in customElements"
                                 :key="idx"
                                 :tid="el.tid"
                                 :title="el.title"
                                 :icon="el.icon"
                                 :iconColor="el.iconColor"
                                 :iconBgColor="el.iconBgColor"
                                 :image="el.image"></ElementCard>
                </div>
            </div>
            <div class="col-span-8">
                <div id="canvas-box"
                     @click="open = true"
                     class="p-4 rounded shadow-inner"></div>
            </div>
            <div class="col-span-2 border border-sky-500 rounded h-fit">
                <div class="mx-2 my-2 font-semibold text-xl">设置面板</div>
                <div id="setting-box"></div>
            </div>
        </div>

        <DefaultDialog ref="previewDialog">
            <div id="previewHtml"
                 v-html="html"></div>
        </DefaultDialog>
    </div>
</template>

<style scoped>
</style>