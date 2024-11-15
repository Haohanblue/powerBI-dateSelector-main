// 导入 React 和其他需要的组件与模块
import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid布局组件，用于响应式布局
import TextField from "@mui/material/TextField"; // TextField组件，用于输入框
import Box from "@mui/material/Box"; // Box组件，用于容器布局
import { format, parse, isValid } from "date-fns"; // date-fns 库，用于日期格式化与解析
import { DateRangeProps } from "./interface"; // 导入接口定义
import { inputParms } from "./dateutils"; // 导入日期工具函数
import { DateField } from "./datefield"; // 自定义日期输入框组件
import { useHelpContext } from "./helpprovider"; // 导入帮助上下文
import RngeTooltip from "./rngetooltip"; // 导入自定义的日期范围提示工具

// 定义一个无状态的功能性组件 TextFieldDash，用于显示连接符 "-"
const TextFieldDash: React.FC = () => {
  return (
    <Box sx={{ width: 15 }}>
      <TextField
        id="dash"
        variant="standard"
        disabled
        value={"-"}
        InputProps={{ disableUnderline: true }} // 禁用下划线样式
      />
    </Box>
  );
};

// DateRange 组件，接收 DateRangeProps 类型的 props
export default function DateRange(props: DateRangeProps) {
  // 从 props 中解构出日期范围数据和变更处理函数
  const { dates, rangeScope, handleVal } = props;

  // 定义组件状态
  const [underline, setUndeline] = useState<boolean>(() => true); // 控制输入框的下划线显示
  const [startText, setStartText] = useState<string>(() =>
    format(dates.start, "yyyy-MM-dd") // 初始化开始日期的文本
  );
  const [endText, setEndText] = useState<string>(() =>
    format(dates.end, "yyyy-MM-dd") // 初始化结束日期的文本
  );

  // 当 dates 发生变化时，更新开始和结束日期的文本状态
  useEffect(() => {
    setStartText(format(dates.start, "yyyy-MM-dd"));
    setEndText(format(dates.end, "yyyy-MM-dd"));
  }, [dates]);

  // 处理日期输入的更改事件
  const handleInput = (e) => {
    const date: string = e.target.value;
    if (e.target.id === "start") {
      setStartText(date); // 更新开始日期文本
    } else {
      setEndText(date); // 更新结束日期文本
    }
  };

  // 根据输入参数计算日期范围的描述和校验信息
  const dateSpan = inputParms(dates, rangeScope);
  // 根据帮助上下文决定顶部显示的文本
  const topRow = useHelpContext().showHelp ? "Enter Range" : dateSpan.string;

  // 处理输入框失去焦点事件，将文本内容解析为日期并进行校验
  const handleBlur = (e) => {
    const dte: Date = parse(e.target.value, "yyyy-MM-dd", new Date()); // 解析输入的日期文本
    if (isValid(dte)) { // 检查日期是否有效
      if (e.target.id === "start") {
        handleVal([dte, dates.end]); // 更新开始日期
      } else {
        handleVal([dates.start, dte]); // 更新结束日期
      }
    } else {
      // 如果输入无效，则恢复为原有的日期文本
      setStartText(format(dates.start, "yyyy-MM-dd"));
      setEndText(format(dates.end, "yyyy-MM-dd"));
    }
  };

  // 鼠标进入时隐藏下划线
  const showUndeline = () => {
    setUndeline(false);
  };

  // 鼠标离开时显示下划线
  const hideUndeline = () => {
    setUndeline(true);
  };

  // 渲染组件
  return (
    // 包裹在 div 中，用于控制鼠标悬浮效果
    <div onMouseEnter={showUndeline} onMouseLeave={hideUndeline}>
      {/* 使用 RngeTooltip 提供工具提示功能 */}
      <RngeTooltip
        title={undefined} // 工具提示标题（未设置）
        topRow={topRow} // 顶部行的提示文本
        detailRow={dateSpan.string} // 详细行的提示文本
        placement="bottom" // 提示的显示位置
      >
        <Grid container spacing={0.5} paddingLeft={0.3}>
          {/* 开始日期输入框 */}
          <Grid xs="auto">
            <DateField
              id="start" // 输入框的 id，用于标识为开始日期
              value={startText} // 开始日期的文本值
              error={!dateSpan.toValid} // 错误状态，根据日期范围校验
              onBlur={handleBlur} // 失去焦点事件处理
              onChange={handleInput} // 更改事件处理
              onFocus={showUndeline} // 获取焦点时隐藏下划线
              underline={underline} // 控制是否显示下划线
            />
          </Grid>
          
          {/* 显示日期范围的连接符 "-" */}
          <TextFieldDash />

          {/* 结束日期输入框 */}
          <Grid xs="auto">
            <DateField
              id="end" // 输入框的 id，用于标识为结束日期
              value={endText} // 结束日期的文本值
              error={!dateSpan.toValid} // 错误状态，根据日期范围校验
              onBlur={handleBlur} // 失去焦点事件处理
              onChange={handleInput} // 更改事件处理
              onFocus={showUndeline} // 获取焦点时隐藏下划线
              underline={underline} // 控制是否显示下划线
            />
          </Grid>
        </Grid>
      </RngeTooltip>
    </div>
  );
}
