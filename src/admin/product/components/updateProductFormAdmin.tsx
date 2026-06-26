import React from "react";
import {
  Box,
  Button,
  DialogActions,
  TextField,
  Typography,
  Paper
} from "@mui/material";
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2
        }}
      >
        <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
          Update Product
        </Typography>

        <TextField
          label="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          fullWidth
        />

        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={4}
          fullWidth
        />

        {/* Thumbnail string only */}
        <TextField
          label="Thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          fullWidth
        />

        <DialogActions sx={{ px: 0, mt: 1, justifyContent: "space-between" }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save changes
          </Button>
        </DialogActions>
      </Box>
    </Paper>
  );
};

export default UpdateProductFormAdmin;
