import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { ChatProps, CreateResponse } from "./aiChatTypes";
import { createChatMessage, getAllChat } from "./aiChatApi";
import {
  createChatFailure,
  createChatRequest,
  createChatSuccess,
  getChatFailure,
  getChatRequest,
  getChatSuccess
} from "./aiChatSlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleGetAllChat(): Generator {
  try {
    const response: ApiResponse<ChatProps[]> = yield call(getAllChat);
    yield put(getChatSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getChatFailure(errors.message));
  }
}
function* handleCreateChat(
  action: PayloadAction<{ message: string }>
): Generator {
  try {
    const { message } = action.payload;

    // ✅ 1. HIỆN USER MESSAGE NGAY LẬP TỨC
    const userMsg: ChatProps = {
      id: crypto.randomUUID(),
      user_id: null,
      role: "user",
      content: message, // ❗ dùng message gốc, không dùng response
      created_at: new Date().toISOString(),
      isTyping: false
    };

    yield put(createChatSuccess(userMsg));

    // ✅ 2. CALL API SAU
    const response: ApiResponse<CreateResponse> = yield call(
      createChatMessage,
      { message }
    );

    // ✅ 3. AI RESPONSE
    const aiMsg: ChatProps = {
      id: crypto.randomUUID(),
      user_id: null,
      role: "assistant",
      content: response.data.answer, // hoặc field AI trả về
      created_at: new Date().toISOString(),
      isTyping: false
    };

    yield put(createChatSuccess(aiMsg));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(createChatFailure(errors.message));
  }
}
export default function* chatSaga() {
  yield takeLatest(getChatRequest.type, handleGetAllChat);
  yield takeLatest(createChatRequest.type, handleCreateChat);
}
