import Grid from "@mui/material/Grid";
import SelectedIndicators from "./components/Selected indicators/SelectedIndicators";
import StockMarketGlance from "./components/StockMarketGlance/StockMarketGlance";
import { useState } from "react";

function App() {
 
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <SelectedIndicators />
        </Grid>
        <Grid item xs={6}>
          <StockMarketGlance />
        </Grid>
        <Grid item xs={6}>
          3
        </Grid>
        <Grid item xs={6}>
          4
        </Grid>
      </Grid>
    </>
  );
}

export default App;
