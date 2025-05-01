import API from "../axios-client";


export const getFrameworksQueryFn = async () => await API.get("/frameworks");