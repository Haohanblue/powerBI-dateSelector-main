import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Zoom from "@mui/material/Zoom";
import DateRange from "./daterange";

function DateInput({
  dates,
  rangeScope,
  handleVal,
  openSlider,
}) {
  return (
    <>
      <Grid xs="auto">
        <DateRange
          dates={dates}
          rangeScope={rangeScope}
          handleVal={handleVal}
        />
      </Grid>
      <Grid xs="auto" paddingRight={1}>
      </Grid>
      <Zoom in={openSlider}>
        <Grid xs="auto">
        </Grid>
      </Zoom>
    </>
  );
}

export default DateInput;
