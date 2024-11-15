// 导入 React 和其他需要的组件与模块
import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid 布局组件，用于响应式布局
import Zoom from "@mui/material/Zoom"; // Zoom 动画组件，用于渐入渐出效果
import DateMove from "./datemove"; // 导入自定义的日期移动组件
import DateRange from "./daterange"; // 导入自定义的日期范围选择组件
import StepsMenu from "./stepsmenu"; // 导入步进菜单组件
import StepToggle from "./steptoggle"; // 导入步进切换组件

// 定义 DateInput 组件，接收多个属性作为参数
function DateInput({
  dates,           // 当前日期范围
  rangeScope,      // 日期范围的作用域
  payProps,        // 传递给子组件的额外属性
  handleVal,       // 日期值变更的处理函数
  stepViz,         // 步进器的可视状态
  openSlider,      // 控制滑块的显示状态
  stepOpen,        // 步进菜单的开启状态
  stepValue,       // 当前步进器的值
  handleClick,     // 步进菜单开关的事件处理函数
  handleStep,      // 更新步进器值的函数
  handleViz        // 切换步进器可视状态的函数
}) {
  return (
    <>
      {/* 日期范围选择组件 */}
      <Grid xs="auto">
        <DateRange
          dates={dates}             // 当前日期范围
          rangeScope={rangeScope}    // 日期范围的作用域
          handleVal={handleVal}      // 日期值变更的处理函数
        />
      </Grid>

      {/* 向后移动日期的按钮，带有动画效果，只有当 openSlider 为 true 时显示 */}
      <Zoom in={openSlider}>
        <Grid xs="auto">
          <DateMove
            dates={dates}            // 当前日期范围
            rangeScope={rangeScope}   // 日期范围的作用域
            stepValue={stepValue}     // 当前步进器的值
            payProps={payProps}       // 传递的额外属性
            handleVal={handleVal}     // 日期值变更的处理函数
            bf={"b"}                  // 移动方向为向后 ("b" 表示 back)
            vertical={false}          // 水平布局
            reverse={true}            // 按钮反转方向
            viz={openSlider}          // 控制按钮可视状态
          />
        </Grid>
      </Zoom>

      {/* 步进切换组件 */}
      <Grid xs="auto" paddingRight={1}>
        <StepToggle
          stepViz={stepViz}           // 步进器的可视状态
          stepValue={stepValue}       // 当前步进器的值
          payProps={payProps}         // 传递的额外属性
          viz={stepOpen}              // 步进菜单的开启状态
          handleStep={handleStep}     // 更新步进器值的函数
          onClick={handleClick}       // 步进菜单开关的事件处理函数
        />
      </Grid>

      {/* 步进菜单，带有动画效果，只有当 stepOpen 为 true 时显示 */}
      <Zoom in={stepOpen}>
        <Grid xs="auto">
          <StepsMenu
            stepViz={stepViz}         // 步进器的可视状态
            stepValue={stepValue}     // 当前步进器的值
            payProps={payProps}       // 传递的额外属性
            viz={stepOpen}            // 控制菜单可视状态
            handleStep={handleStep}   // 更新步进器值的函数
            handleViz={handleViz}     // 切换步进器可视状态的函数
          />
        </Grid>
      </Zoom>

      {/* 向前移动日期的按钮，带有动画效果，只有当 openSlider 为 true 时显示 */}
      <Zoom in={openSlider}>
        <Grid xs="auto">
          <DateMove
            dates={dates}            // 当前日期范围
            rangeScope={rangeScope}   // 日期范围的作用域
            stepValue={stepValue}     // 当前步进器的值
            payProps={payProps}       // 传递的额外属性
            handleVal={handleVal}     // 日期值变更的处理函数
            bf={"f"}                  // 移动方向为向前 ("f" 表示 forward)
            vertical={false}          // 水平布局
            reverse={false}           // 按钮不反转方向
            viz={openSlider}          // 控制按钮可视状态
          />
        </Grid>
      </Zoom>
    </>
  );
}

// 导出 DateInput 组件
export default DateInput;
