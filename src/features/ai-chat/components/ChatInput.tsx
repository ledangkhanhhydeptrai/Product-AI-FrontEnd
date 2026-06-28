import React from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { createChatRequest } from "../aiChatSlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { ChatInputProps } from "../aiChatTypes";

export default function ChatInput({ setIsTyping }: ChatInputProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.chat.loading);

  const [text, setText] = React.useState("");

  const send = async () => {
    const value = text.trim();
    if (!value) return;

    setText("");
    setIsTyping(true);

    dispatch(createChatRequest({ message: value }));

    setIsTyping(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1.2,
        gap: 1,
        borderTop: "1px solid rgba(109,91,255,0.12)",
        bgcolor: "#fff"
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Nhập tin nhắn..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 999,
            bgcolor: "#F4F2FF",
            "& fieldset": { border: "none" },
            "&.Mui-focused fieldset": {
              border: "1px solid #6D5BFF"
            }
          }
        }}
      />

      <IconButton
        onClick={send}
        disabled={loading}
        sx={{
          background: "linear-gradient(135deg,#6D5BFF,#8E6CFF)",
          color: "#fff",
          width: 40,
          height: 40,
          "&:hover": {
            background: "linear-gradient(135deg,#5C4AEF,#7E5CFF)"
          },
          "&.Mui-disabled": {
            background: "rgba(109,91,255,0.3)",
            color: "#fff"
          }
        }}
      >
        {loading ? (
          <CircularProgress size={18} sx={{ color: "#fff" }} />
        ) : (
          <SendIcon fontSize="small" />
        )}
      </IconButton>
    </Box>
  );
}
