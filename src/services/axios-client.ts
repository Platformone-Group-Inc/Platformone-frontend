import axios from "axios";

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout:  5 * 60 * 1000,
};

const API = axios.create(options);

export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response) => response);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const res = error?.response;

    if (!res) {
      // Normalize and reject
      return Promise.reject({
        errorCode: "NETWORK_ERROR",
        message:
          error?.message === "Network Error"
            ? "Network error. Please check your connection."
            : error?.message || "Request failed (no response).",
        cause: error?.code || "NO_RESPONSE",
      });
    }
    const { data, status } = res;
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
