import React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { CreateBrandPropsForm } from "../../../features/brands/brandTypes";

export default function UpdateBrandContainerForm({
  description,
  setDescription,
  logo,
  setLogo,
  name,
  setName,
  onClose,
  onSubmit,
  loading = false,
  error
}: CreateBrandPropsForm) {
  // Build/revoke an object URL only when the logo actually changes,
  // instead of re-creating one on every render.

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

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider"
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 40,
              height: 40
            }}
          >
            <StorefrontRoundedIcon fontSize="small" />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              Cập nhật Brand
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Chỉnh sửa thông tin thương hiệu
            </Typography>
          </Box>
        </Stack>

        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        <Stack spacing={3} sx={{ minWidth: { sm: 480 } }}>
          {error && (
            <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={2.5}>
            <TextField
              disabled={loading}
              label="Tên thương hiệu"
              placeholder="Ví dụ: Nike, Apple..."
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 }
              }}
            />

            <TextField
              disabled={loading}
              label="Mô tả"
              placeholder="Mô tả ngắn về thương hiệu..."
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: 2 }
              }}
            />
          </Stack>

          {/* Logo uploader */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
            >
              Logo thương hiệu
            </Typography>

            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 88,
                  height: 88,
                  flexShrink: 0,
                  borderRadius: 2.5,
                  border: "1.5px dashed",
                  borderColor: previewUrl ? "primary.main" : "divider",
                  bgcolor: "background.default",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative"
                }}
              >
                {previewUrl ? (
                  <Box
                    component="img"
                    src={previewUrl}
                    alt="Logo preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      p: 1
                    }}
                  />
                ) : (
                  <CloudUploadRoundedIcon
                    sx={{ color: "text.disabled", fontSize: 28 }}
                  />
                )}
              </Box>

              <Stack spacing={1} sx={{ minWidth: 0 }}>
                <Button
                  component="label"
                  variant="outlined"
                  size="small"
                  disabled={loading}
                  startIcon={<CloudUploadRoundedIcon />}
                  sx={{ borderRadius: 2, alignSelf: "flex-start" }}
                >
                  {logo ? "Đổi logo" : "Tải logo lên"}
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setLogo(e.target.files[0]);
                      }
                    }}
                  />
                </Button>

                {logo && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ maxWidth: 220 }}
                    title={logo.name}
                  >
                    {logo.name}
                  </Typography>
                )}
                {!logo && (
                  <Typography variant="caption" color="text.disabled">
                    PNG, JPG tối đa 5MB
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid",
          borderColor: "divider"
        }}
      >
        <Button
          color="inherit"
          onClick={onClose}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Hủy
        </Button>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : null
          }
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            boxShadow: "none",
            "&:hover": { boxShadow: "none" }
          }}
        >
          {loading ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </DialogActions>
    </Box>
  );
}
