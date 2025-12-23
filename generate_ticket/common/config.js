// 全局配置文件

// 文字配置
export const textConfig = {
    // PC端文字配置
    pc: {
        font: 'HYShangWeiShouShuW', // 自定义字体
        fontWeight: 'bold',
        labelSize: 22, // 标签文字大小
        valueSize: 32, // 用户输入值文字大小
        labelColor: '#5a3921',
        valueColor: '#000000'
    },
    // 移动端文字配置
    mobile: {
        font: 'cursive', // 使用系统默认手写体
        fontWeight: 'bold',
        labelSizeScale: 22, // 原始标签大小（用于缩放）
        valueSizeScale: 32, // 原始值大小（用于缩放）
        labelColor: '#5a3921',
        valueColor: '#000000'
    }
};

// Canvas原始尺寸配置
export const canvasConfig = {
    originalWidth: 1400,
    originalHeight: 875,
    maxMobileWidth: 600,
    mobileWidthPercentage: 0.9
};

// 原始文字位置配置（PC端坐标）
export const positions = [
    { valueX: 1210, valueY: 192 },  // 始发地中点坐标
    { valueX: 1210, valueY: 369 },  // 目的地中点坐标
    { valueX: 1210, valueY: 545 },  // 称呼中点坐标
    { valueX: 1210, valueY: 752 }   // 时间中点坐标
];

// 默认值配置
export const defaultValues = {
    startPlace: '未填写',
    endPlace: '未填写',
    name: '未填写',
    date: '未知时间'
};

// 图片资源配置
export const imageConfig = {
    pc: {
        template: 'images/template-bg.png',
        logo: 'images/logo1.jpeg'
    },
    mobile: {
        template: 'images/template-bg-mobile.png',
        logo: 'images/logo1.jpeg'
    }
};

// 导出完整配置
export const config = {
    textConfig,
    canvasConfig,
    positions,
    defaultValues,
    imageConfig
};