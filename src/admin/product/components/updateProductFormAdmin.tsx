import React from "react";
import {
  Box,
  Button,
  DialogActions,
  TextField,
  Typography,
  Paper,
  Divider,
  Avatar,
  InputAdornment,
  Stack
} from "@mui/material";
import {
  Inventory2Outlined,
  LinkOutlined,
  AttachMoneyOutlined,
  DescriptionOutlined,
  ImageOutlined
} from "@mui/icons-material";
import { FormUpdateProductForm } from "../../../features/product/productTypes";

const UpdateProductFormAdmin: React.FC<FormUpdateProductForm> = ({
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  thumbnail,
  setThumbnail,
  onSubmit,
  onClose,
  slug,
  setSlug
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 4 },
        borderRadius: 3,
        maxWidth: 560,
        mx: "auto",
        border: "1px solid",
        borderColor: "divider"
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} sx={{ mb: 1, alignItems: "center" }}>
        <Avatar
          variant="rounded"
          src={thumbnail || undefined}
          sx={{
            width: 48,
            height: 48,
            bgcolor: "primary.light",
            borderRadius: 2
          }}
        >
          <Inventory2Outlined fontSize="small" />
        </Avatar>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 18, lineHeight: 1.3 }}>
            Update Product
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Chỉnh sửa thông tin sản phẩm hiện tại
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 2.5 }} />

      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2.5
        }}
      >
        <TextField
          label="Product name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory2Outlined fontSize="small" color="action" />
                </InputAdornment>
              )
            }
          }}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="Slug"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkOutlined fontSize="small" color="action" />
                  </InputAdornment>
                )
              }
            }}
          />

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyOutlined fontSize="small" color="action" />
                  </InputAdornment>
                )
              }
            }}
          />
        </Stack>

        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          minRows={4}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{ alignSelf: "flex-start", mt: 1.5 }}
                >
                  <DescriptionOutlined fontSize="small" color="action" />
                </InputAdornment>
              )
            }
          }}
        />

        <TextField
          label="Thumbnail URL"
          value={thumbnail}
          onChange={e => setThumbnail(e.target.value)}
          fullWidth
          placeholder="https://..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <ImageOutlined fontSize="small" color="action" />
                </InputAdornment>
              )
            }
          }}
        />

        <Divider sx={{ mt: 1 }} />

        <DialogActions sx={{ px: 0, justifyContent: "space-between" }}>
          <Button
            onClick={onClose}
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none", px: 3, borderRadius: 2 }}
          >
            Save changes
          </Button>
        </DialogActions>
      </Box>
    </Paper>
  );
};

export default UpdateProductFormAdmin;
