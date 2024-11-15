import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Zoom from "@mui/material/Zoom";
import { ValueLabel } from "./rngetooltip";
import { style, styleB, styleT } from "./sliderstyles";

// 定义 DualSlider 组件的属性接口
interface DualSliderProps {
  value: number[]; // 当前滑块值（范围）
  step: number | null; // 滑块步长
  showBottomSlider: boolean; // 是否显示底部滑块
  mainMarks: Array<{
    value: number;
    label: string;
  }>; // 主滑块的刻度标记
  superMarks: Array<{
    value: number;
    label: string;
  }>; // 底部滑块的刻度标记
  max: number; // 滑块的最大值
  valueLabelFormat: (value: number) => string; // 值标签的格式化函数
  handleTopCommit: (e: Event, val: number[]) => void; // 顶部滑块的提交事件处理函数
  handleBottomCommit: (e: Event, val: number[]) => void; // 底部滑块的提交事件处理函数
  onChange: (
    event: Event,
    value: number | number[],
    activeThumb?: number
  ) => void; // 滑块值变化时的事件处理函数
  onClick?: (event: React.SyntheticEvent) => void; // 点击滑块时的事件处理函数（可选）
}

// DualSlider 组件定义，渲染一个具有上下双滑块的组件
function DualSlider(props: DualSliderProps): JSX.Element {
  // 解构传入的属性
  const {
    value, // 当前滑块的值
    step, // 步长
    showBottomSlider, // 是否显示底部滑块
    handleTopCommit, // 顶部滑块提交事件处理函数
    handleBottomCommit, // 底部滑块提交事件处理函数
    mainMarks, // 主滑块的刻度标记
    superMarks, // 底部滑块的刻度标记
    max, // 滑块的最大值
    valueLabelFormat, // 格式化滑块标签的函数
    onChange, // 滑块值变化的事件处理函数
    onClick // 点击滑块的事件处理函数（可选）
  } = props;

  return (
    <Box sx={{ height: "55px" }}>
      {/* 顶部滑块容器 */}
      <Box>
        <Slider
          name="top" // 滑块的名称
          key="slider1" // 唯一键值
          size="small" // 滑块尺寸
          color="primary" // 滑块颜色
          value={value} // 滑块的当前值
          onChangeCommitted={handleTopCommit} // 提交时触发的事件
          onChange={onChange} // 值变化时触发的事件
          onClick={onClick} // 点击事件
          step={step} // 步长
          marks={mainMarks} // 滑块的刻度标记
          valueLabelDisplay="auto" // 自动显示值标签
          components={{
            ValueLabel: ValueLabel // 自定义标签组件
          }}
          valueLabelFormat={valueLabelFormat} // 标签格式化函数
          min={0} // 最小值
          max={max} // 最大值
          sx={Object.assign({}, style, styleT)} // 自定义样式
        />
      </Box>

      {/* 底部滑块容器，使用 Zoom 动画控制显示 */}
      <Zoom in={showBottomSlider}>
        <Box component="span" height={"10px"}>
          <Slider
            name="bottom" // 滑块的名称
            key="slider2" // 唯一键值
            size="small" // 滑块尺寸
            color="primary" // 滑块颜色
            value={value} // 滑块的当前值
            onChange={onChange} // 值变化时触发的事件
            onChangeCommitted={handleBottomCommit} // 提交时触发的事件
            step={null} // 无步长（自由滑动）
            max={max} // 最大值
            marks={superMarks} // 滑块的刻度标记
            components={{
              ValueLabel: ValueLabel // 自定义标签组件
            }}
            valueLabelDisplay="auto" // 自动显示值标签
            valueLabelFormat={valueLabelFormat} // 标签格式化函数
            aria-labelledby="range-slider2" // 辅助功能标签 ID
            getAriaValueText={valueLabelFormat} // 辅助功能值文本
            min={0} // 最小值
            sx={Object.assign({}, style, styleB)} // 自定义样式
          />
        </Box>
      </Zoom>
    </Box>
  );
}

export default DualSlider;
