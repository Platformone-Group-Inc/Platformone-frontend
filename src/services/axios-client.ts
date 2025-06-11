import axios from "axios";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response) => response);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;
    console.log(data, "data");
    if (data.errorCode === "AUTH_TOKEN_NOT_FOUND" && status === 401) {
      try {
        await APIRefresh.get("/users/refresh-token");
        return APIRefresh(error.config);
      } catch (error) {
        window.location.href = "/";
      }
    }
    //
    else if (data.errorCode === "ACCESS_UNAUTHORIZED" && status === 403) {
      console.log("fuck you");

      // await APIRefresh.get("/users/refresh-token");
      // return APIRefresh(error.config);
    }
    return Promise.reject({
      ...data,
    });
  }
);
export default API;
