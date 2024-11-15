// 导入 React 和其他需要的组件与模块
import * as React from "react";
import { useMemo, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton"; // IconButton 组件，用于图标按钮
import Grid from "@mui/material/Unstable_Grid2"; // Grid 布局组件，用于布局
import Box from "@mui/material/Box"; // Box 组件，用于容器布局
import debounce from "lodash.debounce"; // 防抖函数
import { useHotkeys } from "react-hotkeys-hook"; // 用于快捷键绑定的钩子
import { getRange, moveParms } from "./dateutils"; // 日期工具函数
import { DateMoveProps } from "./interface"; // 接口定义
import RngeTooltip from "./rngetooltip"; // 自定义的提示工具

// 定义 DateMove 组件，接收 DateMoveProps 类型的 props
export default function DateMove(props: DateMoveProps) {
  // 从 props 中解构出各个参数
  const { dates, stepValue, bf, vertical, reverse, viz, handleVal } = props;

  // 定义状态变量 ctrl，用于表示是否按下了 shift 键
  const [ctrl, setCtrl] = useState(false);

  // 使用 useMemo 计算移动参数，依赖 bf, vertical, ctrl, 和 stepValue
  const mve = React.useMemo(() => {
    return moveParms(bf, vertical, ctrl, stepValue);
  }, [bf, vertical, ctrl, stepValue]);

  // 使用 useMemo 创建防抖处理的回调函数 debExt
  const debExt = useMemo(
    () =>
      debounce((dt) => handleVal(dt), 500, {
        leading: false, // 延迟开始
        trailing: true  // 结束后执行
      }),
    [handleVal]
  );

  // 清除防抖的回调函数，以防组件卸载时内存泄漏
  useEffect(() => {
    return () => {
      debExt.cancel();
    };
  }, [debExt]);

  // 处理按钮点击事件，根据传入的方向 fn 计算新的日期范围
  const handleClick = (fn: string) => {
    if (handleVal) {
      const newDates = getRange(fn, stepValue, dates); // 计算新的日期范围
      debExt(newDates); // 使用防抖回调更新日期
    }
  };

  // 处理扩展事件，根据 shift 键决定扩展的方向
  const handleExt = (e) => {
    const _ctl = e["shiftKey"]; // 检测是否按下了 shift 键
    const _bf = _ctl ? (mve.isBack ? "f" : "b") : bf; // 根据 shift 确定方向
    const fn = _ctl ? "r" + _bf : "e" + _bf; // 扩展范围或缩小范围
    handleClick(fn);
  };

  // 绑定 shift 键的快捷键事件，用于控制 ctrl 状态
  useHotkeys("shift", () => setCtrl(true), { keydown: true }, [ctrl]);
  useHotkeys("shift", () => setCtrl(false), { keyup: true }, [ctrl]);

  // 渲染组件
  return (
    <>
      {viz && ( // 如果 viz 为 true，显示按钮
        <Grid
          container
          direction={reverse ? "row-reverse" : vertical ? "column" : "row"} // 布局方向
        >
          {/* 向前或向后移动的按钮 */}
          <Box>
            <IconButton
              key={mve.iconLabel + reverse + vertical + stepValue} // 唯一键
              aria-label={mve.iconLabel + " a " + stepValue} // 无障碍标签
              size="small"
              onClick={() => handleClick(bf)} // 点击时调用 handleClick
            >
              <RngeTooltip
                title={undefined}
                topRow={mve.topRow1} // 提示的顶部文本
                detailRow={mve.detailRow1} // 提示的详细文本
                placement={mve.placement} // 提示显示位置
              >
                {mve.iconT} {/* 显示图标 */}
              </RngeTooltip>
            </IconButton>
          </Box>

          {/* 扩展或缩小范围的按钮 */}
          <Box>
            <IconButton
              key={mve.placement + reverse + vertical + stepValue} // 唯一键
              id="eb"
              aria-label={mve.placement + " a " + stepValue} // 无障碍标签
              size="small"
              onClick={handleExt} // 点击时调用 handleExt
            >
              <RngeTooltip
                title={undefined}
                topRow={mve.topRow2} // 提示的顶部文本
                detailRow={mve.detailRow2} // 提示的详细文本
                placement={mve.placement} // 提示显示位置
              >
                {mve.iconB} {/* 显示图标 */}
              </RngeTooltip>
            </IconButton>
          </Box>
        </Grid>
      )}
    </>
  );
}
