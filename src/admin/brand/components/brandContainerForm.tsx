import React, { useMemo } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Stack,
  Divider
} from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { CreateBrandPropsForm } from "../../../features/brands/brandTypes";

export default function BrandContainerForm({
  name,
  setName,
  description,
  setDescription,
  file,
  setFile,
  onSubmit
}: CreateBrandPropsForm) {
  const previewUrl = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        borderRadius: 4,
        border: "1px solid #eef0f3",
        maxWidth: 520,
        overflow: "hidden",
        boxShadow: "0 2px 16px rgba(20, 20, 43, 0.04)"
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
            justifyContent: "center"
          }}
        >
          <StorefrontOutlinedIcon sx={{ fontSize: 20 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 17, fontWeight: 700, lineHeight: 1.2 }}>
            Create Brand
          </Typography>
          <Typography sx={{ fontSize: 12.5, opacity: 0.85 }}>
            Add a new brand to your catalog
          </Typography>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          {/* Logo uploader */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 3,
              bgcolor: "#fafbfc",
              border: "1px dashed #d9deea"
            }}
          >
            <Avatar
              src={previewUrl}
              sx={{
                width: 64,
                height: 64,
                bgcolor: "#eef0fd",
                color: "#5b5fef",
                fontWeight: 700,
                border: "2px solid #fff",
                boxShadow: "0 0 0 2px #e3e5fb"
              }}
            >
              {!previewUrl && name ? name.charAt(0).toUpperCase() : null}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>
                Brand logo
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
                  startIcon={<CloudUploadOutlinedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: 12.5,
                    borderColor: "#d9deea",
                    color: "#444",
                    "&:hover": { borderColor: "#5b5fef", color: "#5b5fef" }
                  }}
                >
                  Choose file
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>

                {file ? (
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: 140
                    }}
                  >
                    {file.name}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: 12, color: "#aaa" }}>
                    No file selected
                  </Typography>
                )}
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ borderColor: "#f0f1f4" }} />

          <TextField
            label="Brand name"
            placeholder="e.g. Nike"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <TextField
            label="Description"
            placeholder="Short description of the brand"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            size="small"
            multiline
            rows={3}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
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
              }
            }}
          >
            Save Brand
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
