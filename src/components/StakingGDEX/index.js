import React from "react";
import web3 from "web3";
import { Typography } from "@mui/material";
import StakingGDEXABI from "../../abis/StakingGDEX.json";
import ERC20ABI from "../../abis/ERC20.json";
import Lock from "./components/Lock";
import Stake from "./components/Stake";
import Info from "./components/Info";

// const STAKING_GDEX_CONTRACT = "0x8fe1e8B81daB1b6437bc3e1974ce6a21B88D753c";
const STAKING_GDEX_CONTRACT = "0x5f6fd265B8B38BFF71927c4d7e564C41De33d541";
const GDEX_TOKEN_ADDRESS = "0x96055A188e7D2667b09884AE98614DC334371A99";
const GAMER_ID = 2;

export const Context = React.createContext();

const StakingGDEX = () => {
  const [account, setAccount] = React.useState(null);

  const web3provider = new web3(window.ethereum);

  const contract = new web3provider.eth.Contract(
    StakingGDEXABI,
    STAKING_GDEX_CONTRACT
  );

  const ERC20Contract = new web3provider.eth.Contract(ERC20ABI, GDEX_TOKEN_ADDRESS);
  const gasRecommended = web3provider.utils.toHex(
    web3provider.utils.toWei("20", "gwei")
  );

  React.useEffect(() => {
    const getAccount = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await web3provider.eth.getAccounts();
      setAccount(accounts[0]);
    };
    getAccount();
  }, [web3provider.eth]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Context.Provider
        value={{
          web3provider,
          contract,
          gasRecommended,
          ERC20Contract,
          account,
          STAKING_GDEX_CONTRACT,
          GAMER_ID
        }}
      >
        <Typography variant="h4">Staking GDEX</Typography>
        <Typography variant="h6">Account: {account}</Typography>
        <Stake />
        <Lock />
        <Info />
      </Context.Provider>
    </div>
  );
};

export default StakingGDEX;
