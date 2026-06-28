import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { ChatProps } from "./aiChatTypes";

export const getAllChat = async (): Promise<ApiResponse<ChatProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ChatProps>>(`/chat`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
export const createChatMessage = async ({
  message
}: {
  message: string;
}): Promise<ApiResponse<ChatProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ChatProps>>(
      "/chat/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { message }
      }
    );
    console.log("Create", response.data);
    console.log("SEND:", { message });
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    console.error("CHAT ERROR:", errors);
    throw errors;
  }
};
