import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { DateRangeProps } from "./interface";
import { inputParms } from "./dateutils";
import { DateField } from "./datefield";
import { useHelpContext } from "./helpprovider";
import RngeTooltip from "./rngetooltip";

const TextFieldDash: React.FC = () => {
  return (
    <Box sx={{ width: 15, textAlign: 'center', lineHeight: '32px' }}>
      -
    </Box>
  );
};

export default function DateRange(props: DateRangeProps) {
  const { dates, rangeScope, handleVal } = props;

  const [startDate, setStartDate] = useState<Date | null>(dates.start);
  const [endDate, setEndDate] = useState<Date | null>(dates.end);

  useEffect(() => {
    setStartDate(dates.start);
    setEndDate(dates.end);
  }, [dates]);

  const handleInput = (date: Date | null, dateString: string, id: "start" | "end") => {
    if (id === "start") {
      setStartDate(date);
      handleVal([date || dates.start, endDate || dates.end]);
    } else {
      setEndDate(date);
      handleVal([startDate || dates.start, date || dates.end]);
    }
  };

  const dateSpan = inputParms({ start: startDate || dates.start, end: endDate || dates.end }, rangeScope);
  const topRow = useHelpContext().showHelp ? "Enter Range" : dateSpan.string;

  return (
    <div>
      <RngeTooltip
        title={undefined}
        topRow={topRow}
        detailRow={dateSpan.string}
        placement="bottom"
      >
        <Grid container spacing={0.5} paddingLeft={0.3} alignItems="center">
          <Grid xs="auto">
            <DateField
              id="start"
              value={startDate}
              error={!dateSpan.toValid}
              onChange={(date, dateString) => handleInput(date, dateString, "start")}
              onFocus={() => {}}
            />
          </Grid>
          <TextFieldDash />
          <Grid xs="auto">
            <DateField
              id="end"
              value={endDate}
              error={!dateSpan.toValid}
              onChange={(date, dateString) => handleInput(date, dateString, "end")}
              onFocus={() => {}}
            />
          </Grid>
        </Grid>
      </RngeTooltip>
    </div>
  );
}
