// 初始化状态配置文件，用于定义 DateCard 组件的初始状态
import { endOfYear, startOfYear, startOfToday } from "date-fns";
import { dateCardProps } from "./interface";

// 定义 DateCard 组件的初始状态，遵循 dateCardProps 接口
export const initialState: dateCardProps = {
  // 日期范围的初始范围，默认为当前年份
  rangeScope: {
    start: startOfYear(startOfToday()), // 设置为今年的开始日期
    end: endOfYear(startOfToday()) // 设置为今年的结束日期
  },
  
  weekStartDay: 0, // 周的起始日，0 代表周日
  yearStartMonth: 0, // 年的起始月，0 代表一月

  // 初始化时间步长，默认为 "week"
  stepInit: "week",

  // 步长的跳跃数量设置
  stepSkip: {
    day: 1, // 日步长为 1
    week: 4, // 周步长为 4
    pay: 4, // 支付周期步长为 4
    month: 1, // 月步长为 1
    quarter: 1, // 季度步长为 1
    year: 1 // 年步长为 1
  },

  // 时间步长的可视化控制，决定各个步长是否显示
  stepViz: {
    day: true, // 显示日步长
    week: true, // 显示周步长
    pay: false, // 不显示支付周期步长
    month: true, // 显示月步长
    quarter: false, // 不显示季度步长
    year: true // 显示年步长
  },

  // 各个步长的格式化字符串，用于在界面上显示日期
  stepFmt: {
    day: "d-MMM", // 日格式：例如 "1-Jan"
    pay: "d-MMM", // 支付周期格式：例如 "1-Jan"
    week: "w", // 周格式：例如 "5" (第5周)
    month: "MMMMM", // 月格式：例如 "J" (1月的首字母)
    quarter: "'Q'Q-yy", // 季度格式：例如 "Q1-23"
    year: "yy" // 年格式：例如 "23"
  },

  // 支付周期的相关属性
  payProps: {
    desc: "Pay-Period", // 支付周期的描述
    ref: new Date("2023-01-1"), // 支付周期的参考日期
    len: 14 // 支付周期的长度（以天数计）
  },

  themeColor: "#607d8b", // 主题颜色，使用灰蓝色
  themeFont: '"Segoe UI", wf_segoe-ui_normal, helvetica, arial, sans-serif', // 主题字体
  themeMode: "light", // 主题模式，默认为浅色模式

  showCurrent: true, // 是否显示当前日期
  showHelpIcon: false, // 是否显示帮助图标
  vizOpt: false, // 是否启用可视化选项
  showIconText: false, // 是否显示图标文本
  showSlider: true, // 是否显示滑动条
  show2ndSlider: true // 是否显示第二个滑动条
};
