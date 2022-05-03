/* global BigInt */
import React from "react";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { Context } from "../";
import { StakeService } from "../../../services";

const Stake = () => {
  const {
    contract,
    ERC20Contract,
    gasRecommended,
    account,
    STAKING_GDEX_CONTRACT,
    GAMER_ID,
  } = React.useContext(Context);
  console.log("GAMER_ID: ", GAMER_ID);
  const [amount, setAmount] = React.useState(null);
  const [lockPeriod, setLockPeriod] = React.useState(null);
  const [tx, setTx] = React.useState(null);
  const [unstakeTx, setUnstakeTx] = React.useState(null);
  const [lockStakeTx, setLockStakeTx] = React.useState(null);

  const stake = async () => {
    const currentAmount = BigInt(amount * 1e18);

    await ERC20Contract.methods
      .approve(STAKING_GDEX_CONTRACT, currentAmount)
      .send({
        from: account,
        gasPrice: gasRecommended,
      });

    contract.methods
      .stake(GAMER_ID, currentAmount)
      .send({
        from: account,
        gasPrice: gasRecommended,
      })
      .on("transactionHash", function (hash) {
        setTx(hash);
        try {
          StakeService.addStake({ txHash: hash });
        } catch (error) {
          console.log("error: ", error);
        }
      })
      .on("error", function (error) {
        console.log("error: ", error);
      });
  };

  const unstake = async () => {
    await contract.methods.requestUnstake(GAMER_ID, true).send({
      from: account,
      gasPrice: gasRecommended,
    });

    console.log("unstakeTx:");
    contract.methods
      .unStake(GAMER_ID)
      .send({
        from: account,
        gasPrice: gasRecommended,
      })
      .on("transactionHash", function (hash) {
        console.log("hash: ", hash);
        setUnstakeTx(hash);
        StakeService.unstake({ txHash: hash });
      });
  };

  const lockStake = async () => {
    contract.methods
      .convertStakingToLock(GAMER_ID, lockPeriod)
      .send({
        from: account,
        gasPrice: gasRecommended,
      })
      .on("transactionHash", function (hash) {
        setLockStakeTx(hash);
        StakeService.lockStake({ txHash: hash });
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
      <CardHeader title="Do Stake" />
      <CardContent>
        <Grid
          container
          spacing={1}
          flex
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <TextField
              placeholder="amount"
              onChange={(event) => {
                setAmount(parseFloat(event.target.value));
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={stake}>
              <Typography variant="h6">Stake</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={unstake}>
              <Typography variant="h6">Unstake</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          flex
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <TextField
              placeholder="lock period"
              onChange={(event) => {
                setLockPeriod(parseInt(event.target.value));
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={lockStake}>
              <Typography variant="h6">Lock Stake</Typography>
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h6">Tx: {tx}</Typography>
        <Typography variant="h6">Unstake Tx: {unstakeTx}</Typography>
        <Typography variant="h6">Lock Stake Tx: {lockStakeTx}</Typography>
      </CardContent>
    </Card>
  );
};

export default Stake;
