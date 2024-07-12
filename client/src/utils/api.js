import { useQuery, useMutation } from "react-query";
import axios from "axios";

const api_url = process.env.REACT_APP_API_URL;

axios.defaults.baseURL = api_url;
axios.defaults.headers.common["Content-Type"] = "application/json";

axios.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export const makeRequest = async (method, url, data) => {
  const response = await axios.request({
    method,
    url,
    data,
  });

  return response.data;
};

export const api = {
  useGet: (url, options) =>
    useQuery(url, () => makeRequest("GET", url), options),
  usePost: (url) => useMutation((data) => makeRequest("POST", url, data)),
  usePut: (url) => useMutation((data) => makeRequest("PUT", url, data)),
  // delete: (url) => useMutation(() => makeRequest("DELETE", url)),
};
