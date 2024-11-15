// 引入React库，以支持React组件的创建
import * as React from "react";
// 引入Material UI的TextField组件，用于创建输入框
import TextField from "@mui/material/TextField";

// 定义DateField组件的Props接口，指定该组件接受的属性类型
interface DateFieldProps {
  // 输入框的ID，标识是“开始”还是“结束”日期
  id: "start" | "end";
  // 输入框的值，类型为字符串格式的日期
  value: string;
  // 可选属性，用于表示输入框是否出错，默认值为false
  error?: boolean;
  // 可选属性，是否去除下划线样式，默认值为true
  underline?: boolean;
  // 输入框类型，默认为"date"，允许用户传入其他类型
  type?: string;
  // 输入框宽度，默认值为95
  width?: number;
  // 输入值变化时的事件处理函数，接收一个React的ChangeEvent对象作为参数
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // 失去焦点时的事件处理函数，接收一个React的FocusEvent对象作为参数
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  // 获取焦点时的事件处理函数，不需要参数
  onFocus: () => void;
}

// 定义DateField组件为一个函数式React组件
export const DateField: React.FC<DateFieldProps> = ({
  id,            // 输入框的ID（用于区分“开始”和“结束”日期）
  value,         // 输入框的值
  error,         // 输入框是否出错
  onChange,      // 输入值变化时的事件处理函数
  onBlur,        // 失去焦点时的事件处理函数
  onFocus,       // 获取焦点时的事件处理函数
  underline,     // 是否显示下划线样式
  type = "date", // 输入框类型，默认为"date"
  width = 95     // 输入框宽度，默认为95
}) => {
  // 返回一个TextField组件，用于显示日期输入框
  return (
    <TextField
      id={id} // 设置输入框的ID
      sx={{
        // 去除日期选择器图标，使输入框更加简洁
        "& input[type='date']::-webkit-calendar-picker-indicator": {
          display: "none",            // 隐藏日期选择图标
          WebkitAppearance: "none"     // 禁用webkit的默认样式
        },
        width: { width }               // 设置输入框宽度
      }}
      variant="standard"              // 使用标准样式的TextField
      type={type}                     // 设置输入框类型（默认为“date”）
      error={error}                   // 控制错误状态样式
      value={value}                   // 输入框的当前值
      onChange={onChange}             // 当输入框内容变化时触发的回调函数
      onBlur={onBlur}                 // 当输入框失去焦点时触发的回调函数
      onFocus={onFocus}               // 当输入框获得焦点时触发的回调函数
      placeholder={"yyyy-MM-dd"}      // 设置占位符，提示日期格式
      InputProps={{
        disableUnderline: underline    // 根据传入的underline属性决定是否禁用下划线
      }}
    />
  );
};
