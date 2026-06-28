import { Box, Avatar, Paper } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Props } from "../aiChatTypes";
import { formatChatText } from "../../../utils/helpers";

export default function ChatMessage({ messages, isTyping }: Props) {
  const uniqueMessages = Array.from(
    new Map(messages.map((m) => [m.id, m])).values()
  );
  console.log("MESSAGES:", messages);
  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.4 }}>
      {uniqueMessages.map((m, i) => {
        const isUser = m.role === "user";

        const content =
          typeof m.content === "string" ? m.content : (m.content ?? "");

        return (
          <Box
            key={m.id ?? i}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: 0.5,
              justifyContent: isUser ? "flex-end" : "flex-start"
            }}
          >
            {!isUser && (
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: "#EDEAFF",
                  color: "#6D5BFF"
                }}
              >
                <SmartToyOutlinedIcon fontSize="small" />
              </Avatar>
            )}

            <Paper
              elevation={0}
              sx={{
                p: 1.5,
                maxWidth: "70%",
                borderRadius: 3,
                borderTopLeftRadius: isUser ? 16 : 4,
                borderTopRightRadius: isUser ? 4 : 16,
                background: isUser
                  ? "linear-gradient(135deg,#6D5BFF,#8E6CFF)"
                  : "#fff",
                color: isUser ? "#fff" : "#222",
                whiteSpace: "pre-wrap",
                fontSize: 14,
                lineHeight: 1.5,
                boxShadow: isUser
                  ? "0 4px 14px rgba(109,91,255,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.06)"
              }}
            >
              {formatChatText(content)}
            </Paper>

            {isUser && (
              <Avatar
                sx={{
                  width: 30,
                  height: 30,
                  bgcolor: "#6D5BFF",
                  color: "#fff"
                }}
              >
                <PersonOutlineOutlinedIcon fontSize="small" />
              </Avatar>
            )}
          </Box>
        );
      })}

      {isTyping && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, ml: 5 }}>
          <Box
            sx={{
              display: "flex",
              gap: 0.6,
              px: 1.4,
              py: 1,
              borderRadius: 3,
              bgcolor: "#fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}
          >
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </Box>
        </Box>
      )}

      <style>{`
        .dot {
          width: 6px;
          height: 6px;
          background: #6D5BFF;
          border-radius: 50%;
          animation: blink 1.2s infinite;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.3; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-2px); }
        }
      `}</style>
    </Box>
  );
}
