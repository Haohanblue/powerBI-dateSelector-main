import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHotkeys } from "react-hotkeys-hook";
import TopRow from "./daterangetoprow";
import { dateCardProps } from "./interface";
import { Increment } from "./dateutils";

export default function DateRangeCard(props: dateCardProps) {
  const {
    dates,
    rangeScope,
    weekStartDay,
    yearStartMonth,
    stepInit,
    stepViz,
    vizOpt,
    payProps,
    themeColor,
    themeFont,
    themeMode,
    showCurrent,
    showIconText,
    handleVal,
    showSlider
  } = props;

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: themeColor,
      },
    },
    typography: {
      fontFamily: themeFont,
    },
  });

  const [openSlider, setOpenSlider] = React.useState<boolean>(showSlider);
  const [stepValue, setStepValue] = React.useState<string>(stepInit);
  const [stepOpen, setStepOpen] = React.useState<boolean>(false);

  const current = React.useMemo(() => {
    return Increment(
      stepViz,
      weekStartDay,
      yearStartMonth,
      payProps,
      vizOpt,
      rangeScope
    );
  }, [stepViz, weekStartDay, yearStartMonth, payProps, vizOpt, rangeScope]);

  React.useEffect(() => {
    setOpenSlider(showSlider);
  }, [showSlider]);
  React.useEffect(() => {
    setStepValue(stepInit);
  }, [stepInit]);

  const toggleSlider = () => {
    setOpenSlider(!openSlider);
  };

  useHotkeys("s", () => toggleSlider(), [openSlider]);

  return (
    <>
      <ThemeProvider theme={theme}>
        
          <TopRow
            openSlider={openSlider}
            toggleSlider={toggleSlider}
            dates={dates}
            rangeScope={rangeScope}
            payProps={payProps}
            handleVal={handleVal}
            stepViz={stepViz}
            stepOpen={stepOpen}
            stepValue={stepValue}
            handleClick={() =>  setStepOpen(!stepOpen)}
            setStepOpen={setStepOpen}
            vizOpt={vizOpt}
            showCurrent={showCurrent}
            showIconText={showIconText}
            setStepValue={setStepValue}
            current={current}
          />
        
      </ThemeProvider>
    </>
  );
}
