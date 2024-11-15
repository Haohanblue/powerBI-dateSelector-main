import React, { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { HelpOutline } from "@mui/icons-material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";
// import Typography from "@mui/material/Typography";
import { useHotkeys } from "react-hotkeys-hook";
import { HELP_PROVIDER } from "./constants";

// 创建帮助上下文，用于管理帮助消息的显示状态
const HelpContext = React.createContext({
  showKey: false, // 是否显示辅助键提示
  showHelp: false, // 是否显示帮助内容
  toggleHelp: () => {/* 切换帮助消息的显示或隐藏 */},
});

// 从帮助提供者对象中解构出顶部行和详情行的信息和帮助内容
const { TopRowInfo, DetailRowInfo, TopRowHelp, DetailRowHelp } = HELP_PROVIDER;

// 自定义 hook，用于在组件中使用帮助上下文
export const useHelpContext = () => useContext(HelpContext);

// 帮助提供者组件，用于提供帮助上下文和控制帮助图标的显示逻辑
export const HelpProvider = ({ children, showHelpIcon }) => {
  // 定义状态，用于管理帮助内容和辅助键的显示
  const [showHelp, setShowHelp] = useState(false); // 控制帮助内容的显示状态
  const [showKey, setShowKey] = useState(false); // 控制辅助键的显示状态

  // 切换帮助内容的显示状态
  const toggleHelp = (): void => {
    setShowHelp(!showHelp);
  };

  // 帮助上下文的值，包含当前的状态和切换函数
  const value = { showKey, showHelp, toggleHelp };

  // 使用快捷键 "Escape" 键来关闭帮助内容
  useHotkeys("escape", () => setShowHelp(false));

  // 使用快捷键 "H" 键来显示帮助内容
  useHotkeys(["h"], () => setShowHelp(true));

  // 使用快捷键 "Alt" 键来显示或隐藏辅助键提示
  useHotkeys("alt", () => setShowKey(true), { keydown: true }, [showKey]);
  useHotkeys("alt", () => setShowKey(false), { keyup: true }, [showKey]);

  return (
    <HelpContext.Provider value={value}>
      {/* 根据 showHelpIcon 控制帮助图标的显示 */}
      {showHelpIcon && (
        <Tooltip
          arrow
          title={
            showHelp ? (
              <>
                {/* 显示详细信息 */}
                <div>
                  <b>{TopRowInfo}</b>
                </div>
                <div>{DetailRowInfo}</div>
              </>
            ) : (
              <>
                {/* 显示帮助提示 */}
                <div>
                  <b>{TopRowHelp}</b>
                </div>
                <div>{DetailRowHelp}</div>
              </>
            )
          }
          placement="left"
          componentsProps={{
            tooltip: {
              sx: {
                // 根据 showHelp 状态设置提示框的背景颜色
                backgroundColor: (theme) =>
                  showHelp
                    ? theme.palette.secondary.dark
                    : theme.palette.primary.dark,
                maxWidth: 350, // 设置最大宽度
                fontWeight: 400, // 字体粗细
                fontSize: 8, // 字体大小
              },
            },
          }}
        >
          <IconButton
            size="small"
            sx={{ position: "absolute", right: 0, top: 0, margin: 0.2 }}
            color={showHelp ? "secondary" : "primary"}
            onClick={toggleHelp}
          >
            {/* 根据 showHelp 状态显示不同的图标 */}
            {showHelp ? (
              <InfoOutlined style={{ fontSize: 16 }} />
            ) : (
              <HelpOutline style={{ fontSize: 16 }} />
            )}
          </IconButton>
        </Tooltip>
      )}
      {/* 渲染子组件 */}
      {children}
    </HelpContext.Provider>
  );
};
