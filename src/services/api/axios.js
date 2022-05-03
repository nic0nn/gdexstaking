import axios from "axios";
import currentToken from "./token";
const API_URL = "http://localhost:3001/api/v1";
const token = `Bearer ${currentToken}`;

const customAxios = (contentType, buckettype) => {
  const accessToken = token;
  const config = {
    baseURL: API_URL,
    headers: {
      "Content-Type": contentType || "application/json",
      Authorization: accessToken,
      buckettype,
    },
  };

  const instance = axios.create(config);

  return instance;
};

export default customAxios;
