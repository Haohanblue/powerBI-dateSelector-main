import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Zoom from "@mui/material/Zoom";
import DateInput from "./dateinput";
import { topRowProps } from "./interface";

const TopRow: React.FC<topRowProps> = ({
  openSlider,
  dates,
  rangeScope,
  handleVal,
  stepOpen
}) => {
  return (
    <Grid container rowSpacing={0.3} paddingLeft={0.3} xs={12}>
      <Grid xs="auto">
      </Grid>
      <DateInput
        dates={dates}
        rangeScope={rangeScope}
        handleVal={handleVal}
        openSlider={openSlider}
      />
      <Grid xs="auto">
        <Zoom in={!stepOpen}>
          <Box>
          </Box>
        </Zoom>
      </Grid>
      <Grid xs>
        <Box></Box>
      </Grid>
    </Grid>
  );
};
 
export default TopRow