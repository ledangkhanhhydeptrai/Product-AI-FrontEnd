import React, { useMemo } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Stack
} from "@mui/material";
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
  // ✅ KHÔNG useState, KHÔNG useEffect
  const previewUrl = useMemo(() => {
    if (!file) return "";

    const url = URL.createObjectURL(file);

    return url;
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
        p: 3,
        borderRadius: 3,
        border: "1px solid #eef0f3",
        maxWidth: 520
      }}
    >
      <Typography sx={{ fontSize: 18, fontWeight: 600, mb: 2 }}>
        Create Brand
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Brand name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            size="small"
            multiline
            rows={3}
          />

          <Box>
            <Typography sx={{ fontSize: 13, mb: 1, color: "text.secondary" }}>
              Brand logo
            </Typography>

            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Avatar
                src={previewUrl}
                sx={{ width: 56, height: 56, bgcolor: "#f4f5f7" }}
              />

              <Button variant="outlined" component="label" size="small">
                Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>

              {file && (
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  {file.name}
                </Typography>
              )}
            </Stack>
          </Box>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2
            }}
          >
            Save Brand
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}
