import * as React from "react";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/system";
import { useHelpContext } from "./helpprovider";

// 定义组件的 Props 类型，包括 TooltipProps 和一些自定义属性
type Props = TooltipProps & {
  shortCut?: string;     // 可选的快捷提示文字
  topRow?: string;       // 顶部行的文本内容
  detailRow?: string;    // 详细行的文本内容
  detailFlag?: boolean;  // 是否显示详细行
};

// 使用 styled 高阶组件创建 RngeTooltip 组件，并通过匿名函数解析属性
const RngeTooltip = styled(({ className, ...props }: Props) => {
  // 从 props 中解构出自定义属性，并从上下文获取帮助提示的相关状态
  const {
    title,
    shortCut,
    topRow,
    detailRow,
    detailFlag = useHelpContext().showHelp, // 默认值从上下文中获取
    ...rest
  } = props;

  // 从上下文中获取是否显示快捷键和当前 Tooltip 是否打开的状态
  const showKey = useHelpContext().showKey;
  const [open, setOpen] = React.useState(useHelpContext().showKey);

  // 关闭 Tooltip 的事件处理函数
  const handleClose = () => {
    setOpen(false);
  };

  // 打开 Tooltip 的事件处理函数
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      {...rest} // 传递其他 TooltipProps 的属性
      classes={{ popper: className }} // 设置 Tooltip 的样式类
      arrow={showKey && shortCut ? false : true} // 根据 showKey 和 shortCut 决定是否显示箭头
      open={open} // 控制 Tooltip 的打开状态
      onClose={handleClose} // Tooltip 关闭时触发
      onOpen={handleOpen} // Tooltip 打开时触发
      title={
        showKey && shortCut ? (
          shortCut // 如果 showKey 为 true 且有 shortCut，则显示 shortCut 文本
        ) : title !== undefined ? (
          title // 如果有 title，则显示 title 内容
        ) : (
          <>
            <div><b>{detailFlag && detailRow && `${topRow}`}</b></div>
            {/* 根据 detailFlag 决定是否显示 detailRow */}
            <div>{detailFlag && detailRow ? `${detailRow}` : `${topRow}`}</div>
          </>
        )
      }
    />
  );
})(({ theme }) => ({
  // 自定义 Tooltip 的样式
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.dark, // 背景颜色
    fontSize: 9, // 字体大小
    fontWeight: 400, // 字体粗细
    maxWidth: 250 // 最大宽度
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.dark, // 箭头颜色
    border: theme.palette.primary.dark // 箭头边框颜色
  }
}));

export default RngeTooltip;

// 定义一个用于显示值标签的组件
interface valueProps {
  children: React.ReactElement; // 子组件
  value: number; // 显示的数值
  index: number; // 用于确定标签位置
}

export function ValueLabel(props: valueProps) {
  const { children, value, index } = props;
  const loc = index === 0 ? "top-end" : "bottom-start"; // 根据 index 确定 Tooltip 的位置
  return (
    <RngeTooltip enterTouchDelay={0} placement={loc} title={value} arrow>
      {children}
    </RngeTooltip>
  );
}
