import React from "react";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { ProductPropsFormAdmin } from "../../../features/product/productTypes";

const ProductFormAdmin: React.FC<ProductPropsFormAdmin> = ({
  name,
  setName,
  slug,
  setSlug,
  description,
  setDescription,
  price,
  setPrice,
  stock,
  setStock,
  category_id,
  setCategory_id,
  brand_id,
  setBrand_id,
  thumbnail,
  setThumbnail,
  is_active,
  setIs_active,
  file,
  setFile,
  brand,
  category,
  onSubmit,
  onClose
}) => {
  return (
    <form onSubmit={onSubmit}>
      <DialogContent>
        <Stack spacing={3}>
          <Typography
            sx={{
              fontSize: "1.25rem",
              fontWeight: 700,
              mb: 2
            }}
          >
            Product Information
          </Typography>

          <TextField
            label="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              label="Price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth
              required
            />

            <TextField
              label="Stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              fullWidth
              required
            />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category_id}
                label="Category"
                onChange={(e) => setCategory_id(e.target.value)}
              >
                {category.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                value={brand_id}
                label="Brand"
                onChange={(e) => setBrand_id(e.target.value)}
              >
                {brand.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <TextField
            label="Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            fullWidth
          />

          <Box>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadRoundedIcon />}
            >
              Upload Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </Button>

            {file && (
              <Typography
                sx={{
                  mt: 1,
                  fontSize: "0.875rem",
                  color: "text.secondary"
                }}
              >
                {file.name}
              </Typography>
            )}
          </Box>

          {(thumbnail || file) && (
            <Box>
              <Typography
                sx={{
                  mt: 1,
                  fontSize: "0.875rem",
                  color: "text.secondary"
                }}
              >
                Preview
              </Typography>

              <Box
                component="img"
                src={file ? URL.createObjectURL(file) : thumbnail}
                alt="preview"
                sx={{
                  width: 180,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider"
                }}
              />
            </Box>
          )}

          <FormControlLabel
            control={
              <Switch
                checked={is_active}
                onChange={(e) => setIs_active(e.target.checked)}
              />
            }
            label={is_active ? "Active" : "Inactive"}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>

        <Button type="submit" variant="contained">
          Save Product
        </Button>
      </DialogActions>
    </form>
  );
};

export default ProductFormAdmin;
