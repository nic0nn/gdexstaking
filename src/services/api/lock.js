import axios from "./axios";

export const addLock = ({ txHash }) => {
  try {
    return axios().post("/locks", { txHash });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const forceLock = ({ txHash }) => {
  try {
    return axios().put("/locks", { txHash });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const upgradeLock = ({ txHash }) => {
  try {
    return axios().put("/locks/upgrade", { txHash });
  } catch (error) {
    console.log("error: ", error);
  }
};
