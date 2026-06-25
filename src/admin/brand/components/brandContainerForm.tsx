import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Stack,
  Divider,
  CircularProgress
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { CreateBrandPropsForm } from "../../../features/brands/brandTypes";

export default function BrandContainerForm({
  name,
  setName,
  description,
  setDescription,
  logo,
  setLogo,
  onSubmit,
  loading = false,
  error
}: CreateBrandPropsForm) {
  // Create/revoke the preview URL only when `file` changes, instead of on
  // every render (the previous useMemo version leaked a blob URL each time).

  const previewUrl = React.useMemo(() => {
    if (!logo) return null;

    return URL.createObjectURL(logo);
  }, [logo]);

  React.useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setLogo(f);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        maxWidth: 520,
        overflow: "hidden",
        boxShadow: "0 2px 20px rgba(20, 20, 43, 0.06)"
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          py: 2.5,
          background: "linear-gradient(135deg, #5b5fef 0%, #8b5cf6 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 1.5
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          <StorefrontOutlinedIcon sx={{ fontSize: 20 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>
            Tạo thương hiệu mới
          </Typography>
          <Typography sx={{ fontSize: 12.5, opacity: 0.85 }}>
            Thêm một brand mới vào hệ thống
          </Typography>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          {error && (
            <Typography
              sx={{
                fontSize: 13,
                color: "error.main",
                bgcolor: "error.light",
                px: 1.5,
                py: 1,
                borderRadius: 2
              }}
            >
              {error}
            </Typography>
          )}

          {/* Logo uploader */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 3,
              bgcolor: "action.hover",
              border: "1px dashed",
              borderColor: previewUrl ? "primary.main" : "divider",
              transition: "border-color 0.2s ease"
            }}
          >
            <Avatar
              src={previewUrl || undefined}
              variant="rounded"
              sx={{
                width: 64,
                height: 64,
                borderRadius: 2.5,
                bgcolor: "#eef0fd",
                color: "#5b5fef",
                fontWeight: 700,
                fontSize: 22,
                flexShrink: 0,
                border: "2px solid #fff",
                boxShadow: "0 0 0 2px #e3e5fb"
              }}
            >
              {!previewUrl && name ? name.charAt(0).toUpperCase() : null}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>
                Logo thương hiệu
              </Typography>
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  disabled={loading}
                  startIcon={<CloudUploadOutlinedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: 12.5,
                    borderColor: "divider",
                    color: "text.secondary",
                    "&:hover": {
                      borderColor: "primary.main",
                      color: "primary.main"
                    }
                  }}
                >
                  Chọn ảnh
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>

                {logo ? (
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 140
                    }}
                    title={logo.name}
                  >
                    {logo.name}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: 12, color: "text.disabled" }}>
                    Chưa chọn file
                  </Typography>
                )}
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "divider" }} />

          <TextField
            label="Tên thương hiệu"
            placeholder="Ví dụ: Nike"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
            disabled={loading}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <TextField
            label="Mô tả"
            placeholder="Mô tả ngắn về thương hiệu"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            size="small"
            multiline
            rows={3}
            disabled={loading}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={16} color="inherit" /> : null
            }
            sx={{
              mt: 1,
              py: 1.1,
              textTransform: "none",
              fontWeight: 700,
              fontSize: 14.5,
              borderRadius: 2.5,
              background: "linear-gradient(135deg, #5b5fef 0%, #8b5cf6 100%)",
              boxShadow: "0 4px 14px rgba(91, 95, 239, 0.35)",
              "&:hover": {
                background: "linear-gradient(135deg, #4d51e0 0%, #7c4ce0 100%)",
                boxShadow: "0 6px 18px rgba(91, 95, 239, 0.45)"
              },
              "&.Mui-disabled": {
                background: "linear-gradient(135deg, #b9bcf5 0%, #d3bdf2 100%)",
                color: "#fff"
              }
            }}
          >
            {loading ? "Đang lưu..." : "Lưu thương hiệu"}
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
