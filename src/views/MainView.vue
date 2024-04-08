<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from "vue";
import ElementCard from "../components/ElementCard.vue";
import FuncButton from "../components/FuncButton.vue";
import NumberInput from "../components/NumberInput.vue";

import imageElements from "../assets/printe-elems/imageElements";

// 系统代理
const proxy = getCurrentInstance().appContext.config.globalProperties;
console.log(proxy);

// 数据
let hpt = reactive({});
let printData = reactive({});
const batchNum = ref(1);
const scale = ref(100);

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
            proxy.$exportToPDF(hpt, printData);
        },
    },
    {
        text: "清空",
        type: "danger",
        icon: "fa-solid fa-eraser",
        click: function () {
            proxy.$clearCanvas(hpt);
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

// 元素列表
const elemsList = ref([
    {
        tid: "defaultModule.text",
        title: "文本",
        icon: "fa-solid fa-font",
        iconColor: "#FECACA",
        iconBgColor: "#FF7281",
        image: "/src/assets/images/text.png",
    },
    {
        tid: "defaultModule.image",
        title: "图片",
        icon: "fa-solid fa-image",
        iconColor: "#FECACA",
        iconBgColor: "#FF7281",
        image: "/src/assets/images/img.png",
    },
    {
        tid: "defaultModule.longText",
        title: "长文本",
        icon: "fa-solid fa-align-left",
        iconColor: "#FECACA",
        iconBgColor: "#FF7281",
        image: "/src/assets/images/longText.png",
    },
    {
        tid: "defaultModule.table",
        title: "表格",
        icon: "fa-solid fa-table",
        iconColor: "#FECACA",
        iconBgColor: "#FF7281",
        image: "/src/assets/images/table.png",
    },
    {
        tid: "defaultModule.emptyTable",
        title: "空白表格",
        icon: "fa-solid fa-table-cells-large",
        iconColor: "#FECACA",
        iconBgColor: "#FF7281",
        image: "/src/assets/images/emptyTable.png",
    },
    {
        tid: "defaultModule.html",
        title: "HTML",
        icon: "fa-solid fa-code",
        iconColor: "#FECACA",
        iconBgColor: "#FF7281",
        image: "/src/assets/images/html.png",
    },
    {
        tid: "defaultModule.hline",
        title: "横线",
        icon: "fa-solid fa-grip-lines",
        iconColor: "#83CBFF",
        iconBgColor: "#E7F4FF",
        image: "/src/assets/images/hline.png",
    },
    {
        tid: "defaultModule.vline",
        title: "竖线",
        icon: "fa-solid fa-grip-lines-vertical",
        iconColor: "#83CBFF",
        iconBgColor: "#E7F4FF",
        image: "/src/assets/images/vline.png",
    },
    {
        tid: "defaultModule.rect",
        title: "矩形",
        icon: "fa-solid fa-square",
        iconColor: "#83CBFF",
        iconBgColor: "#E7F4FF",
        image: "/src/assets/images/rect.png",
    },
    {
        tid: "defaultModule.oval",
        title: "椭圆",
        icon: "fa-solid fa-circle",
        iconColor: "#83CBFF",
        iconBgColor: "#E7F4FF",
        image: "/src/assets/images/oval.png",
    },
    {
        tid: "defaultModule.qrcode",
        title: "二维码",
        icon: "fa-solid fa-qrcode",
        iconColor: "#83CBFF",
        iconBgColor: "#E7F4FF",
        image: "/src/assets/images/qrcode.png",
    },
    {
        tid: "defaultModule.barcode",
        title: "条形码",
        icon: "fa-solid fa-barcode",
        iconColor: "#83CBFF",
        iconBgColor: "#E7F4FF",
        image: "/src/assets/images/barcode.png",
    },
]);

// 函数
onMounted(() => {
    init();
});

function init() {
    const group = proxy.$createElemsGroup("我的图片", imageElements);
    const provider = proxy.$createProvider("myImageProvider", group);
    proxy.$initProviders(provider);
    proxy.$buildElemsByUlist("myImageProvider", "#my-elements-box");
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

        <div class="grid grid-cols-10 mt-2 gap-4">
            <!-- Elements Box -->
            <div class="col-span-2">
                <div>
                    <ElementCard v-for="(el,idx) in elemsList"
                                 :key="idx"
                                 :tid="el.tid"
                                 :title="el.title"
                                 :icon="el.icon"
                                 :iconColor="el.iconColor"
                                 :iconBgColor="el.iconBgColor"
                                 :image="el.image"></ElementCard>

                    <div id="my-elements-box"></div>
                </div>
            </div>
            <div class="col-span-6">
                <div id="canvas-box"
                     @click="open = true"
                     class="p-4 rounded shadow-inner"></div>
            </div>
            <div class="col-span-2 border border-sky-500 rounded h-fit">
                <div class="mx-2 my-2 font-semibold text-xl">设置面板</div>
                <div id="setting-box"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>