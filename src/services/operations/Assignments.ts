import API from "../axios-client";

export const getAssignmentsByOrganizationQueryFn = async (frameworkId: string | null) => {
    const response = await API.get(`/assignments/framework/${frameworkId}`);
    return response?.data;
};


export const getAssignmentStatQueryFn = async (frameworkId: string | null) => {
    const response = await API.get(`/assignments/detailed-stats/${frameworkId}`);
    return response?.data;
};
