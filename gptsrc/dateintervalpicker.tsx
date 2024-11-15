// 导入 React 和其他需要的组件与模块
import React, { useState } from "react";
import { Box, Popover, TextField } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener"; // 用于点击组件外部时关闭组件
import Paper from "@mui/material/Paper"; // Paper 组件，用于容器
import { Interval, subDays } from "date-fns"; // date-fns 库中的 Interval 类型和 subDays 函数
import { getIntervalFunction } from "./dateutils"; // 自定义的日期工具函数
import IconButton from "@mui/material/IconButton"; // IconButton 组件，用于图标按钮
import RefreshIcon from "@mui/icons-material/Refresh"; // 重置按钮图标
import CheckIcon from "@mui/icons-material/Check"; // 确认按钮图标
import RngeTooltip from "./rngetooltip"; // 自定义的提示工具组件

// 定义 IntervalParmsProps 接口，用于 IntervalParms 组件的属性
interface IntervalParmsProps {
  setIntervalValue: (value: number) => void; // 设置间隔值的函数
  handleClose: () => void; // 关闭弹出窗口的函数
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // 输入框变更的处理函数
  intervalValue: number; // 当前间隔值
  stepValue: string; // 步长单位（如 "day", "week"）
}

// IntervalParms 组件，接收 IntervalParmsProps 类型的 props
const IntervalParms: React.FC<IntervalParmsProps> = ({
  setIntervalValue,
  handleClose,
  handleInputChange,
  intervalValue,
  stepValue,
}) => {
  return (
    <>
      <RngeTooltip
        title={undefined}
        topRow={`Number of ${stepValue}s from today`} // 顶部行文本，显示步长单位
        detailRow={`Set the date range by adding or subtracting ${stepValue}s. Click away to save & close.`}
        placement="left" // 提示在左侧显示
      >
        <TextField
          variant="outlined"
          type="number" // 数字输入框，用于输入间隔值
          onChange={handleInputChange} // 输入值变更处理
          sx={{ width: 76 }}
          value={intervalValue} // 当前间隔值
          size="small"
        />
      </RngeTooltip>
      <RngeTooltip title={`Save & Close`} placement="top">
        <IconButton size="small" onClick={handleClose}> {/* 确认按钮 */}
          <CheckIcon />
        </IconButton>
      </RngeTooltip>
      <RngeTooltip title={`Reset to 0`} placement="top">
        <IconButton size="small" onClick={() => setIntervalValue(0)}> {/* 重置按钮 */}
          <RefreshIcon />
        </IconButton>
      </RngeTooltip>
    </>
  );
};

// 定义 DateIntervalPickerProps 接口，用于 DateIntervalPicker 组件的属性
interface DateIntervalPickerProps {
  children: React.ReactNode; // 嵌套的子组件
  baseDate?: Date; // 基准日期，默认为当前日期
  stepValue: string; // 步长单位（如 "day", "week"）
  handleVal?: (interval: Interval) => void; // 回调函数，返回选定的日期区间
}

// DateIntervalPicker 组件，用于选择日期间隔
const DateIntervalPicker: React.FC<DateIntervalPickerProps> = ({
  children,
  baseDate = new Date(), // 默认基准日期为当前日期
  stepValue,
  handleVal,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // 弹出框的锚点
  const [isOpen, setIsOpen] = useState<boolean>(false); // 控制弹出框的打开状态
  const [intervalValue, setIntervalValue] = useState<number>(0); // 间隔值（整数）
  const [interval, setInterval] = useState<Interval>({ // 选定的日期区间
    start: null,
    end: null,
  });

  // 处理右键点击事件，打开或关闭弹出框
  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isOpen) {
      const target = event.target as HTMLElement;
      setAnchorEl(target);
      setIsOpen(true); // 打开弹出框
    } else {
      setIsOpen(false); // 关闭弹出框
    }
  };

  // 关闭弹出框，并在间隔值不为 0 时调用回调函数传递选定的日期区间
  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
    if (intervalValue !== 0) {
      handleVal(interval); // 传递选定的日期区间
    }
  };

  // 处理输入框中的值变化，计算新的日期区间
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) {
      return;
    }
    if (value === "" || numValue === 0) {
      setIntervalValue(0); // 重置间隔值
      return;
    }
    // 获取用于计算日期间隔的函数
    const intervalFn = getIntervalFunction(stepValue);
    const newDate = subDays(
      intervalFn(baseDate, numValue), // 计算新的日期
      stepValue === "day" ? 0 : numValue < 0 ? -1 : 1
    );
    // 更新日期区间的起始和结束日期
    setInterval({
      start: numValue >= 0 ? baseDate : newDate,
      end: numValue < 0 ? baseDate : newDate,
    });
    setIntervalValue(numValue); // 更新间隔值
    setIsOpen(true);
  };

  // 渲染组件
  return (
    <>
      {/* 右键点击 Box 组件时触发弹出框 */}
      <Box sx={{ maxHeight: 18 }} onContextMenu={handleContextMenu}>
        <Popover
          open={isOpen} // 控制弹出框的显示
          sx={{ zIndex: 1000 }}
          anchorEl={anchorEl} // 设置弹出框的锚点
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {/* 点击外部时关闭弹出框 */}
          <ClickAwayListener onClickAway={handleClose}>
            <Paper
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "6px",
              }}
            >
              {/* IntervalParms 组件，用于输入间隔值并提供保存和重置功能 */}
              <IntervalParms
                setIntervalValue={() => setIntervalValue(0)} // 设置间隔值为 0
                handleClose={handleClose} // 关闭弹出框
                handleInputChange={handleInputChange} // 处理输入框的值变更
                intervalValue={intervalValue} // 当前间隔值
                stepValue={stepValue} // 步长单位
              />
            </Paper>
          </ClickAwayListener>
        </Popover>
        {children} {/* 渲染子组件 */}
      </Box>
    </>
  );
};

export default DateIntervalPicker;
