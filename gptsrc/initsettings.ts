/*
 *  Power BI Visualization Settings
 *  Date Range Selector
 */

"use strict";

// 引入 `date-fns` 库中的日期操作函数
import {
    // startOfYear, // 此行被注释，未使用
    startOfToday
} from "date-fns";

// 样式设置类，用于定义日期选择器的整体样式和字体
export class StyleSettings {
    // 日期格式，用于显示日期的格式（例如：1-01-2023）
    public fmtDate: string = 'd-MM-yyyy';
    // 主题颜色
    public themeColor: string = "#607d8b";
    // 主题模式，默认为浅色模式
    public themeMode: string = "light";
    // 主题字体，默认使用 Segoe UI 字体
    public themeFont: string = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif";
    // 字体家族
    public fontFamily: string = "\"Segoe UI\", wf_segoe-ui_normal, helvetica, arial, sans-serif";
    // 字体大小，默认值为 16
    public fontSize: number = 16;
    // 是否加粗字体
    public fontBold: boolean = false;
    // 是否为下划线字体
    public fontUnderline: boolean = false;
    // 是否为斜体
    public fontItalic: boolean = false;
    // 字体颜色，默认为黑色
    public fontColor: string = "#000000";
}

// 日历设置类，用于定义日期范围、步长、财年起始月等
export class CalendarSettings {
    // 初始日期范围，用于指定日期选择器的默认范围
    public startRange: string = "rangeScope";
    // 初始步长，默认按天计算
    public stepInit: string = "day";
    // 财年起始月（0 表示一月）
    public yearStartMonth: number = 0;
    // 周起始日（1 表示星期一）
    public weekStartDay: number = 1;
    // 工资周期长度（天数），默认值为 14 天
    public payLength: number = 14;
    // 日期格式，用于显示日期（例如：周一, 1 月 23 日）
    public fmtDate: string = "EEE, d MMM yy";
}

// 配置设置类，用于定义各个组件的可见性和展示方式
export class ConfigSettings {
    // 初始是否显示滑块
    public showSlider: boolean = false;
    // 是否显示第二个滑块
    public show2ndSlider: boolean = true;
    // 是否显示当前日期
    public showCurrent: boolean = true;
    // 是否显示图标文本
    public showIconText: boolean = false;
    // 是否显示帮助图标
    public showHelpIcon: boolean = false;
    // 是否显示更多选项
    public showMore: boolean = false;
}

// 天设置类，用于定义天的显示设置
export class DaySettings {
    // 是否显示天视图
    public showDay: boolean = true;
    // 天的日期格式
    public fmtDay: string = 'd-MMM';
}

// 周设置类，用于定义周的显示设置
export class WeekSettings {
    // 是否显示周视图
    public showWeek: boolean = true;
    // 周数跳跃设置（显示每隔 4 周）
    public weekSkip: number = 4;
    // 周的日期格式
    public fmtWeek: string = 'w';
}

// 工资周期设置类，用于定义工资周期的显示设置
export class PaySettings {
    // 是否显示工资周期视图
    public showPay: boolean = false;
    // 工资周期跳跃设置（每隔 4 个周期）
    public paySkip: number = 4;
    // 工资周期长度，默认 14 天
    public payLength: number = 14;
    // 工资周期的日期格式
    public fmtPay: string = 'd-MMM';
    // 基准日，用于计算工资周期的基准日期（默认为当天的日期）
    public payRefDay = new Date().getDate();
    // 基准年份，用于工资周期的基准年份
    public payRefYear = new Date().getFullYear();
    // 基准月份，用于工资周期的基准月份
    public payRefMonth = new Date().getMonth();
    // 基准日期，用于工资周期的基准日期，默认为今天
    public payRefDate: Date = startOfToday(); // 使用 date-fns 中的 `startOfToday()` 函数来获取当天的开始时间
}

// 月设置类，用于定义月的显示设置
export class MonthSettings {
    // 是否显示月视图
    public showMonth: boolean = true;
    // 月跳跃设置（每隔 1 个月）
    public monthSkip: number = 1;
    // 月的日期格式
    public fmtMonth: string = 'MMMMM';
}

// 季度设置类，用于定义季度的显示设置
export class QuarterSettings {
    // 是否显示季度视图
    public showQuarter: boolean = false;
    // 季度的日期格式
    public fmtQuarter: string = 'QQQ';
    // 季度跳跃设置（每隔 1 个季度）
    public quarterSkip: number = 1;
}

// 年设置类，用于定义年的显示设置
export class YearSettings {
    // 是否显示年视图
    public showYear: boolean = true;
    // 年的日期格式
    public fmtYear: string = 'yyyy';
    // 年跳跃设置（每隔 1 年）
    public yearSkip: number = 1;
}
