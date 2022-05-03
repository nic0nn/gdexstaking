import axios from "./axios";

export const addStake = ({ txHash }) => {
  try {
    return axios().post("/stakes", { txHash });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const unstake = ({ txHash }) => {
  try {
    return axios().put("/stakes", { txHash });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const lockStake = ({ txHash }) => {
  try {
    return axios().put("/stakes/lock", { txHash });
  } catch (error) {
    console.log("error: ", error);
  }
};
