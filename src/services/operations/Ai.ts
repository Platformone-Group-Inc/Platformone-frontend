


import axios, { AxiosError } from "axios";
import API from "../axios-client";

export const getChatRemediationQueryFn = async (
  chat_history: any[] = [],
  user_question: string,
  baseURL: string = "https://ai.complianceone.ai"
) => {
  try {
    const response = await axios.post(
      baseURL + "/chat/cmmc/remediation",
      {
        chat_history,
        user_question,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      throw new Error(
        `Failed to fetch remediation data. Status: ${status}, Message: ${data?.message || error.message}`
      );
    }
    throw new Error(`Unexpected error: ${(error as Error).message}`);
  }
};


export const getReportVersions = async (
  organizationId?: string,
  opts?: { page?: number; limit?: number }
) => {
  const { page = 1, limit = 10 } = opts ?? {};
  const res = await API.get<any>(
    `/report/versions/${encodeURIComponent(organizationId || '')}`,
    { params: { page, limit } }
  );
  return res.data;
};