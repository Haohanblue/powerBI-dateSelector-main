// 导入 React 和其他需要的组件与模块
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid布局组件，用于创建响应式布局
import Zoom from "@mui/material/Zoom"; // Zoom动画组件，用于实现渐入渐出效果
import { createTheme, ThemeProvider } from "@mui/material/styles"; // 用于创建和应用主题
import { useHotkeys } from "react-hotkeys-hook"; // 导入热键钩子，用于绑定快捷键
import TopRow from "./daterangetoprow"; // 导入顶部控件行组件
import Timeline from "./timeline"; // 导入时间轴组件
import { dateCardProps } from "./interface"; // 导入日期卡片属性的接口定义
import { dateMoveKeys } from "./datemovekeys"; // 导入处理日期移动的快捷键函数
import { Increment } from "./dateutils"; // 导入日期增量函数
import { HelpProvider } from "./helpprovider"; // 导入帮助提供者，用于显示帮助图标

// 定义 DateRangeCard 函数组件，接收 dateCardProps 类型的 props
export default function DateRangeCard(props: dateCardProps) {
  // 从 props 中解构出各个参数
  const {
    dates,
    rangeScope,
    weekStartDay,
    yearStartMonth,
    stepInit,
    stepSkip,
    stepViz,
    vizOpt,
    stepFmt,
    payProps,
    themeColor,
    themeFont,
    themeMode,
    showCurrent,
    showIconText,
    show2ndSlider,
    handleVal,
    showSlider,
    showHelpIcon,
  } = props;

  // 创建主题，设置颜色、字体和模式
  const theme = createTheme({
    palette: {
      mode: themeMode, // 主题模式（亮/暗）
      primary: {
        main: themeColor, // 主题的主色
      },
    },
    typography: {
      fontFamily: themeFont, // 主题字体
    },
  });

  // 使用状态管理滑块和步进器的相关状态
  const [openSlider, setOpenSlider] = React.useState<boolean>(showSlider); // 控制滑块的显示状态
  const [stepValue, setStepValue] = React.useState<string>(stepInit); // 当前步进器的值
  const [stepOpen, setStepOpen] = React.useState<boolean>(false); // 控制步进器的开启状态

  // 计算当前日期增量，使用 useMemo 缓存计算结果，避免重复计算
  const current = React.useMemo(() => {
    return Increment(
      stepViz,
      weekStartDay,
      yearStartMonth,
      payProps,
      vizOpt,
      rangeScope
    );
  }, [stepViz, weekStartDay, yearStartMonth, payProps, vizOpt, rangeScope]);

  // 使用 useEffect 钩子，在 showSlider 或 stepInit 变化时更新状态
  React.useEffect(() => {
    setOpenSlider(showSlider);
  }, [showSlider]);
  React.useEffect(() => {
    setStepValue(stepInit);
  }, [stepInit]);

  // 切换滑块显示状态的函数
  const toggleSlider = () => {
    setOpenSlider(!openSlider);
  };

  // 调用 dateMoveKeys 函数，用于绑定键盘事件处理日期移动
  dateMoveKeys(handleVal, stepValue, dates, current);

  // 使用 useHotkeys 钩子，绑定键盘 "s" 键切换滑块状态
  useHotkeys("s", () => toggleSlider(), [openSlider]);

  // 渲染组件
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* 使用 HelpProvider 包裹组件，以便显示帮助图标 */}
        <HelpProvider showHelpIcon={showHelpIcon}>
          {/* 顶部控件行，包含滑块开关按钮和日期选择控件 */}
          <TopRow
            openSlider={openSlider} // 当前滑块的开启状态
            toggleSlider={toggleSlider} // 切换滑块状态的回调函数
            dates={dates} // 日期范围数据
            rangeScope={rangeScope} // 日期范围的作用域
            payProps={payProps} // 传递的额外属性
            handleVal={handleVal} // 日期值变更的处理函数
            stepViz={stepViz} // 步进器的可视状态
            stepOpen={stepOpen} // 当前步进器的开启状态
            stepValue={stepValue} // 当前步进器的值
            handleClick={() => setStepOpen(!stepOpen)} // 步进器的开关事件
            setStepOpen={setStepOpen} // 设置步进器开启状态的函数
            vizOpt={vizOpt} // 可视化选项
            showCurrent={showCurrent} // 是否显示当前日期
            showIconText={showIconText} // 是否显示图标文本
            setStepValue={setStepValue} // 更新步进器值的函数
            current={current} // 当前日期增量值
          />
          {/* 使用 Zoom 动画控制时间轴的显示，当滑块关闭时显示时间轴 */}
          <Zoom in={!openSlider}>
            <Grid container spacing={0} xs={12}>
              <Timeline
                dates={dates} // 日期范围数据
                rangeScope={rangeScope} // 日期范围的作用域
                stepValue={stepValue} // 当前步进器的值
                payProps={payProps} // 传递的额外属性
                handleVal={handleVal} // 日期值变更的处理函数
                stepFmt={stepFmt} // 步进器的格式
                stepSkip={stepSkip} // 步进器跳过的步数
                weekStartDay={weekStartDay} // 周起始日
                yearStartMonth={yearStartMonth} // 年度起始月
                show2ndSlider={show2ndSlider} // 是否显示第二个滑块
              />
            </Grid>
          </Zoom>
        </HelpProvider>
      </ThemeProvider>
    </>
  );
}
