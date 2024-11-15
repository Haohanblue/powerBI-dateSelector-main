// 导入 React 和其他需要的组件与模块
import * as React from "react";
import Box from "@mui/material/Box"; // Box组件，用于容器布局
import Grid from "@mui/material/Unstable_Grid2"; // Grid布局组件，用于响应式网格布局
import Zoom from "@mui/material/Zoom"; // Zoom动画组件，用于渐变显示效果
import DateInput from "./dateinput"; // 导入自定义的日期输入组件
import UseCurrent from "./usecurrent"; // 导入自定义的"使用当前日期"组件
import ToggleSliderButton from "./togglesliderbutton"; // 导入自定义的切换滑块按钮组件
import { topRowProps } from "./interface"; // 导入接口定义，用于类型检查

// 定义 TopRow 组件，接收 topRowProps 类型的 props
const TopRow: React.FC<topRowProps> = ({
  openSlider, // 控制滑块的开启状态
  toggleSlider, // 切换滑块开启/关闭的回调函数
  dates, // 日期数据
  rangeScope, // 日期范围作用域
  payProps, // 传递给子组件的额外属性
  handleVal, // 日期值变更的处理函数
  stepViz, // 控制步进器的可视状态
  stepOpen, // 控制步进器的开启状态
  stepValue, // 步进器的当前值
  handleClick, // 点击事件处理函数
  setStepValue, // 更新步进器值的函数
  setStepOpen, // 控制步进器开启状态的函数
  vizOpt, // 可视化选项，用于自定义显示效果
  showCurrent, // 控制是否显示当前日期
  showIconText, // 控制是否显示图标文本
  current, // 当前日期值
}) => {
  // 返回 TopRow 组件的布局
  return (
    <Grid container rowSpacing={0.3} paddingLeft={0.3} xs={12}>
      {/* 左侧的切换滑块按钮 */}
      <Grid xs="auto">
        <ToggleSliderButton
          openSlider={openSlider} // 滑块开启状态
          toggleSlider={toggleSlider} // 切换滑块状态的回调
        />
      </Grid>

      {/* 日期输入组件 */}
      <DateInput
        dates={dates} // 日期数据
        rangeScope={rangeScope} // 日期范围
        payProps={payProps} // 其他属性
        handleVal={handleVal} // 日期值变更的处理函数
        stepViz={stepViz} // 步进器可视状态
        openSlider={openSlider} // 滑块开启状态
        stepOpen={stepOpen} // 步进器开启状态
        stepValue={stepValue} // 步进器当前值
        handleClick={handleClick} // 点击事件处理函数
        handleStep={setStepValue} // 更新步进器值的函数
        handleViz={setStepOpen} // 控制步进器开启状态的函数
      />

      {/* 使用当前日期按钮，带有动画效果 */}
      <Grid xs="auto">
        <Zoom in={!stepOpen}> {/* 当步进器关闭时显示 "使用当前" 组件 */}
          <Box>
            <UseCurrent
              rangeScope={rangeScope} // 日期范围
              vizOpt={vizOpt} // 可视化选项
              showCurrent={showCurrent} // 是否显示当前日期
              showIconText={showIconText} // 是否显示图标文本
              handleStep={setStepValue} // 更新步进器值
              handleVal={handleVal} // 日期值变更的处理函数
              current={current} // 当前日期值
              stepValue={stepValue} // 步进器当前值
            />
          </Box>
        </Zoom>
      </Grid>

      {/* 右侧占位的空格 */}
      <Grid xs>
        <Box></Box>
      </Grid>
    </Grid>
  );
};

// 导出 TopRow 组件，供其他模块使用
export default TopRow;
