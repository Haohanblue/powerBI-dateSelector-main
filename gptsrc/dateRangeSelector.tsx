// 导入 React 和其他需要的组件与模块
import * as React from "react";
import { format } from "date-fns"; // 导入日期格式化库
import DateRangeCard from "./daterangecard"; // 导入自定义的日期范围卡片组件
import { dateCardProps } from "./interface"; // 导入日期卡片属性的接口类型
import { initialState } from "./initstate"; // 导入初始状态
import { Typography } from "@mui/material"; // 导入 Material UI 的 Typography 组件，用于文本显示

// 定义 DateCardClass 类组件，继承自 React.Component
// 该组件接收一个 onChanged 函数作为 props，并且维护 dateCardProps 类型的 state
export default class DateCardClass extends React.Component<
  { onChanged: (arg0: any) => void }, // props 定义
  dateCardProps // state 类型
> {
  // 静态变量，用于存储一个回调函数，可以更新组件的状态
  private static updateCallback?: (data: object) => void = null;

  // 公共属性，用于标记日期数据是否已加载
  public datesLoaded: boolean;

  // 静态方法，用于从外部更新组件的状态
  public static update(newState: dateCardProps) {
    if (typeof DateCardClass.updateCallback === "function") {
      DateCardClass.updateCallback(newState); // 调用回调函数更新状态
    }
  }

  // 组件的初始状态，使用导入的 initialState
  public state: dateCardProps = initialState;

  // 构造函数，初始化组件
  constructor(props: any) {
    super(props);
    this.state = initialState; // 设置初始状态
    if (!this.state.dates) this.state.dates = this.state.rangeScope; // 如果 dates 为空，默认使用 rangeScope
    this.onDateChanged = this.onDateChanged.bind(this); // 绑定事件处理函数的 this
  }

  // 日期改变的处理函数，接收一个日期数组作为参数
  public onDateChanged = (e: Date[]) => {
    console.log("onDateChanged", e);
    
    // 判断日期数组是否有效，且与当前 state 中的日期不同
    if (
      e.length &&
      (format(e[0], "dd-MM-yyyy") !==
        format(this.state.dates.start, "dd-MM-yyyy") ||
        format(e[1], "dd-MM-yyyy") !==
          format(this.state.dates.end, "dd-MM-yyyy"))
    ) {
      // 更新组件的状态，设置新的日期范围
      this.setState({
        dates: {
          start: e[0],
          end: e[1]
        }
      });
      // 调用父组件传入的 onChanged 回调函数
      this.props.onChanged(e);
    }
  };

  // 组件挂载时的生命周期方法
  public componentDidMount() {
    // 设置静态回调函数，允许通过静态方法更新组件状态
    DateCardClass.updateCallback = (newState: dateCardProps): void => {
      this.setState(newState); // 更新组件状态
    };
  }

  // 组件卸载时的生命周期方法
  public componentWillUnmount() {
    // 清除静态回调函数，防止内存泄漏
    DateCardClass.updateCallback = null;
  }

  // 渲染组件
  render() {
    // 从 state 中解构出各个属性
    const {
      dates,
      rangeScope,
      stepViz,
      vizOpt,
      stepFmt,
      stepSkip,
      stepInit,
      stepPeriod,
      payProps,
      fmtDate,
      weekStartDay,
      yearStartMonth,
      showSlider,
      show2ndSlider,
      showCurrent,
      themeColor,
      themeFont,
      themeMode,
      showIconText,
      showHelpIcon
    } = this.state;

    // 如果 rangeScope.start 有值，渲染 DateRangeCard 组件，否则显示提示文本
    return this.state.rangeScope.start ? (
      <>
        <DateRangeCard
          dates={dates} // 当前日期范围
          rangeScope={rangeScope} // 日期范围作用域
          vizOpt={vizOpt} // 可视化选项
          stepViz={stepViz} // 步进器的可视状态
          stepFmt={stepFmt} // 步进器的格式
          stepSkip={stepSkip} // 步进器跳过的步数
          stepInit={stepInit} // 步进器的初始值
          stepPeriod={stepPeriod} // 步进器的周期
          payProps={payProps} // 传递给子组件的额外属性
          fmtDate={fmtDate} // 日期格式
          weekStartDay={weekStartDay} // 周起始日
          yearStartMonth={yearStartMonth} // 年度起始月
          showSlider={showSlider} // 是否显示滑块
          showCurrent={showCurrent} // 是否显示当前日期
          themeColor={themeColor} // 主题颜色
          themeFont={themeFont} // 主题字体
          themeMode={themeMode} // 主题模式（亮/暗）
          showIconText={showIconText} // 是否显示图标文本
          showHelpIcon={showHelpIcon} // 是否显示帮助图标
          handleVal={this.onDateChanged} // 日期改变的处理函数
          show2ndSlider={show2ndSlider} // 是否显示第二个滑块
        />
      </>
    ) : (
      // 如果 rangeScope.start 没有值，显示错误提示文本
      <>
        <Typography variant="h5" ml={2} mt={3}>
          Blank dates are not supported.
        </Typography>
        <Typography variant="body2" m={2}>
          Please add a valid source date column or filter out the blanks.
        </Typography>
      </>
    );
  }
}
