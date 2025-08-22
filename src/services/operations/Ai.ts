


import axios, { AxiosError } from "axios";
import API from "../axios-client";
import { API_ENDPOINTS } from "../endpoints";

// Types for AI chat functionality
export interface ChatMessage {
  content: string;
  role: "system" | "user" | "assistant";
}

export interface ChatRequest {
  chat_history: ChatMessage[];
  user_question: string;
}

export interface ChatResponse {
  task_id: string;
}

export interface TaskStatus {
  status: "PENDING" | "SUCCESS" | "FAILED";
  result?: {
    chat_history: ChatMessage[];
    response: string;
  };
}

export const getChatRemediationQueryFn = async (
  chat_history: ChatMessage[] = [],
  user_question: string,
  baseURL: string = "https://ai.complianceone.ai"
): Promise<ChatResponse> => {
  try {
    const response = await axios.post<ChatResponse>(
      `${baseURL}${API_ENDPOINTS.AI_CHAT_REMEDIATION}`,
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
        `Failed to get chat task ID. Status: ${status}, Message: ${data?.message || error.message}`
      );
    }
    throw new Error(`Unexpected error: ${(error as Error).message}`);
  }
};

export const getChatResponse = async (
  taskID: string,
  baseURL: string = "https://ai.complianceone.ai"
): Promise<TaskStatus> => {
  try {
    const response = await axios.get<TaskStatus>(`${baseURL}${API_ENDPOINTS.AI_TASK_STATUS}/${taskID}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;
      throw new Error(
        `Failed to get chat response. Status: ${status}, Message: ${data?.message || error.message}`
      );
    }
    throw new Error(`Unexpected error: ${(error as Error).message}`);
  }
};

// Combined function that handles the complete chat flow
export const getChatRemediationComplete = async (
  chat_history: ChatMessage[] = [],
  user_question: string,
  baseURL: string = "https://ai.complianceone.ai"
): Promise<TaskStatus> => {
  try {
    // Step 1: Get task ID
    const chatResponse = await getChatRemediationQueryFn(chat_history, user_question, baseURL);
    
    // Step 2: Poll for task completion
    let attempts = 0;
    const maxAttempts = 30; // Maximum 30 attempts (30 seconds with 1 second delay)
    
    while (attempts < maxAttempts) {
      const taskStatus = await getChatResponse(chatResponse.task_id, baseURL);
      
      if (taskStatus.status === "SUCCESS") {
        return taskStatus;
      } else if (taskStatus.status === "FAILED") {
        throw new Error("Task failed to complete");
      }
      
      // Wait 1 second before next attempt
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }
    
    throw new Error("Task timed out after 30 seconds");
  } catch (error) {
    throw error;
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