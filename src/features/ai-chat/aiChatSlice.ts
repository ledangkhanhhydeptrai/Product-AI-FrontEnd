import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatProps } from "./aiChatTypes";

interface ChatState {
  loading: boolean;
  error: string | null;
  data: ChatProps[];
  chat: ChatProps | null;
  isTyping: boolean;
}
const initialState: ChatState = {
  loading: false,
  error: null,
  data: [],
  chat: null,
  isTyping: false
};
const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChatRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getChatSuccess(state, action: PayloadAction<ChatProps[]>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    getChatFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createChatRequest(state, _action: PayloadAction<{ message: string }>) {
      state.isTyping = true;
      state.error = null;
    },
    createChatSuccess(state, action: PayloadAction<ChatProps>) {
      state.isTyping = false;

      const exists = state.data.some((m) => m.id === action.payload.id);
      if (!exists) {
        state.data.push(action.payload);
      }
    },
    createChatFailure(state, action: PayloadAction<string>) {
      state.isTyping = false;
      state.error = action.payload;
    },

    setTyping(state, action: PayloadAction<boolean>) {
      state.isTyping = action.payload;
    },
    addUserMessage(state, action: PayloadAction<ChatProps>) {
      state.data.push(action.payload);
      state.data = Array.from(
        new Map(state.data.map((m) => [m.id, m])).values()
      );
    }
  }
});
export const {
  getChatRequest,
  getChatSuccess,
  getChatFailure,
  createChatRequest,
  createChatSuccess,
  createChatFailure,
  addUserMessage,
  setTyping
} = ChatSlice.actions;
export default ChatSlice.reducer;
