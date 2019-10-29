// 封装Canvas函数
function Canvas(id) {
    var drawing = document.getElementById(id);
    var context = drawing.getContext("2d");
    // 把canvas进行缩放操作，避免文字模糊
    drawing.width = parseInt(getComputedStyle(drawing, null)['width']) * devicePixelRatio;
    drawing.height = parseInt(getComputedStyle(drawing, null)['height']) * devicePixelRatio;
    this.context = context;
};

Canvas.prototype = {
    constructor: Canvas,
    // 矩形
    Rect: function (x, y, width, height, color) {
        x = parseInt(x * devicePixelRatio);
        y = parseInt(y * devicePixelRatio);
        width = parseInt(width * devicePixelRatio);
        height = parseInt(height * devicePixelRatio);
        this.context.fillStyle = color;
        return this.context.fillRect(x, y, width, height);
    },
    // 文字
    Font: function (content, x, y, font, textAlign, textBaseline, color) {
        x = parseInt(x * devicePixelRatio);
        y = parseInt(y * devicePixelRatio);
        // 把font中的大小属性值乘devicePixelRatio
        font = font.split(" ");
        for (var i = 0; i < font.length; i++) {
            if (/px/.test(font[i])) {
                font[i] = (parseInt(font[i]) * devicePixelRatio) + "px";
            }
        }
        font = font.join(" ");
        this.context.font = font;
        this.context.textAlign = textAlign;
        this.context.textBaseline = textBaseline;
        this.context.fillStyle = color;
        return this.context.fillText(content, x, y);
    },
    // moveTo
    moveTo: function (x, y) {
        x = parseInt(x * devicePixelRatio);
        y = parseInt(y * devicePixelRatio);
        return this.context.moveTo(x + 0.5, y + 0.5);
    },
    // lineTo
    lineTo: function (x, y) {
        x = parseInt(x * devicePixelRatio);
        y = parseInt(y * devicePixelRatio);
        return this.context.lineTo(x + 0.5, y + 0.5);
    },
    // stroke
    stroke: function () {
        return this.context.stroke();
    }
}
