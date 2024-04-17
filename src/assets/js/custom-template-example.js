/**
 * 内置模板示例
 */

/**
 * 表格模板：自定义表格脚信息示例
 */
const tableTemplate = {
    "panels": [
        {
            "index": 0,
            "name": 1,
            "paperType": "A4",
            "height": 210,
            "width": 297,
            "paperHeader": 132,
            "paperFooter": 595.2755905511812,
            "printElements": [
                {
                    "options": {
                        "left": 15,
                        "top": 133.5,
                        "height": 91.5,
                        "width": 808.5,
                        "fields": [
                            {
                                "text": "序号",
                                "field": "No"
                            },
                            {
                                "text": "制造与检查工艺",
                                "field": "c_ProcessName"
                            },
                            {
                                "text": "规程及工艺卡",
                                "field": "c_Requirements"
                            },
                            {
                                "text": "检查记录号",
                                "field": "c_RecNo"
                            },
                            {
                                "text": "检查点",
                                "field": "ExamPoint"
                            },
                            {
                                "text": "检验结果",
                                "field": "ExamResult"
                            },
                            {
                                "text": "独立检验师检查点",
                                "field": "IIPoint"
                            },
                            {
                                "text": "签字和日期",
                                "field": "SignAndDate"
                            },
                            {
                                "text": "备注",
                                "field": "Remark"
                            },
                            {
                                "text": "停止点",
                                "field": "HP"
                            },
                            {
                                "text": "见证点",
                                "field": "WP"
                            },
                            {
                                "text": "审查点",
                                "field": "RP"
                            },
                            {
                                "text": "操作人",
                                "field": "Operator"
                            },
                            {
                                "text": "检查人",
                                "field": "ExamPerson"
                            },
                            {
                                "text": "独立检验师",
                                "field": "IIPerson"
                            }
                        ],
                        "coordinateSync": false,
                        "widthHeightSync": false,
                        "textAlign": "center",
                        "right": 1011,
                        "bottom": 231,
                        "vCenter": 606.75,
                        "hCenter": 185.25,
                        "field": "jobs",
                        "footerFormatter": function myFooterFormatter(options, rows, data, currentPageGridRowsData) {
                            const colContents = [
                                {
                                    label: '\u7F16\u5236/\u65E5\u671F Prepared by/Date:',
                                    imgSrc: data && data.c_OperatorUrl ? data.c_OperatorUrl : '',
                                    date: data && data.OperatorDate ? data.OperatorDate : ''
                                },
                                {
                                    label: '\u5BA1\u6838/\u65E5\u671F Reviewed by/Date:',
                                    imgSrc: data && data.c_AutographUrl ? data.c_AutographUrl : '',
                                    date: data && data.JudgeDate ? data.JudgeDate : ''
                                },
                                {
                                    label: '\u72EC\u7ACB\u68C0\u9A8C\u5E08/\u65E5\u671F II/Date:',
                                    imgSrc: data && data.c_AuthorizeUrl ? data.c_AuthorizeUrl : '',
                                    date: data && data.AuthorizeDate ? data.AuthorizeDate : ''
                                }
                            ];

                            // 表格脚
                            const ptd = document.createElement('td');
                            ptd.colSpan = 13;
                            ptd.style.height = "60px";

                            // 创建列容器 div
                            const columnContainer = document.createElement('div');
                            columnContainer.style.display = 'flex';

                            // 创建三个等宽列
                            for (let i = 0; i < 3; i++) {
                                const column = document.createElement('div');
                                column.style.display = 'flex';
                                column.style.flex = i === 2 ? '0.85' : '1';
                                column.style.textAlign = 'start';
                                column.style.alignItems = 'center';
                                column.textContent = colContents[i].label;

                                // 签名图片
                                const img = document.createElement('img');
                                img.style.width = '65px';
                                img.style.height = '35px';
                                img.style.marginLeft = '5px';
                                img.src = colContents[i].imgSrc;
                                column.appendChild(img);

                                // 日期
                                const date = document.createElement('span');
                                date.style.marginLeft = '5px';
                                date.textContent = ' / ' + colContents[i].date;
                                column.appendChild(date);

                                columnContainer.appendChild(column);
                            }

                            ptd.appendChild(columnContainer);
                            return ptd.outerHTML;
                        },
                        "columns": [
                            [
                                {
                                    "width": 27.692118456152382,
                                    "title": "序号 No.",
                                    "field": "No",
                                    "checked": true,
                                    "columnId": "No",
                                    "fixed": false,
                                    "rowspan": 2,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 109.11834942808021,
                                    "title": "制造和检查工序 <br> Process Of manufacture & examination",
                                    "field": "c_ProcessName",
                                    "checked": true,
                                    "columnId": "c_ProcessName",
                                    "fixed": false,
                                    "rowspan": 2,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 104.08696271939927,
                                    "title": "规程及工艺卡 <br> Procedure & instruction",
                                    "field": "c_Requirements",
                                    "checked": true,
                                    "columnId": "c_Requirements",
                                    "fixed": false,
                                    "rowspan": 2,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 74.63275220378053,
                                    "title": "检查记录号 <br> Exam. Rec. No.",
                                    "field": "c_RecNo",
                                    "checked": true,
                                    "columnId": "c_RecNo",
                                    "fixed": false,
                                    "rowspan": 2,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 57.720320061058985,
                                    "title": "检查点 <br> Eaxm. Point",
                                    "field": "c_InspectionLocation",
                                    "checked": true,
                                    "columnId": "c_InspectionLocation",
                                    "fixed": false,
                                    "rowspan": 2,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 47.57262749672984,
                                    "title": "检验结果 Result",
                                    "field": "c_InspectionResults",
                                    "checked": true,
                                    "columnId": "c_InspectionResults",
                                    "fixed": false,
                                    "rowspan": 2,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 100,
                                    "title": "独立检验师检查点 <br> II insprction point",
                                    "checked": true,
                                    "fixed": false,
                                    "rowspan": 1,
                                    "colspan": 3,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 100,
                                    "title": "签字和日期 <br> Signature & Date",
                                    "checked": true,
                                    "fixed": false,
                                    "rowspan": 1,
                                    "colspan": 3,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 99.00248184991139,
                                    "title": "备注 Remarks",
                                    "field": "c_Remark",
                                    "checked": true,
                                    "columnId": "c_Remark",
                                    "fixed": false,
                                    "rowspan": 2,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                }
                            ],
                            [
                                {
                                    "width": 32.99480463232455,
                                    "title": "停止点 H",
                                    "field": "c_AuthorizeLocationH",
                                    "checked": true,
                                    "columnId": "c_AuthorizeLocationH",
                                    "fixed": false,
                                    "rowspan": 1,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 30.568127983413905,
                                    "title": "见证点 W",
                                    "field": "c_AuthorizeLocationW",
                                    "checked": true,
                                    "columnId": "c_AuthorizeLocationW",
                                    "fixed": false,
                                    "rowspan": 1,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 29.602237085532586,
                                    "title": "审查点 R",
                                    "field": "c_AuthorizeLocationR",
                                    "checked": true,
                                    "columnId": "c_AuthorizeLocationR",
                                    "fixed": false,
                                    "rowspan": 1,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 62.19583416016082,
                                    "title": "操作者 <br> Operator",
                                    "field": "c_OperatorName",
                                    "checked": true,
                                    "columnId": "c_OperatorName",
                                    "fixed": false,
                                    "rowspan": 1,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 70.08899160495606,
                                    "title": "检查员 <br> Examiner",
                                    "field": "c_InspectionName",
                                    "checked": true,
                                    "columnId": "c_InspectionName",
                                    "fixed": false,
                                    "rowspan": 1,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                },
                                {
                                    "width": 63.22439231849958,
                                    "title": "独立检验师 II",
                                    "field": "c_AuthorizeName",
                                    "checked": true,
                                    "columnId": "c_AuthorizeName",
                                    "fixed": false,
                                    "rowspan": 1,
                                    "colspan": 1,
                                    "tableQRCodeLevel": 0,
                                    "tableSummaryTitle": true,
                                    "tableSummary": ""
                                }
                            ]
                        ]
                    },
                    "printElementType": {
                        "type": "table",
                        "editable": true,
                        "columnDisplayEditable": true,
                        "columnDisplayIndexEditable": true,
                        "columnTitleEditable": true,
                        "columnResizable": true,
                        "columnAlignEditable": true,
                        "isEnableEditField": true,
                        "isEnableContextMenu": true,
                        "isEnableInsertRow": true,
                        "isEnableDeleteRow": true,
                        "isEnableInsertColumn": true,
                        "isEnableDeleteColumn": true,
                        "isEnableMergeCell": true
                    }
                }
            ],
            "paperNumberLeft": 612,
            "paperNumberTop": 46.5,
            "paperNumberContinue": true,
            "paperNumberFormat": "第 PAGE ${paperNo} 共 OF ${paperCount}",
            "rotate": true,
            "scale": 1,
            "watermarkOptions": {
                "content": "",
                "fillStyle": "rgba(184, 184, 184, 0.3)",
                "fontSize": "14px",
                "rotate": 25,
                "width": 200,
                "height": 200,
                "timestamp": false,
                "format": "YYYY-MM-DD HH:mm"
            }
        }
    ]
}

export { tableTemplate }