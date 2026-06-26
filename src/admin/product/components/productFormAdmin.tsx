import React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import InventoryRoundedIcon from "@mui/icons-material/Inventory2Rounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { ProductPropsFormAdmin } from "../../../features/product/productTypes";

const SectionTitle: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}> = ({ icon, title, subtitle }) => (
  <Stack direction="row" spacing={1.5} sx={{ mb: 2, alignItems: "center" }}>
    <Avatar
      variant="rounded"
      sx={{
        width: 36,
        height: 36,
        bgcolor: "primary.main",
        color: "primary.contrastText",
        borderRadius: 2
      }}
    >
      {icon}
    </Avatar>
    <Box>
      <Typography sx={{ fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  </Stack>
);

const SectionCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Paper
    variant="outlined"
    sx={{
      p: { xs: 2, md: 3 },
      borderRadius: 3,
      borderColor: "divider",
      bgcolor: "background.paper"
    }}
  >
    {children}
  </Paper>
);

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
  const previewSrc = file ? URL.createObjectURL(file) : thumbnail;

  return (
    <form onSubmit={onSubmit}>
      <DialogContent
        sx={{
          bgcolor: "grey.50",
          py: 3
        }}
      >
        <Box sx={{ maxWidth: 1040, mx: "auto" }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: "1.4rem", fontWeight: 800 }}>
              Product information
            </Typography>
            <Typography sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
              Fill in the details below to {name ? "update" : "create"} this
              product.
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
            {/* LEFT: main content */}
            <Stack spacing={3} sx={{ flex: { md: "1 1 62%" }, minWidth: 0 }}>
              {/* Basic info */}
              <SectionCard>
                <SectionTitle
                  icon={<SellRoundedIcon fontSize="small" />}
                  title="Basic details"
                  subtitle="Name, slug and description shown to customers"
                />
                <Stack spacing={2}>
                  <TextField
                    label="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Slug"
                    helperText="Used in the product URL, e.g. nike-air-max-90"
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
                </Stack>
              </SectionCard>

              {/* Pricing & stock */}
              <SectionCard>
                <SectionTitle
                  icon={<InventoryRoundedIcon fontSize="small" />}
                  title="Pricing & stock"
                  subtitle="Set the sale price and how many units are available"
                />
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                  <TextField
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    fullWidth
                    required
                    slotProps={{
                      input: {
                        startAdornment: <span>₫</span>
                      }
                    }}
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
              </SectionCard>

              {/* Classification */}
              <SectionCard>
                <SectionTitle
                  icon={<CategoryRoundedIcon fontSize="small" />}
                  title="Classification"
                  subtitle="Group the product under a category and brand"
                />
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
              </SectionCard>
            </Stack>

            {/* RIGHT: image + status sidebar */}
            <Stack
              spacing={3}
              sx={{
                flex: { md: "1 1 38%" },
                minWidth: 0,
                position: { md: "sticky" },
                top: { md: 16 },
                alignSelf: { md: "flex-start" }
              }}
            >
              {/* Image */}
              <SectionCard>
                <SectionTitle
                  icon={<ImageRoundedIcon fontSize="small" />}
                  title="Product image"
                  subtitle="Use a URL or upload a file"
                />

                <Box
                  sx={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: 2.5,
                    border: "1px dashed",
                    borderColor: "divider",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "grey.100",
                    mb: 2
                  }}
                >
                  {previewSrc ? (
                    <Box
                      component="img"
                      src={previewSrc}
                      alt="preview"
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Stack spacing={0.5} sx={{ alignItems: "center" }}>
                      <ImageRoundedIcon
                        sx={{ color: "text.disabled", fontSize: 40 }}
                      />
                      <Typography
                        sx={{ fontSize: "0.75rem", color: "text.disabled" }}
                      >
                        No image yet
                      </Typography>
                    </Stack>
                  )}
                </Box>

                <Stack spacing={1.5}>
                  <Button
                    component="label"
                    variant="outlined"
                    size="small"
                    fullWidth
                    startIcon={<CloudUploadRoundedIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Upload image
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
                    <Chip
                      label={file.name}
                      size="small"
                      onDelete={() => setFile(null)}
                      sx={{ alignSelf: "flex-start", maxWidth: "100%" }}
                    />
                  )}

                  <Divider sx={{ my: 0.5 }}>
                    <Typography sx={{ fontSize: "0.7rem", color: "text.disabled" }}>
                      OR
                    </Typography>
                  </Divider>

                  <TextField
                    label="Thumbnail URL"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Stack>
              </SectionCard>

              {/* Status */}
              <SectionCard>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      Visibility
                    </Typography>
                    <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                      Inactive products are hidden from the storefront
                    </Typography>
                  </Box>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", justifyContent: "space-between" }}
                  >
                    <Chip
                      label={is_active ? "Active" : "Inactive"}
                      color={is_active ? "success" : "default"}
                      size="small"
                    />
                    <Switch
                      checked={is_active}
                      onChange={(e) => setIs_active(e.target.checked)}
                    />
                  </Stack>
                </Stack>
              </SectionCard>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>

        <Button type="submit" variant="contained" sx={{ borderRadius: 2, px: 3 }}>
          Save product
        </Button>
      </DialogActions>
    </form>
  );
};

export default ProductFormAdmin;