<script setup>
import { ref, getCurrentInstance, onMounted, reactive, computed } from "vue";
import ElementCard from "../components/ElementCard.vue";
import FuncButton from "../components/FuncButton.vue";
import CompButton from "../components/CompButton.vue";
import ButtonGroup from "../components/ButtonGroup.vue";
import NumberInput from "../components/NumberInput.vue";
import PopupSelect from "../components/PopupSelect.vue";
import DefaultDialog from "../components/DefaultDialog.vue";
import AlertDialog from "../components/alert/AlertDialog";

import { Codemirror } from "vue-codemirror";

import images from "../assets/js/custom-elements-image";
import {
    defaultMainElements,
    defaultAsstElements,
    customElements,
} from "../assets/js/index";

// 系统代理
const proxy = getCurrentInstance().appContext.config.globalProperties;
console.log(proxy);

// 打印
let hpt = reactive({});
let printData = reactive({});
let html = ref("");
let batchNum = ref(1);
let scale = ref(100);
let paperType = ref("A4");

// 渲染
const scaleStr = computed(() => {
    return scale.value + "%";
});
const paperTypes = ref([
    { label: "A1", value: "A1" },
    { label: "A2", value: "A2" },
    { label: "A3", value: "A3" },
    { label: "A4", value: "A4" },
]);
const previewDialog = ref();
const jsonDialog = ref();

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
]);
const btnGroup = ref([
    {
        icon: "fa-solid fa-minus",
        click: () => {
            if (scale.value < 10) {
                return;
            }
            scale.value -= 10;
            proxy.$scaleContent(hpt, scale.value / 100);
        },
    },
    {
        text: scaleStr,
        dbclick: () => {
            scale.value = 100;
            proxy.$scaleContent(hpt, scale.value / 100);
        },
    },
    {
        icon: "fa-solid fa-plus",
        click: () => {
            if (scale.value > 140) {
                return;
            }
            scale.value += 10;
            proxy.$scaleContent(hpt, scale.value / 100);
        },
    },
]);
const moreBtns = ref([
    {
        text: "模板JSON",
        icon: "fa-solid fa-file-code",
        click: function () {
            const template = proxy.$getTemplateObj(hpt);
            html.value = JSON.stringify(template, null, 4);
            jsonDialog.value.showDialog();
        },
    },
    {
        text: "数据填充",
        icon: "fa-solid fa-database",
        click: function () {
            jsonDialog.value.showDialog();
        },
    },
    {
        text: "自定义元素提取",
        icon: "fa-solid fa-bolt",
        click: function () {
            jsonDialog.value.showDialog();
        },
    },
]);

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

function onPaperTypeChange(paperType) {
    console.log(paperType);
    proxy.$setPaperType(hpt, paperType.value);
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
            <ButtonGroup :btns="btnGroup"></ButtonGroup>
            <PopupSelect v-model="paperType"
                         :options="paperTypes"
                         @change="onPaperTypeChange"></PopupSelect>
            <ButtonGroup :btns="moreBtns"></ButtonGroup>
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
                     class="p-4 rounded shadow-inner overflow-x-auto"></div>
            </div>
            <div class="col-span-2 border border-sky-500 rounded h-fit">
                <div class="mx-2 my-2 font-semibold text-xl">设置面板</div>
                <div id="setting-box"></div>
            </div>
        </div>

        <!-- 预览 -->
        <DefaultDialog ref="previewDialog">
            <div class="bg-gray-200 border-2 border-gray-300 box-border">
                <div class="h-[90vh] overflow-auto">
                    <div id="previewHtml"
                         v-html="html"
                         class="bg-white"></div>
                </div>
            </div>
        </DefaultDialog>

        <!-- 模板json弹窗 -->
        <DefaultDialog ref="jsonDialog">
            <Codemirror v-model="html"></Codemirror>
        </DefaultDialog>
    </div>
</template>

<style src="../assets/css/printer-style.css" scoped></style>
<style scoped>
</style>