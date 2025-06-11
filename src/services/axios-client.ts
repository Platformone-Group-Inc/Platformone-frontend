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
    console.log("Error", data);
    if (data.errorCode === "ACCESS_UNAUTHORIZED" && status === 401) {
      console.log("Refresh token");

      try {
        await APIRefresh.post("/users/refresh-token");
        return APIRefresh(error.config);
      } catch (error) {
        // window.location.href = "/";

        console.log(error);
      }
    }
    //
    else if (data.errorCode === "ACCESS_UNAUTHORIZED" && status === 403) {
      // await APIRefresh.get("/users/refresh-token");
      // return APIRefresh(error.config);
    }
    return Promise.reject({
      ...data,
    });
  }
);
export default API;
