import API from "../axios-client";

export const getAssignmentsByOrganizationQueryFn = async (frameworkId: string | null, page = 1, limit = 10) => {
    const response = await API.get(`/assignments/framework/${frameworkId}?page=${page}&limit=${limit}`);
    return response?.data;
};


export const getAssignmentStatQueryFn = async (frameworkId: string | null) => {
    const response = await API.get(`/assignments/detailed-stats/${frameworkId}`);
    return response?.data;
};

export const getReportQueryFn = async (data:any) => {
    try {
        const response = await API.post(`/report/generate-report`,data);
        return response;
    } catch (error) {
        console.log(error)
    }
};
