import React from "react";
import LockInfo from "./LockInfo";
import StakeInfo from "./StakeInfo";
import { Grid } from "@mui/material";

const Info = () => {
  return (
    <Grid>
      <Grid item xs={6}>
        <StakeInfo />
      </Grid>

      <Grid item xs={6}>
        <LockInfo />
      </Grid>
    </Grid>
  );
};

export default Info;
