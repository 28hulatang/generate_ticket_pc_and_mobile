// 共用工具函数

/**
 * 加载图片并处理加载状态
 * @param {string} src - 图片路径
 * @param {function} onLoad - 加载成功回调
 * @param {function} onError - 加载失败回调
 * @returns {Image} - 图片对象
 */
export function loadImage(src, onLoad = null, onError = null) {
    const img = new Image();
    
    // 处理缓存问题
    const timestampedSrc = `${src}?timestamp=${Date.now()}`;
    
    img.onload = () => {
        console.log(`图片加载成功: ${src}`);
        if (onLoad) onLoad(img);
    };
    
    img.onerror = () => {
        console.error(`图片加载失败: ${src}`);
        if (onError) onError(new Error(`图片加载失败: ${src}`));
    };
    
    img.src = timestampedSrc;
    return img;
}

/**
 * 在Canvas上绘制居中文字
 * @param {CanvasRenderingContext2D} ctx - Canvas上下文
 * @param {string} text - 要绘制的文字
 * @param {number} x - 中心点X坐标
 * @param {number} y - 中心点Y坐标
 * @param {Object} config - 文字配置
 * @param {string} config.font - 字体名称
 * @param {number} config.size - 字体大小
 * @param {string} config.color - 字体颜色
 * @param {string} config.weight - 字重
 */
export function drawCenteredText(ctx, text, x, y, config) {
    // 设置文字样式
    ctx.font = `${config.weight || 'normal'} ${config.size}px ${config.font}`;
    ctx.fillStyle = config.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 绘制文字
    ctx.fillText(text, x, y);
}

/**
 * 计算Canvas的动态尺寸（移动端专用）
 * @param {Object} config - Canvas配置
 * @param {number} config.originalWidth - 原始宽度
 * @param {number} config.originalHeight - 原始高度
 * @param {number} config.maxMobileWidth - 移动端最大宽度
 * @param {number} config.mobileWidthPercentage - 移动端宽度百分比
 * @returns {Object} - 计算后的尺寸 {width, height, scaleFactor}
 */
export function calculateMobileCanvasSize(config) {
    // 动态计算Canvas尺寸：最大宽度为窗口宽度的指定百分比，不超过最大宽度
    const width = Math.min(window.innerWidth * config.mobileWidthPercentage, config.maxMobileWidth);
    // 保持原始比例
    const height = width * (config.originalHeight / config.originalWidth);
    // 计算缩放比例
    const scaleFactor = width / config.originalWidth;
    
    return {
        width,
        height,
        scaleFactor
    };
}

/**
 * 缩放坐标点
 * @param {Array} originalPositions - 原始坐标数组
 * @param {number} scaleFactor - 缩放因子
 * @returns {Array} - 缩放后的坐标数组
 */
export function scalePositions(originalPositions, scaleFactor) {
    return originalPositions.map(pos => ({
        valueX: pos.valueX * scaleFactor,
        valueY: pos.valueY * scaleFactor
    }));
}

/**
 * 获取表单数据（带默认值）
 * @param {HTMLFormElement} form - 表单元素
 * @param {Object} defaultValues - 默认值配置
 * @returns {Object} - 表单数据
 */
export function getFormData(form, defaultValues) {
    const formData = new FormData(form);
    return {
        startPlace: formData.get('startPlace') || defaultValues.startPlace,
        endPlace: formData.get('endPlace') || defaultValues.endPlace,
        name: formData.get('name') || defaultValues.name,
        date: formData.get('date') || defaultValues.date
    };
}

/**
 * 下载Canvas为PNG图片
 * @param {HTMLCanvasElement} canvas - Canvas元素
 * @param {string} fileName - 下载文件名
 */
export function downloadCanvasAsPNG(canvas, fileName = 'custom-image.png') {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL('image/png');
    link.click();
}