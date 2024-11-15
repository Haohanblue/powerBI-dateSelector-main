// 定义帮助信息的常量，用于提供快捷键提示和帮助说明
export const HELP_PROVIDER = {
  // 快捷键 "H" 用于帮助模式
  ShortCut: "H",
  // 帮助模式的标题信息
  TopRowHelp: "Date Range Selection - shortcut key (H)",
  // 帮助模式的详细描述
  DetailRowHelp:
    "Click to show descriptions for each aspect of the date range selector.",
  // 信息模式激活的标题信息
  TopRowInfo: "Information Mode Active",
  // 信息模式的详细说明
  DetailRowInfo:
    "Hover over area of the date selector for descriptions. Escape to cancel."
};

// 定义步进切换的常量，用于在时间线中切换不同的时间步长
export const STEP_TOGGLE = {
  // 快捷键 "D, W, P, M, Q, Y" 分别对应天、周、支付期、月、季度、年
  ShortCut: "D, W, P, M, Q, Y",
  // 步进切换的标题信息
  TopRow: "Step Level - ",
  // 步进切换的详细描述
  DetailRow: "Set up the markers on the timeline"
};

// 定义滑块按钮的常量，用于显示或隐藏时间轴
export const TOGGLE_SLIDER_BUTTON = {
  // 快捷键 "S" 用于显示或隐藏时间轴
  ShortCut: "S",
  // 时间轴隐藏时的标题信息
  TopRowOpen: "Hide",
  // 时间轴显示时的标题信息
  TopRowClosed: "Show",
  // 时间轴的附加说明（快捷键提示）
  TopRowEnd: " Timeline (S)",
  // 当时间轴显示时的详细说明
  DetailRowOpen:
    "Click or drag to step markers to select date range or move range (ctrl+click) using top (or bottom) timeline markers.",
  // 当时间轴隐藏时的详细说明
  DetailRowClosed:
    "When displayed, use the timeline steps to drag or move (ctrl+click) to select a date range."
};

// 定义日期工具相关的常量，用于各种日期期间和粒度的提示和描述
export const DATEUTILS = {
  // 不同时间段的名称提示
  periodTip: {
    day: "Day",            // 天
    week: "Week",          // 周
    pay: "Pay",            // 支付期
    month: "Month",        // 月
    quarter: "Quarter",    // 季度
    year: "Year"           // 年
  },
  // 当前时间段的描述
  periodThis: {
    day: "Today",                  // 今天
    week: "This Week",             // 本周
    pay: "This ",                  // 本支付期
    month: "This Month",           // 本月
    quarter: "This Quarter",       // 本季度
    year: "This Year",             // 本年
    range: "Full range",           // 全范围
    more: "more",                  // 更多
    ytd: "YTD",                    // 年初至今
    yearPast: "Year Past",         // 过去一年
    ytdLastMonth: "YTD Last Month",// 截至上月的年初至今
    ytdThisMonth: "YTD This Month" // 截至本月的年初至今
  },
  // 时间段的粒度，用于不同的时间段选择粒度
  periodGranularity: {
    day: "day",                    // 天粒度
    week: "week",                  // 周粒度
    pay: "pay",                    // 支付期粒度
    month: "month",                // 月粒度
    quarter: "quarter",            // 季度粒度
    year: "year",                  // 年粒度
    range: "day",                  // 全范围按天粒度
    ytd: "day",                    // 年初至今按天粒度
    yearPast: "day",               // 过去一年按天粒度
    ytdLastMonth: "month",         // 截至上月按月粒度
    ytdThisMonth: "month"          // 截至本月按月粒度
  }
};

// 定义帮助文本的常量，用于菜单和日期选择器的帮助说明
export const HELP_TEXT = {
  // 菜单切换按钮的帮助信息
  menuToggle: {
    seq: "1",                      // 帮助信息的顺序
    id: "menuToggle",              // 元素ID
    helpText:
      "Tap the vertical menu button to show or hide the timeline date range slider.", // 帮助文本
    isFirst: true,                 // 是否为第一个帮助提示
    shortCut: "T",                 // 快捷键 "T"
    next: "fromDate"               // 下一个帮助提示的ID
  },
  // 开始日期输入框的帮助信息
  fromDate: {
    seq: "2",                      // 帮助信息的顺序
    id: "fromDate",                // 元素ID
    helpText:
      "Enter the start date. Data only updates when you tap outside the field.", // 帮助文本
    shortCut: ""                   // 没有快捷键
  },
  // 结束日期输入框的帮助信息
  toDate: {
    seq: "3",                      // 帮助信息的顺序
    id: "toDate",                  // 元素ID
    helpText:
      "Enter the end date. Data only updates when you tap outside the field.", // 帮助文本
    shortCut: ""                   // 没有快捷键
  }
};
