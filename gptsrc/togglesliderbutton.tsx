// 导入React模块及Material-UI的IconButton和MoreVertIcon组件
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// 导入自定义的RngeTooltip组件和常量定义的TOGGLE_SLIDER_BUTTON对象
import RngeTooltip from "./rngetooltip";
import { TOGGLE_SLIDER_BUTTON } from "./constants";

// 从TOGGLE_SLIDER_BUTTON常量对象中解构所需的元素
const {
  TopRowOpen,     // 滑动条打开时顶部行的文本内容
  TopRowClosed,   // 滑动条关闭时顶部行的文本内容
  TopRowEnd,      // 顶部行的结尾文本
  DetailRowOpen,  // 滑动条打开时详情行的文本内容
  DetailRowClosed // 滑动条关闭时详情行的文本内容
} = TOGGLE_SLIDER_BUTTON;

// 定义ToggleSliderButton组件的属性接口
interface ToggleSliderButtonProps {
  openSlider: boolean;           // 指示滑动条是否打开的布尔值
  toggleSlider: () => void;      // 切换滑动条状态的回调函数
}

// ToggleSliderButton组件的定义
function ToggleSliderButton({
  openSlider,                     // 当前滑动条的打开状态
  toggleSlider                    // 用于切换滑动条状态的函数
}: ToggleSliderButtonProps) {
  
  // 使用React的useMemo钩子来计算顶部行内容
  const topRow = React.useMemo(
    () => (openSlider ? TopRowClosed : TopRowOpen) + TopRowEnd, // 根据滑动条状态选择内容并附加结尾文本
    [openSlider]                                                // 当openSlider变化时重新计算
  );

  // 使用useMemo钩子计算详情行内容
  const detailRow = React.useMemo(
    () => (openSlider ? DetailRowClosed : DetailRowOpen),       // 根据滑动条状态选择详情行的内容
    [openSlider]                                                // 当openSlider变化时重新计算
  );

  // 返回渲染的IconButton组件，包含了RngeTooltip和MoreVertIcon
  return (
    <IconButton
      aria-label="Toggle Slider"   // 为IconButton添加ARIA标签
      onClick={toggleSlider}       // 点击触发toggleSlider函数来切换滑动条状态
      id="menuToggle"              // 给IconButton指定一个id属性
    >
      {/* RngeTooltip包裹MoreVertIcon，显示滑动条内容提示 */}
      <RngeTooltip
        shortCut={"S"}             // RngeTooltip的快捷键提示
        title={undefined}          // 没有设置标题
        topRow={topRow}            // 顶部行内容
        detailRow={detailRow}      // 详情行内容
        placement="bottom-end"      // 提示框显示在底部靠右
      >
        <MoreVertIcon style={{ fontSize: 16 }} /> {/* 定义图标样式 */}
      </RngeTooltip>
    </IconButton>
  );
}

// 导出ToggleSliderButton组件，使用React.memo来优化性能
export default React.memo(ToggleSliderButton);
