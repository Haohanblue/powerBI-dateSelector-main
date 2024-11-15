// 定义 dateCardProps 接口，用于描述 DateCard 组件的属性
export interface dateCardProps {
  dates?: dateRange; // 当前选择的日期范围
  rangeScope?: dateRange; // 可选择的日期范围
  stepViz?: stepBool; // 控制每个时间步长的可视化
  vizOpt?: boolean; // 可视化选项开关
  stepFmt?: stepString; // 各个步长的格式化字符串
  stepSkip?: stepNum; // 各个步长的跳跃步数
  stepInit?: string; // 初始显示的粒度格式
  stepPeriod?: string; // 当前步长周期
  payProps?: pay; // 与支付周期相关的设置
  fmtDate?: string; // 日期的格式化字符串
  weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 周的起始日
  yearStartMonth?: number; // 年的起始月
  showSlider?: boolean; // 是否显示滑动条
  show2ndSlider?: boolean; // 是否显示第二个滑动条
  showCurrent?: boolean; // 是否显示当前时间
  themeColor?: string; // 主题颜色
  themeFont?: any; // 主题字体
  themeMode?: any; // 主题模式（如亮暗模式）
  showHelpIcon?: boolean; // 是否显示帮助图标
  handleVal?: (val) => void; // 值更改的回调函数
  showIconText?: boolean; // 是否显示图标文本
}

// 定义 topRowProps 接口，用于描述顶部行组件的属性
export interface topRowProps {
  openSlider: boolean; // 是否打开滑动条
  toggleSlider: () => void; // 切换滑动条的回调
  dates?: dateRange; // 当前选择的日期范围
  rangeScope?: dateRange; // 可选择的日期范围
  payProps: any; // 支付周期相关属性
  handleVal?: (val) => void; // 值更改的回调函数
  stepViz?: stepBool; // 控制每个时间步长的可视化
  stepOpen: boolean; // 步长选项是否打开
  stepValue: string; // 当前选择的步长值
  handleClick: () => void; // 点击事件回调
  setStepValue: (value: string) => void; // 设置步长值的函数
  setStepOpen: (value: boolean) => void; // 设置步长选项是否打开的函数
  vizOpt: boolean; // 可视化选项开关
  showCurrent: boolean; // 是否显示当前时间
  showIconText: boolean; // 是否显示图标文本
  current: any; // 当前时间相关属性
}

// 定义 DateMoveProps 接口，用于描述日期移动组件的属性
export interface DateMoveProps {
  dates?: dateRange; // 当前选择的日期范围
  rangeScope?: dateRange; // 可选择的日期范围
  stepValue?: string; // 当前选择的步长值
  payProps?: pay; // 支付周期相关属性
  bf?: string; // 方向标识符
  viz?: boolean; // 是否可视化
  vertical?: boolean; // 是否垂直显示
  reverse?: boolean; // 是否反转
  render?: number; // 渲染标识符
  handleVal?: (val) => void; // 值更改的回调函数
}

// 定义 stepProps 接口，用于描述步长选择组件的属性
export interface stepProps {
  stepViz?: stepBool; // 控制每个时间步长的可视化
  stepValue?: string; // 当前选择的步长值
  payProps?: pay; // 支付周期相关属性
  viz?: boolean; // 是否可视化
  handleStep?: (newValue: string) => void; // 更改步长的回调函数
  handleViz?: (viz: boolean) => void; // 切换可视化的回调函数
  onClick?: (event: React.MouseEvent<HTMLElement>) => void; // 点击事件回调
}

// 定义 UseCurrentProps 接口，用于描述当前时间的属性
export interface UseCurrentProps {
  rangeScope?: dateRange; // 可选择的日期范围
  weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 周的起始日
  yearStartMonth?: number; // 年的起始月
  payProps?: pay; // 支付周期相关属性
  stepViz?: stepBool; // 控制每个时间步长的可视化
  showCurrent?: boolean; // 是否显示当前时间
  stepValue?: string; // 当前选择的步长值
  showIconText?: boolean; // 是否显示图标文本
  vizOpt?: boolean; // 可视化选项开关
  current: any; // 当前时间相关属性
  handleVal?: (val) => void; // 值更改的回调函数
  handleStep?: (newValue: string) => void; // 更改步长的回调函数
  handleViz?: (viz: boolean) => void; // 切换可视化的回调函数
}

// 定义 DateRangeProps 接口，用于描述日期范围选择组件的属性
export interface DateRangeProps {
  dates: dateRange; // 当前选择的日期范围
  rangeScope?: dateRange; // 可选择的日期范围
  handleVal?: (val) => void; // 值更改的回调函数
  fmtDate?: string; // 日期的格式化字符串
}

// 定义 SliderProps 接口，用于描述滑动条组件的属性
export interface SliderProps {
  dates?: dateRange; // 当前选择的日期范围
  rangeScope?: dateRange; // 可选择的日期范围
  weekStartDay?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 周的起始日
  yearStartMonth?: number; // 年的起始月
  stepValue?: string; // 当前选择的步长值
  payProps?: pay; // 支付周期相关属性
  stepFmt?: stepString; // 各个步长的格式化字符串
  stepSkip?: stepNum; // 各个步长的跳跃步数
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // 点击事件回调
  handleVal?: (val) => void; // 值更改的回调函数
  toggleSlider?: () => void; // 切换滑动条的回调函数
  show2ndSlider?: boolean; // 是否显示第二个滑动条
  handleStep?: (val) => void; // 更改步长的回调函数
}

// 定义 dateRange 接口，表示日期范围
export interface dateRange {
  start: Date; // 开始日期
  end: Date; // 结束日期
}

// 定义 stepBool 接口，表示每个时间步长的可视化控制
export interface stepBool {
  day: boolean;
  week: boolean;
  pay: boolean;
  month: boolean;
  quarter: boolean;
  year: boolean;
}

// 定义 stepString 接口，表示每个时间步长的格式化字符串
interface stepString {
  day: string;
  week: string;
  pay: string;
  month: string;
  quarter: string;
  year: string;
}

// 定义 stepNum 接口，表示每个时间步长的跳跃步数
interface stepNum {
  day: number;
  week: number;
  pay: number;
  month: number;
  quarter: number;
  year: number;
}

// 定义 pay 接口，表示支付周期相关属性
interface pay {
  desc: string; // 支付周期描述
  ref: Date; // 基准日期
  len: number; // 支付周期的长度（例如天数）
}

// 定义 current 接口，表示当前时间的属性
export interface current {
  tip: string; // 提示信息
  show: boolean; // 是否显示当前时间
  thisPeriod: string; // 当前周期
  thisRange: any; // 当前范围
  icon: JSX.Element; // 图标
}
