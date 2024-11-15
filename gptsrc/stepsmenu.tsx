// 引入React框架以及Material UI组件库中的一些组件
import * as React from "react";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import RngeTooltip from "./rngetooltip";

// 引入自定义工具和接口
import { Increment } from "./dateutils";
import { stepProps } from "./interface";

// 定义StepsMenu组件，接收stepProps类型的参数props
export default function StepsMenu(props: stepProps) {
  // 解构props中的属性
  const { stepViz, stepValue, payProps, viz } = props;

  // 使用React.useMemo缓存actions，调用Increment函数计算得到的值
  const actions = React.useMemo(
    () => Increment(stepViz, null, null, payProps),
    [stepViz, payProps]
  );

  // 处理点击事件的函数handleClick
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    operation: string | null
  ) => {
    const _op = operation.toLowerCase().trim(); // 将操作字符串转为小写并去除空格
    if (props.handleStep) {
      // 如果props提供了handleStep回调函数，则调用它并传入_op
      props.handleStep(_op);
      // 调用handleViz函数切换viz的显示状态
      props.handleViz(!viz);
    }
  };

  return (
    <>
      {/* 仅当viz为true时渲染下面的组件 */}
      {viz && (
        <Box p={0}>
          {/* ToggleButtonGroup为一组互斥的按钮，用于显示不同的step选项 */}
          <ToggleButtonGroup
            value={stepValue} // 当前选中的值
            size="small" // 按钮组的大小
            aria-label="outlined button group"
            exclusive // 设置为exclusive模式，保证一次只能选中一个按钮
          >
            {/* 遍历actions数组，过滤出show为true且tip不为空的项，然后渲染ToggleButton */}
            {actions
              .filter((value) => {
                return value.show === true && value.tip !== "";
              })
              .map((action, index) => (
                <ToggleButton
                  key={action.tip + index} // 每个按钮的唯一key
                  value={action.step} // 设置按钮的值
                  onClick={(e) => {
                    handleClick(e, action.step); // 绑定点击事件
                  }}
                >
                  {/* 使用自定义的RngeTooltip组件包裹内容，显示提示信息 */}
                  <RngeTooltip
                    title={undefined} // title未定义，可能仅使用topRow作为提示内容
                    topRow={
                      action.tip +
                      ` steps (` +
                      action.step.charAt(0).toLocaleUpperCase() +
                      `)` // 显示提示的主行内容
                    }
                    // detailRow={detailRow} // 详细行内容注释掉了
                    placement="bottom-end" // 提示位置在元素的底部末端
                  >
                    {/* Badge组件用于在按钮图标右上角显示一个小徽章 */}
                    <Badge
                      sx={{
                        "& .MuiBadge-badge": {
                          right: -2, // 调整徽章位置向右偏移
                          top: -1   // 调整徽章位置向下偏移
                        }
                      }}
                      badgeContent={
                        // 显示在徽章内的内容，使用Typography设置文本样式
                        <Typography
                          variant="overline" // 小号文字
                          sx={{ fontSize: 8, textTransform: "none" }}
                        >
                          {
                            <span>
                              {action.step.charAt(0).toLocaleUpperCase()} {/* 徽章内容为step的首字母大写 */}
                            </span>
                          }
                        </Typography>
                      }
                      // color="primary" // 徽章颜色配置注释掉了
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right" // 徽章锚点位置设置为右上角
                      }}
                    >
                      {action.icon} {/* 显示按钮对应的图标 */}
                    </Badge>
                  </RngeTooltip>
                </ToggleButton>
              ))}
          </ToggleButtonGroup>
        </Box>
      )}
    </>
  );
}
