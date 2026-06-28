export interface ChatProps {
  id: string;
  user_id: string | null;
  role: "user" | "assistant";
  content: string;
  created_at: string;
  isTyping: boolean;
}
export interface ChatCreateProps {
  message: string;
}
export type ChatInputProps = {
  setIsTyping: (value: boolean) => void;
};
export type ChatMessageItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
};
export type Props = {
  messages: ChatMessageItem[];
  isTyping: boolean;
};
export interface CreateResponse {
  message: string;
  answer: string;
}
