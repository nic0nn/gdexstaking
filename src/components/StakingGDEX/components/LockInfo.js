import React from "react";
import {
  Typography,
  Button,
  Grid,
  TextField,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import moment from "moment";
import { Context } from "../";

const LockInfo = () => {
  const { contract, account } = React.useContext(Context);
  const [period, setPeriod] = React.useState(null);
  const [locked, setLocked] = React.useState({
    amount: "",
    updatedTime: "",
  });

  const getLockInfo = async () => {
    console.log("Get lock info");
    const result = await contract.methods.usersLockInfo(account, period).call();
    console.log("result: ", result);
    setLocked({
      amount: result.lockedAmount,
      updatedTime: result.lockedTime,
    });
  };

  return (
    <Card  sx={{
      width: "1000px",
      maxWidth: "1000px",
      marginBottom: "2em",
      border: "1px solid black",
    }}>
      <CardHeader title="Lock Info" />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              placeholder="Period"
              onChange={(e) => setPeriod(e.target.value)}
            />
            <Button variant="contained" onClick={getLockInfo}>
              <Typography variant="h6">Get Lock Info</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Locked: {locked.amount} UpdatedTime:{" "}
              {moment.unix(locked.updatedTime).format("DD/MM/YYYY HH:mm:ss")}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LockInfo;
