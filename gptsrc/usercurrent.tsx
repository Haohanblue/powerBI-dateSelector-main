import * as React from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import areIntervalsOverlapping from "date-fns/areIntervalsOverlapping";
import Typography from "@mui/material/Typography";
// import { v4 as uuidv4 } from "uuid";
import { UseCurrentProps } from "./interface";
import RngeTooltip from "./rngetooltip";
import DateIntervalPicker from "./dateintervalpicker";

// UseCurrent组件, 接收 UseCurrentProps 类型的 props 参数
export default function UseCurrent(props: UseCurrentProps) {
  // 解构 props 中的字段，方便在组件中使用
  const {
    rangeScope,     // 当前选择的日期范围
    vizOpt,         // 可视化选项，用于控制显示
    showCurrent,    // 决定是否显示当前的 ToggleButtonGroup
    showIconText,   // 控制是否显示按钮旁边的文本
    current,        // 可用的日期范围列表
    stepValue       // 当前的步进值
  } = props;

  // ttl 状态，用于控制 Tooltip 的显示状态
  const [ttl, setTtl] = React.useState(true);

  // 处理日期范围选择事件，接收包含 start 和 end 的 val 参数
  const handleVal = (val: any) => {
    // 调用父组件传入的 handleVal 函数，将选中的时间范围[start, end]传递出去
    props.handleVal([val.start, val.end]);
  };

  // 处理步进选择事件，传入的 val 为当前选择的步进
  const handleStep = (val: string) => {
    // 如果传入的值为 "today"，将步进值转换为 "day"，否则直接使用传入的值
    const _val = val === "today" ? "day" : val;
    props.handleStep(_val);
  };

  // 返回组件的 JSX 结构
  return (
    <>
      {showCurrent && ( // 如果 showCurrent 为 true，显示组件内容
        <Box pl={0}> // 使用 MUI 的 Box 组件包裹 ToggleButtonGroup
          <ToggleButtonGroup
            key={"tbg"}
            size="small" // 设置按钮组大小为小型
            aria-label="outlined button group" // 设置按钮组的 aria 标签
            exclusive // 设置为互斥按钮，即每次只能选中一个按钮
          >
            {current
              .filter((item) => { // 过滤当前列表
                if (item.thisRange !== null) { // 当 item.thisRange 不为 null 时
                  const x = ttl ? item.tip !== "" : item.tip === ""; // 根据 ttl 的值判断是否显示 Tooltip
                  const y = areIntervalsOverlapping( // 使用 date-fns 判断 item.thisRange 和 rangeScope 是否重叠
                    item.thisRange,
                    rangeScope, { inclusive: true }
                  );
                  return item.show && x && y; // 返回同时满足显示条件的 item
                } else return vizOpt; // 否则直接返回 vizOpt 选项
              })
              .map((item, index) => ( // 映射过滤后的列表，生成 ToggleButton 组件
                <ToggleButton
                  color="primary" // 设置按钮颜色
                  key={"tbn" + item.thisRange + index} // 设置唯一 key
                  value={item.tip.toLowerCase().trim()} // 设置按钮的值
                  onMouseDown={() => { // 按下按钮时触发的事件
                    if (item.thisRange) { // 如果有有效的 thisRange
                      handleVal(item.thisRange); // 调用 handleVal 处理日期范围
                      handleStep(item.step); // 调用 handleStep 设置步进值
                    } else {
                      setTtl(!ttl); // 切换 ttl 状态
                    }
                  }}
                >
                  <>
                    <DateIntervalPicker
                      handleVal={handleVal} // 传入 handleVal 函数用于处理日期选择
                      stepValue={item.step} // 传入步进值
                      key={"dip" + item.thisRange + index} // 设置唯一 key
                    >
                      <RngeTooltip
                        title={undefined} // 设置 Tooltip 标题为未定义
                        key={"rtt" + item.thisRange + index} // 设置唯一 key
                        detailRow={
                          item.tip !== "" // 如果 tip 非空，显示详细提示信息
                            ? `Set the date range to ${item.thisPeriod.toLowerCase()}. Right click for ${item.tip.toLowerCase()}s from today.`
                            : ``
                        }
                        placement="bottom" // 设置 Tooltip 位置为底部
                        topRow={
                          item.thisPeriod + // 显示当前时间范围
                          (item.tip.toLowerCase() === stepValue ? " (T)" : "") // 如果步进值匹配，加上 (T) 标签
                        }
                      >
                        {item.icon} // 显示当前项的图标
                      </RngeTooltip>
                    </DateIntervalPicker>
                    {showIconText && ( // 如果 showIconText 为 true，显示文本信息
                      <Typography
                        key={"typ" + item.thisRange + index} // 设置唯一 key
                        color="text.primary" // 设置文本颜色
                        variant="caption" // 设置文本变体为注释
                        sx={{
                          fontSize: 10, // 设置字体大小
                          textTransform: "none", // 禁用文本转换
                          whiteSpace: "nowrap" // 禁用换行
                        }}
                      >
                        {item.thisPeriod} // 显示当前时间段文本
                      </Typography>
                    )}
                  </>
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Box>
      )}
    </>
  );
}
