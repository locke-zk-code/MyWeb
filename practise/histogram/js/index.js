var myInputs = document.querySelectorAll(".myInput");

// 确定浏览器支持 canvas
if (drawing.getContext) {
    // 当网页加载完毕时执行draw函数
    window.onload = function () {
        draw();
    }

    // 当输入框发生改变时执行draw函数
    for (var i = 0; i < myInputs.length; i++) {
        myInputs[i].onchange = function () {
            draw();
        }
    }

    // 绘图函数
    function draw() {
        // Y轴标签值
        var labelValues = [0, 20, 40, 60, 80, 100];
        // 忍者姓名
        var name = ["卡卡西", "鸣人", "佐助", "小樱", "大和"];
        // 战力值
        var data = new Array();
        myInputs.forEach(function (curr) {
            curr = curr.value;
            if (curr <= 100) {
                data.push(curr);
            } else {
                data.push(100);
            }
        });
        var contextFun = new Canvas("drawing");

        // 清空面板
        contextFun.Rect(0, 0, 600, 400, "#fff");
        // 标题
        contextFun.Font("火影忍者战力柱状图", 300, 25, "22px 等线", "center", "middle", "#000");

        // Y轴标签
        // Y轴标签之间的跨度
        var stepY = 300 / (labelValues.length - 1);
        // Y轴标签所占宽度
        var labelWidthY = 50;
        for (var j = labelValues.length - 1; j >= 0; j--) {
            contextFun.Font(labelValues[j], labelWidthY / 2, stepY, "14px 等线", "center", "middle", "#000");
            // Y轴参考线
            contextFun.moveTo(labelWidthY, stepY);
            contextFun.lineTo(580, stepY);
            contextFun.stroke();
            stepY += 60;
        }

        // 忍者姓名
        // X轴每列的宽度
        var columnWidthX = (600 - 50 - 20) / myInputs.length;
        // 柱子的宽度
        var pillarWidth = 30;
        // 姓名之间的跨度
        var nameStep = labelWidthY + columnWidthX / 2;
        for (var j = 0; j < name.length; j++) {
            contextFun.Font(name[j], nameStep, 380, "center", "middle", "#000");
            nameStep += columnWidthX;
        }

        // 柱子
        // 柱子的起始坐标
        var firstPillar = (labelWidthY + columnWidthX) - (columnWidthX / 2 + pillarWidth / 2);
        // 每个柱子之间的跨度
        var pillarStep = columnWidthX;
        // 一刻度对应的像素
        var changePX = Math.floor(300 / 100);
        // 文字的X坐标
        var fontX = labelWidthY + columnWidthX / 2;
        // 每个柱子的高度
        var pillarHeight = new Array();
        // 每个柱子的起始坐标
        var pillarStartX = new Array();
        for (var i = 1; i <= name.length; i++) {
            if (data[i - 1] > 0) {
                pillarHeight.push(360 - data[i - 1] * 3);
                pillarStartX.push(firstPillar);
                // 文字的Y坐标
                var fontY = 400 - 40 - data[i - 1] * 3 - 20;
                contextFun.Rect(firstPillar, 360, pillarWidth, -(data[i - 1] * 3), "rgb(91, 155, 213)");
                firstPillar += pillarStep;
                contextFun.Font(data[i - 1], fontX, fontY, "14px 等线", "center", "middle", "#000");
                fontX += pillarStep;
            }
        }

        // 调用鼠标事件
        mouseEvent("drawing", contextFun, pillarStartX, pillarWidth, pillarHeight, name, data);
    }

    // 画布鼠标事件
    function mouseEvent(id, contextFun, x, width, height, name, data) {
        var drawing = document.getElementById(id);
        drawing.onmousemove = function () {
            var offsetX = event.offsetX;
            var offsetY = event.offsetY;

            for (var i = 0; i < name.length; i++) {
                var temp = "";
                if (offsetX >= x[i] && offsetX <= x[i] + 30 && offsetY <= 360 && offsetY >= height[i]) {
                    draw();
                    if (i != name.length - 1) {
                        contextFun.Rect(x[i] + 40, offsetY, 120, 60, "rgba(0, 0, 0, 0.5)");
                        // 显示数据框，数据框中包含忍者姓名和其战力值
                        contextFun.Font("忍者：", x[i] + 30 + 10 + 35, offsetY + 15, "14px 等线", "center", "middle", "#fff");
                        contextFun.Font(name[i], x[i] + 30 + 10 + 80, offsetY + 15, "14px 等线", "center", "middle", "#fff");
                        contextFun.Font("战力值：", x[i] + 30 + 10 + 35, offsetY + 45, "14px 等线", "center", "middle", "#fff");
                        contextFun.Font(data[i], x[i] + 30 + 10 + 80, offsetY + 45, "14px 等线", "center", "middle", "#fff");
                    } else {
                        // 最后一个柱子，把数据框移到左边来
                        contextFun.Rect(x[i] - 10, offsetY, -120, 60, "rgba(0, 0, 0, 0.5)");
                        // 显示数据框，数据框中包含忍者姓名和其战力值
                        contextFun.Font("忍者：", x[i] - 90, offsetY + 15, "14px 等线", "center", "middle", "#fff");
                        contextFun.Font(name[i], x[i] - 45, offsetY + 15, "14px 等线", "center", "middle", "#fff");
                        contextFun.Font("战力值：", x[i] - 90, offsetY + 45, "14px 等线", "center", "middle", "#fff");
                        contextFun.Font(data[i], x[i] - 45, offsetY + 45, "14px 等线", "center", "middle", "#fff");
                    }
                    // 如果不写break，那么除了最后一个柱子就会看不见提示框，因为他会继续执行后面的循环，后面的循环是不符合判断条件的，所以执行else里面的代码。
                    break;
                } else {
                    draw();
                }
            }
        }
    }
}
