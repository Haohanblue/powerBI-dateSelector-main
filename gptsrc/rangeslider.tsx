import * as React from "react"; 
import { SliderProps } from "./interface";
import DualSlider from "./dualslider";
import {
  mainMarks,
  superMarks,
  sliderMarkNumber,
  sliderMarkDate,
  sliderMarkText
} from "./dateutils";

// RangeSlider 组件：用于显示一个双滑动条，可以选择一个日期范围
export default function RangeSlider(props: SliderProps) {
  // 解构 props 中的属性
  const { dates, rangeScope, stepValue, show2ndSlider, handleVal } = props;

  // 定义滑动条的起始和结束位置的状态
  const [sliderStart, setSliderStart] = React.useState<number>(
    sliderMarkNumber(dates.start, rangeScope.start) // 根据日期计算滑动条的初始位置
  );
  const [sliderEnd, setSliderEnd] = React.useState<number>(
    sliderMarkNumber(dates.end, rangeScope.start)
  );

  // 使用 useEffect 在 dates 或 rangeScope 更新时同步滑动条的起始和结束位置
  React.useEffect(() => {
    // 重新计算滑动条的起始位置
    const sn = sliderMarkNumber(dates.start, rangeScope.start);
    setSliderStart(sn);

    // 重新计算滑动条的结束位置，确保不超过范围的最大值
    const en = Math.min(
      sliderMarkNumber(dates.end, rangeScope.start),
      sliderMarkNumber(rangeScope.end, rangeScope.start)
    );
    setSliderEnd(en);
  }, [dates, rangeScope]);

  // 获取最接近的标记点，用于对齐滑动条的位置
  const closestMark = (val: number[]) => {
    return val.map((x) => {
      const marks = mainMarks(props).map((v) => v.value); // 获取所有主标记的值
      return marks.sort((a, b) => Math.abs(x - a) - Math.abs(x - b))[0]; // 找到最接近的标记
    });
  };

  // 滑动条变化时的处理函数
  const handleChange = (
    event: MouseEvent,
    val: number[],
    stp: boolean,
    commit: boolean
  ): void => {
    const x = isNaN(val.reduce((a, b) => a + b, 0)); // 检查是否有非数字值
    if (!x) {
      // 如果按下 Ctrl 键，进行特殊的滑动条同步调整
      if (event.ctrlKey) {
        const d = [val[0] - sliderStart, val[1] - sliderEnd].filter(
          (v) => v !== 0
        )[0];
        val = d ? [sliderStart, sliderEnd].map((v) => v + d) : val;
        val = stp ? val : closestMark(val); // 对齐最近的标记点
      }

      // 确保滑动条的结束位置调整合理
      val[1] = sliderEnd === val[1] || stp ? val[1] : val[1] - 1;

      if (commit) {
        // 如果 commit 为 true，触发 handleVal 回调，将日期范围更新给父组件
        handleVal([
          sliderMarkDate(val[0], rangeScope.start),
          sliderMarkDate(val[1], rangeScope.start)
        ]);
      } else {
        // 否则仅更新当前的滑动条状态
        setSliderStart(val[0]);
        setSliderEnd(val[1]);
      }
    }
  };

  // 滑动条变化时调用的函数，根据顶部滑动条或步长变化更新
  const handleOnChange = (e: MouseEvent, val: number[]) => {
    const top = e.target["name"] === "top"; // 判断是否是顶部滑动条的事件
    handleChange(e, val, top ? stepValue === "day" : false, false);
  };

  // 顶部滑动条的提交事件
  const handleTopCommit = (e: MouseEvent, val: number[]) => {
    handleChange(e, val, stepValue === "day", true);
  };

  // 底部滑动条的提交事件
  const handleBottomCommit = (e: MouseEvent, val: number[]) => {
    handleChange(e, val, false, true);
  };

  // 渲染 DualSlider 组件，传递相应的属性和事件处理函数
  return (
    <DualSlider
      value={[sliderStart, sliderEnd]} // 当前滑动条的起始和结束位置
      step={stepValue === "day" ? 1 : null} // 如果步长为 "day"，步长为 1，否则为 null
      showBottomSlider={show2ndSlider} // 是否显示第二个滑动条
      handleTopCommit={handleTopCommit} // 顶部滑动条的提交事件处理
      handleBottomCommit={handleBottomCommit} // 底部滑动条的提交事件处理
      mainMarks={mainMarks(props)} // 主标记数组
      superMarks={superMarks(props)} // 超标记数组
      valueLabelFormat={(val) => sliderMarkText(val, rangeScope.start)} // 格式化滑动条值的文本显示
      max={sliderMarkNumber(rangeScope.end, rangeScope.start)} // 设置滑动条的最大值
      onChange={handleOnChange} // 滑动条变化时的事件处理
    />
  );
}
