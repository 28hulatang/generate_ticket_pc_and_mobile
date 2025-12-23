// 移动端脚本文件
import { config } from '../common/config.js';
import { loadImage, drawCenteredText, calculateMobileCanvasSize, scalePositions, getFormData, downloadCanvasAsPNG } from '../common/utils.js';

// 获取DOM元素
const form = document.getElementById('inputForm');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 模板图片
const templateImg = new Image();

// 图片加载状态标记
let imgLoaded = false;
let imgError = false;

// Canvas动态尺寸
let canvasWidth = 0;
let canvasHeight = 0;
let scaleFactor = 1;

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    // 初始化Canvas尺寸
    initCanvasSize();
    
    // 设置图片加载事件
    templateImg.onload = () => {
        imgLoaded = true;
        console.log('模板图片加载完成');
        // 初始绘制模板图
        ctx.drawImage(templateImg, 0, 0, canvasWidth, canvasHeight);
    };
    
    templateImg.onerror = () => {
        imgError = true;
        console.error('模板图片加载失败');
        alert('模板图片加载失败，请检查图片路径是否正确。');
    };
    
    // 加载图片（带时间戳防缓存）
    templateImg.src = 'images/template-bg.png?timestamp=' + Date.now();
});

// 初始化Canvas尺寸
function initCanvasSize() {
    // 动态计算Canvas尺寸
    const { width, height, scaleFactor: scale } = calculateMobileCanvasSize(config.canvasConfig);
    
    canvasWidth = width;
    canvasHeight = height;
    scaleFactor = scale;
    
    // 设置Canvas尺寸
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    console.log(`Canvas尺寸：${canvasWidth}x${canvasHeight}，缩放比例：${scaleFactor}`);
}

// 监听表单提交事件
form.addEventListener('submit', (e) => {
    e.preventDefault();
    generateImage();
});

// 监听下载按钮点击事件
downloadBtn.addEventListener('click', () => {
    downloadCanvasAsPNG(canvas, '自定义行程图.png');
});

// 生成图片函数
function generateImage() {
    // 显示加载状态
    generateBtn.disabled = true;
    generateBtn.textContent = '生成中...';
    downloadBtn.disabled = true;
    
    // 检查图片是否加载失败
    if (imgError) {
        alert('模板图片加载失败，请检查图片路径是否正确。');
        generateBtn.disabled = false;
        generateBtn.textContent = '生成图片';
        return;
    }
    
    // 清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // 处理图片加载
    if (imgLoaded) {
        // 图片已加载，直接绘制
        drawImageAndText();
    } else {
        // 图片未加载完成，等待加载
        templateImg.onload = () => {
            imgLoaded = true;
            drawImageAndText();
        };
    }
}

// 绘制图片和文字的辅助函数
function drawImageAndText() {
    // 绘制模板背景图
    ctx.drawImage(templateImg, 0, 0, canvasWidth, canvasHeight);
    
    // 获取用户输入（带默认值）
    const inputs = getFormData(form, config.defaultValues);
    
    // 绘制文字
    drawText(inputs);
    
    // 恢复按钮状态
    generateBtn.disabled = false;
    generateBtn.textContent = '生成图片';
    downloadBtn.disabled = false;
}

// 绘制文字函数
function drawText(inputs) {
    // 获取移动端文字配置
    const mobileTextConfig = config.textConfig.mobile;
    
    // 计算缩放后的文字位置
    const scaledPositions = scalePositions(config.positions, scaleFactor);
    
    // 计算缩放后的字体大小
    const labelSize = Math.round(mobileTextConfig.labelSizeScale * scaleFactor);
    const valueSize = Math.round(mobileTextConfig.valueSizeScale * scaleFactor);
    
    // 绘制始发地
    drawCenteredText(ctx, inputs.startPlace, scaledPositions[0].valueX, scaledPositions[0].valueY, {
        font: mobileTextConfig.font,
        size: valueSize,
        color: mobileTextConfig.valueColor,
        weight: mobileTextConfig.fontWeight
    });
    
    // 绘制目的地
    drawCenteredText(ctx, inputs.endPlace, scaledPositions[1].valueX, scaledPositions[1].valueY, {
        font: mobileTextConfig.font,
        size: valueSize,
        color: mobileTextConfig.valueColor,
        weight: mobileTextConfig.fontWeight
    });
    
    // 绘制称呼
    drawCenteredText(ctx, inputs.name, scaledPositions[2].valueX, scaledPositions[2].valueY, {
        font: mobileTextConfig.font,
        size: valueSize,
        color: mobileTextConfig.valueColor,
        weight: mobileTextConfig.fontWeight
    });
    
    // 绘制时间
    drawCenteredText(ctx, inputs.date, scaledPositions[3].valueX, scaledPositions[3].valueY, {
        font: mobileTextConfig.font,
        size: valueSize,
        color: mobileTextConfig.valueColor,
        weight: mobileTextConfig.fontWeight
    });
}

// 窗口大小变化时重新计算Canvas尺寸
window.addEventListener('resize', () => {
    initCanvasSize();
    // 如果图片已加载，重新绘制
    if (imgLoaded) {
        ctx.drawImage(templateImg, 0, 0, canvasWidth, canvasHeight);
    }
});