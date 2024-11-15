// 导入React模块及Material-UI的ToggleButton、Badge、Typography组件
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import BlurOn from "@mui/icons-material/BlurOn";

// 导入自定义类型、常量和工具
import { stepProps } from "./interface";
import { DATEUTILS, STEP_TOGGLE } from "./constants";
import { useHotkeys } from "react-hotkeys-hook";
import RngeTooltip from "./rngetooltip";

// 解构STEP_TOGGLE常量中的TopRow和DetailRow，用于显示在Tooltip中
const { TopRow, DetailRow } = STEP_TOGGLE;

// 定义StepToggle组件并导出
export default function StepToggle(props: stepProps) {
  const { stepViz, stepValue, viz } = props; // 从props中解构获得stepViz, stepValue和viz

  // 定义快捷键处理函数
  const keyHandler = (period) => {
    if (props.handleStep && stepViz[period]) { // 若存在handleStep函数且对应period启用
      props.handleStep(period);                // 调用handleStep并传递period参数
    }
  };

  // 获取stepViz对象中值为true的键，并生成快捷键字符串
  const trueKeys = Object.keys(stepViz).filter((key) => stepViz[key]);
  const ShortCut = trueKeys
    .map((key) => key.charAt(0).toUpperCase()) // 获取每个键的首字母并大写
    .join(", ");                               // 拼接为快捷键字符串

  // 使用react-hotkeys-hook注册多个快捷键及其对应的处理函数
  useHotkeys("d", () => keyHandler("day"));
  useHotkeys("w", () => keyHandler("week"));
  useHotkeys("p", () => keyHandler("pay"));
  useHotkeys("m", () => keyHandler("month"));
  useHotkeys("q", () => keyHandler("quarter"));
  useHotkeys("y", () => keyHandler("year"));

  return (
    !viz && ( // 若viz为false时渲染ToggleButton
      <ToggleButton
        value="on"                 // ToggleButton的值
        size="small"               // 设置按钮的大小
        onClick={props.onClick}    // 按钮点击触发props中的onClick函数
        // onMouseEnter={handleStepOpen} // 鼠标进入事件（注释掉）
        // onMouseLeave={handleStepClose} // 鼠标离开事件（注释掉）
      >
        {/* 包含Badge，用于显示当前步长的缩写 */}
        <Badge
          sx={{
            "& .MuiBadge-badge": {
              right: -2,         // 徽章位置向右偏移
              top: -1            // 徽章位置向上偏移
            }
          }}
          badgeContent={
            <Typography
              variant="overline"
              sx={{ fontSize: 8, textTransform: "uppercase" }} // 徽章文本样式
            >
              {<span>{stepValue.charAt(0)}</span>} // 显示当前步长的首字母
            </Typography>
          }
          //color="primary"  // 徽章颜色（注释掉）
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
          {/* Tooltip包裹图标，用于显示当前步长及快捷键提示 */}
          <RngeTooltip
            title={undefined} // 没有设置Tooltip标题
            topRow={TopRow + DATEUTILS.periodTip[stepValue] + ` (${ShortCut})`} // 顶部行内容
            detailRow={DetailRow} // 详情行内容
            placement="bottom"     // Tooltip显示位置
          >
            <BlurOn style={{ fontSize: 16 }} color="primary" /> {/* 图标样式 */}
          </RngeTooltip>
        </Badge>
      </ToggleButton>
    )
  );
}
