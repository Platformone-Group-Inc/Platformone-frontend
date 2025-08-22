import API from "../axios-client";

export const getStatsByFramework = async (frameworkID: string) => {
    const response = await API.get(`/statistics/framework/${frameworkID}`);
    return response?.data;
}