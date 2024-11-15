// 导入所需的模块
import { getRange } from "./dateutils"; // 导入自定义的日期范围获取函数
import { useHotkeys } from "react-hotkeys-hook"; // 用于绑定快捷键事件的钩子
import debounce from "lodash.debounce"; // 导入 lodash 的 debounce 函数，用于防抖处理

// 定义回调类型，接收一个 Date 数组作为参数
type Callback = (result: Date[]) => void;

// 定义 dateMoveKeys 函数，用于绑定日期移动的快捷键，并处理快捷键事件
export function dateMoveKeys(
  fn: Callback, // 回调函数，用于返回新的日期范围
  stepValue: string, // 步进值，表示日期移动的步长
  dates: Interval, // 当前日期范围
  current: any, // 当前增量信息，用于确定特定范围
  debounceTime = 500 // 防抖时间，默认 500 毫秒
) {
  // 定义 updateResult 函数，用于获取新的日期范围并调用回调函数
  const updateResult = (x: string) => {
    const dteRange = getRange(x, stepValue, dates); // 根据输入方向和步长获取新的日期范围
    fn(dteRange); // 调用回调函数，将新范围传递出去
    // console.log("moveKeys: ", dteRange.toString()); // 日志输出（调试用）
  };

  // 使用 debounce 防抖处理 updateResult 函数，避免频繁调用
  const debouncedResult = debounce(updateResult, debounceTime, {
    leading: false, // 延迟开始
    trailing: true  // 结束后执行
  });

  // 绑定快捷键 "n" 和 "right"（前进一步）
  useHotkeys(["n", "right"], () => debouncedResult("f"), [stepValue, dates]);

  // 绑定快捷键 "left" 和 "l"（后退一步）
  useHotkeys(["left", "l"], () => debouncedResult("b"), [stepValue, dates]);

  // 绑定快捷键 "ctrl+right"（扩展前进一步）
  useHotkeys("ctrl+right", () => debouncedResult("ef"), [stepValue, dates]);

  // 绑定快捷键 "ctrl+left"（扩展后退一步）
  useHotkeys("ctrl+left", () => debouncedResult("eb"), [stepValue, dates]);

  // 绑定快捷键 "shift+right"（缩小前进一步）
  useHotkeys("shift+right", () => debouncedResult("rf"), [stepValue, dates]);

  // 绑定快捷键 "shift+left"（缩小后退一步）
  useHotkeys("shift+left", () => debouncedResult("rb"), [stepValue, dates]);

  // 绑定快捷键 "t"（跳转到当前范围）
  useHotkeys(
    "t",
    () => {
      // 从 current 中筛选出 stepValue 对应的日期范围
      const thisRange = current
        .filter((item) => item.tip.toLowerCase() === stepValue) // 找到匹配的 stepValue
        .map((item) => item.thisRange)[0]; // 提取匹配范围
      // 调用回调函数，传递找到的范围
      fn([thisRange.start, thisRange.end]);
    },
    [stepValue]
  );
}
