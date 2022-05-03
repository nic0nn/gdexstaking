/* global BigInt */
import React from "react";
import {
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { Context } from "../";
import { LockService } from "../../../services";

const Lock = () => {
  const {
    contract,
    ERC20Contract,
    gasRecommended,
    account,
    STAKING_GDEX_CONTRACT,
    GAMER_ID
  } = React.useContext(Context);

  const [period, setPeriod] = React.useState(null);
  const [forcePeriod, setForcePeriod] = React.useState(null);

  const [upgradeOldPeriod, setUpgradeOldPeriod] = React.useState(null);
  const [upgradeNewPeriod, setUpgradeNewPeriod] = React.useState(null);
  const [amount, setAmount] = React.useState(null);

  const [lockTx, setLockTx] = React.useState(null);
  const [forceUnlockTx, setForceUnlockTx] = React.useState(null);
  const [upgradeLockTx, setUpgradeLockTx] = React.useState(null);

  const forceUnlock = async () => {
    contract.methods
      .forceUnLock(GAMER_ID, forcePeriod)
      .send({
        from: account,
        gasPrice: gasRecommended,
      })
      .on("transactionHash", function (hash) {
        setForceUnlockTx(hash);
        LockService.forceLock({ txHash: hash });
      });
  };

  const upgradeLock = async () => {
    await contract.methods
      .upgradeLock(GAMER_ID, upgradeOldPeriod, upgradeNewPeriod)
      .send({
        from: account,
        gasPrice: gasRecommended,
      })
      .on("transactionHash", function (hash) {
        setUpgradeLockTx(hash);
        LockService.upgradeLock({ txHash: hash });
      });
  };

  const lock = async () => {
    const currentAmount = BigInt(amount * 1e18);

    await ERC20Contract.methods
      .approve(STAKING_GDEX_CONTRACT, currentAmount)
      .send({
        from: account,
        gasPrice: gasRecommended,
      });

    contract.methods
      .lock(GAMER_ID, currentAmount, period)
      .send({
        from: account,
      })
      .on("transactionHash", function (hash) {
        setLockTx(hash);
        LockService.addLock({ txHash: hash });
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
      <CardHeader title="Do Lock" />
      <CardContent>
        <Grid container spacing={1} flex alignItems="center">
          <Grid item>
            <TextField
              placeholder="amount"
              onChange={(event) => {
                setAmount(parseFloat(event.target.value));
              }}
            />

            <TextField
              placeholder="period"
              onChange={(event) => {
                setPeriod(parseFloat(event.target.value));
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={lock}>
              <Typography variant="h6">Lock</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} flex alignItems="center">
          <Grid item>
            <TextField
              placeholder="force period"
              onChange={(event) => {
                setForcePeriod(parseFloat(event.target.value));
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={forceUnlock}>
              <Typography variant="h6">Force Unlock</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={1} flex alignItems="center">
          <Grid item>
            <TextField
              placeholder="old period"
              onChange={(event) => {
                setUpgradeOldPeriod(parseFloat(event.target.value));
              }}
            />
            <TextField
              placeholder="new period"
              onChange={(event) => {
                setUpgradeNewPeriod(parseFloat(event.target.value));
              }}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={upgradeLock}>
              <Typography variant="h6">Upgrade lock</Typography>
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h6">Lock Tx: {lockTx}</Typography>
        <Typography variant="h6">Upgrade Lock Tx: {upgradeLockTx}</Typography>
        <Typography variant="h6">Force Unlock Tx: {forceUnlockTx}</Typography>
      </CardContent>
    </Card>
  );
};

export default Lock;
