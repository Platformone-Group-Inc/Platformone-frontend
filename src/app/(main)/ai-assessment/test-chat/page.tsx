"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  getChatRemediationQueryFn, 
  getChatResponse, 
  getChatRemediationComplete,
  type ChatMessage 
} from "@/services/operations/Ai";

const TestChatPage = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<any>(null);
  const [finalResponse, setFinalResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetTaskId = async () => {
    if (!userQuestion.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setTaskId(null);
    setTaskStatus(null);
    setFinalResponse(null);

    try {
      const response = await getChatRemediationQueryFn(chatHistory, userQuestion);
      setTaskId(response.task_id);
      console.log("Task ID received:", response.task_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error getting task ID:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckTaskStatus = async () => {
    if (!taskId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const status = await getChatResponse(taskId);
      setTaskStatus(status);
      console.log("Task status:", status);
      
      if (status.status === "SUCCESS") {
        setFinalResponse(status.result?.response);
        // Update chat history
        if (status.result?.chat_history) {
          setChatHistory(status.result.chat_history);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error checking task status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteFlow = async () => {
    if (!userQuestion.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setTaskId(null);
    setTaskStatus(null);
    setFinalResponse(null);

    try {
      const result = await getChatRemediationComplete(chatHistory, userQuestion);
      setTaskStatus(result);
      setFinalResponse(result.result?.response);
      
      if (result.result?.chat_history) {
        setChatHistory(result.result.chat_history);
      }
      
      console.log("Complete flow result:", result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
      console.error("Error in complete flow:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setUserQuestion("");
    setChatHistory([]);
    setTaskId(null);
    setTaskStatus(null);
    setFinalResponse(null);
    setError(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">AI Chat API Test</h1>
        <p className="text-gray-600">Test the CMMC remediation chat API functionality</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Step 1: Send Question</CardTitle>
          <CardDescription>Enter your CMMC compliance question</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="e.g., tell me about CMMC Compliance?"
              className="flex-1"
            />
            <Button onClick={handleGetTaskId} disabled={isLoading || !userQuestion.trim()}>
              Get Task ID
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleCompleteFlow} disabled={isLoading || !userQuestion.trim()}>
              Complete Flow (Auto)
            </Button>
            <Button variant="outline" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {taskId && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Check Task Status</CardTitle>
            <CardDescription>Task ID: {taskId}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleCheckTaskStatus} disabled={isLoading}>
              Check Status
            </Button>
          </CardContent>
        </Card>
      )}

      {taskStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Task Status</CardTitle>
            <CardDescription>
              Status: <Badge variant={taskStatus.status === "SUCCESS" ? "default" : "secondary"}>
                {taskStatus.status}
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(taskStatus, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {finalResponse && (
        <Card>
          <CardHeader>
            <CardTitle>AI Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">
              {finalResponse}
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 p-4 rounded text-red-700">
              {error}
            </div>
          </CardContent>
        </Card>
      )}

      {chatHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Chat History</CardTitle>
            <CardDescription>API chat history for context</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {chatHistory.map((message, index) => (
                <div key={index} className="flex gap-2">
                  <Badge variant="outline" className="w-20">
                    {message.role}
                  </Badge>
                  <div className="flex-1 bg-gray-50 p-2 rounded text-sm">
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default TestChatPage;
