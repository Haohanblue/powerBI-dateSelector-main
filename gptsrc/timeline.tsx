// 导入React模块及Material-UI的Box和Grid组件
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

// 导入自定义的DateMove和RangeSlider组件
import DateMove from "./datemove";
import RangeSlider from "./rangeslider";

// 定义Timeline组件，接收多个属性来控制日期范围滑动条和日期移动按钮的显示
function Timeline({
  dates,                // 日期数据数组
  rangeScope,           // 日期范围范围，控制滑动条的范围
  stepValue,            // 步长值，控制滑动条和按钮的步长
  payProps,             // 传递给组件的自定义属性对象
  handleVal,            // 更新值的回调函数
  show2ndSlider,        // 布尔值，指示是否显示第二个滑动条
  weekStartDay,         // 每周的起始日，用于滑动条的日期选择
  yearStartMonth,       // 每年的起始月，用于滑动条的日期选择
  stepSkip,             // 跳过的步数，控制滑动条的步进调整
  stepFmt               // 步长格式，用于格式化滑动条显示的日期
}) {
  return (
    <>
      {/* 使用Grid布局包含DateMove组件和RangeSlider组件 */}
      {/* 第一个DateMove按钮，用于日期向后的移动 */}
      <Grid xs="auto">
        <Box>
          <DateMove
            dates={dates}              // 传入的日期数据
            rangeScope={rangeScope}     // 日期范围，用于限制日期移动范围
            stepValue={stepValue}       // 移动的步长
            payProps={payProps}         // 自定义属性，传递给DateMove组件
            handleVal={handleVal}       // 更新值的回调函数
            bf={"b"}                    // 指定“后退”方向
            vertical={true}             // 垂直方向布局
            viz={true}                  // 显示组件
          />
        </Box>
      </Grid>

      {/* 第二个DateMove按钮，用于日期向前的移动 */}
      <Grid xs="auto">
        <Box>
          <DateMove
            dates={dates}              // 传入的日期数据
            rangeScope={rangeScope}     // 日期范围，用于限制日期移动范围
            stepValue={stepValue}       // 移动的步长
            payProps={payProps}         // 自定义属性，传递给DateMove组件
            handleVal={handleVal}       // 更新值的回调函数
            bf={"f"}                    // 指定“前进”方向
            vertical={true}             // 垂直方向布局
            viz={true}                  // 显示组件
          />
        </Box>
      </Grid>

      {/* 日期范围滑动条 */}
      <Grid xs marginLeft={1} paddingTop={0.3}>
        <RangeSlider
          dates={dates}                // 日期数据数组
          payProps={payProps}          // 自定义属性，传递给RangeSlider组件
          rangeScope={rangeScope}      // 日期范围，用于滑动条范围的控制
          stepFmt={stepFmt}            // 步长格式，控制显示的日期格式
          stepValue={stepValue}        // 步长值，控制滑动条的步进
          stepSkip={stepSkip}          // 步数跳过的数量，用于控制滑动条的精度
          weekStartDay={weekStartDay}  // 每周的起始日，控制日期选择的开始
          yearStartMonth={yearStartMonth} // 每年的起始月，控制日期选择的开始
          handleVal={handleVal}        // 更新值的回调函数
          show2ndSlider={show2ndSlider} // 是否显示第二个滑动条
        />
      </Grid>
    </>
  );
}

// 导出Timeline组件，供其他模块使用
export default Timeline;
