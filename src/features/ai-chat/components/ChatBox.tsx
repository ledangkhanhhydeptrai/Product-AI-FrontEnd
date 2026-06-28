import React from "react";
import {
  Box,
  Paper,
  Fab,
  Zoom,
  Tooltip,
  IconButton,
  Typography,
  Avatar
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";

import { getChatRequest } from "../aiChatSlice";

import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

const ChatBox: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, loading } = useAppSelector((state) => state.chat);
  console.log("CHAT DATA:", data);
  const [open, setOpen] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);

  const bottomRef = React.useRef<HTMLDivElement>(null);
  const loadedRef = React.useRef(false);

  React.useEffect(() => {
    if (open && !loadedRef.current) {
      dispatch(getChatRequest());
      loadedRef.current = true;
    }
  }, [open, dispatch]);

  React.useEffect(() => {
    const el = bottomRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth" });
    });
  }, [data, isTyping]);

  if (!open) {
    return (
      <Tooltip title="Mở chat AI" placement="left">
        <Fab
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 64,
            height: 64,
            background: "linear-gradient(135deg,#6D5BFF,#8E6CFF)",
            color: "#fff",
            boxShadow: "0 8px 24px rgba(109,91,255,0.45)",
            transition: "transform .2s ease, box-shadow .2s ease",
            "&:hover": {
              background: "linear-gradient(135deg,#5C4AEF,#7E5CFF)",
              transform: "scale(1.08)",
              boxShadow: "0 10px 28px rgba(109,91,255,0.55)"
            }
          }}
        >
          <ChatIcon sx={{ fontSize: 28 }} />
        </Fab>
      </Tooltip>
    );
  }

  return (
    <Zoom in>
      <Paper
        elevation={0}
        sx={{
          width: 400,
          height: 640,
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: "0 16px 48px rgba(31,20,90,0.25)",
          border: "1px solid rgba(109,91,255,0.12)",
          zIndex: 1300, // cao hơn các phần tử absolute khác trên trang
          isolation: "isolate" // tạo stacking context riêng, chặn absolute bên ngoài chui vào
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg,#6D5BFF,#8E6CFF)",
            color: "#fff",
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.22)",
                width: 38,
                height: 38
              }}
            >
              <SmartToyOutlinedIcon />
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                AI Assistant
              </Typography>
              <Typography sx={{ fontSize: 12, opacity: 0.85 }}>
                Luôn sẵn sàng hỗ trợ bạn
              </Typography>
            </Box>
          </Box>

          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              color: "#fff",
              bgcolor: "rgba(255,255,255,0.12)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.22)" }
            }}
            size="small"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* MESSAGES */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            bgcolor: "#FAF9FF",
            backgroundImage:
              "radial-gradient(circle at top right, rgba(109,91,255,0.06), transparent 60%)",
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(109,91,255,0.25)",
              borderRadius: 4
            }
          }}
        >
          <ChatMessage messages={data} isTyping={isTyping || loading} />
          <div ref={bottomRef} />
        </Box>

        {/* INPUT */}
        <ChatInput setIsTyping={setIsTyping} />
      </Paper>
    </Zoom>
  );
};

export default ChatBox;
