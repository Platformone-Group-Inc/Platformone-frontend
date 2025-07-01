


import axios, { AxiosError } from "axios";

export const getChatRemediationQueryFn = async (
  chat_history: any[] = [],
  user_question: string,
  baseURL: string = "http://138.91.106.170:8000"
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
