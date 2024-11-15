// 定义用于自定义Slider（滑块）组件的样式对象

// style 是 Slider 组件的基本样式
export const style = {
  width: "98%", // 设置Slider的宽度为容器的98%
  "& .MuiSlider-rail": {
    opacity: 0.28, // 设置滑轨的透明度
    height: "1px"  // 设置滑轨的高度
  }
} as const;

// styleB 用于自定义Slider样式的第二种样式方案
export const styleB = {
  // zIndex: 1, // 控制层级，注释掉了，可能是为了避免样式冲突
  marginTop: -6, // 将Slider整体向上移动6px
  "& .MuiSlider-thumb": {
    width: 4, // 设置滑块（thumb）的宽度
    height: 4, // 设置滑块的高度
    "&:hover": {
      boxShadow: "0 0 0 6px rgba(58, 133, 137, 0.16)" // 设置滑块在hover时的阴影效果
    }
  },
  "& .MuiSlider-markLabel": {
    fontSize: "0.65rem", // 设置刻度标签的字体大小
    top: 24 // 调整刻度标签的位置
  },
  "& .MuiSlider-track": {
    height: 3, // 设置已滑过轨道的高度
    opacity: 0.38, // 设置轨道透明度
    "&:hover": {
      boxShadow: "0 0 0 2px rgba(58, 133, 137, 0.16)" // 设置轨道在hover时的阴影效果
    },
    color: "secondary" // 设置轨道的颜色
  }
} as const;

// styleT 用于自定义Slider的第三种样式方案
export const styleT = {
  zIndex: 999, // 设置Slider的层级较高，确保显示在其他元素之上
  marginTop: 0, // 设置Slider的上边距为0
  "& .MuiSlider-thumb": {
    width: 11, // 设置滑块的宽度较大
    height: 11, // 设置滑块的高度较大
    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)", // 添加滑块的动画过渡效果
    "&:hover": {
      boxShadow: "0 0 0 6px rgba(58, 133, 137, 0.16)" // hover时的阴影效果
    },
    "&:before": {
      boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)" // 滑块的内部阴影效果
    }
  },
  "& .MuiSlider-markLabel": {
    fontSize: "0.65rem", // 设置刻度标签的字体大小
    fontWeight: 500, // 设置刻度标签的字体粗细
    top: 0 // 调整刻度标签的位置
  }
} as const;

// styleTab 用于Tab组件的样式
export const styleTab = {
  minHeight: "auto", // 将Tab的最小高度设置为自动，取消默认的高度限制
  padding: 0, // 去掉Tab的内边距
  top: -2, // 调整Tab的位置向上移动2px
  minWidth: 15, // 设置Tab的最小宽度
  fontSize: 11, // 设置Tab文字的字体大小
  fontWeight: 500, // 设置Tab文字的字体粗细
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)" // Tab获得焦点时的背景色
  }
} as const;

// styleTabs 用于Tabs组件的样式
export const styleTabs = {
  "& .MuiTabs-indicator": {
    top: 13, // 调整指示器的位置
    display: "flex", // 设置指示器为弹性布局
    justifyContent: "center" // 将指示器内容居中
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 10, // 设置指示器的最大宽度
    width: "10px" // 设置指示器的宽度
  }
} as const;
