import React from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import moment from "moment";
import { Context } from "../";

const StakeInfo = () => {
  const { contract, account } = React.useContext(Context);

  const [staked, setStaked] = React.useState({
    amount: "",
    updatedTime: "",
  });

  const getStakingInfo = async () => {
    const result = await contract.methods.usersStakingInfo(account).call();
    setStaked({
      amount: result.stakedAmount,
      updatedTime: result.updatedTime,
    });
  };

  return (
    <Card
      sx={{
        width: "1000px",
        maxWidth: "1000px",
        marginBottom: "2em",
        border: "1px solid black",
      }}
    >
      <CardHeader title="Stake Info" />
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Button variant="contained" onClick={getStakingInfo}>
              <Typography variant="h6">Get Staked Info</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Staked: {staked.amount} UpdatedTime:{" "}
              {moment.unix(staked.updatedTime).format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StakeInfo;
