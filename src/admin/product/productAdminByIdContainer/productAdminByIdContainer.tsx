import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import SellRoundedIcon from "@mui/icons-material/SellRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import TagRoundedIcon from "@mui/icons-material/TagRounded";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { productAdminByIdRequest } from "../../../features/product/productSlice";

const InfoTile: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}> = ({ icon, label, value }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      borderRadius: 2,
      display: "flex",
      alignItems: "flex-start",
      gap: 1.5,
      height: "100%",
      borderColor: "divider"
    }}
  >
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "action.hover",
        color: "text.secondary",
        flexShrink: 0
      }}
    >
      {icon}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", display: "block" }}
      >
        {label}
      </Typography>
      <Typography
        sx={{ fontWeight: 600, wordBreak: "break-word" }}
        variant="body2"
      >
        {value}
      </Typography>
    </Box>
  </Paper>
);

const ProductAdminByIdContainer: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { adminProps, loading, error } = useAppSelector(
    (state) => state.product
  );

  React.useEffect(() => {
    if (id) {
      dispatch(productAdminByIdRequest(id));
    }
  }, [dispatch, id]);

  const BackButton = (
    <Button
      onClick={() => navigate(-1)}
      startIcon={<ArrowBackRoundedIcon />}
      variant="text"
      sx={{
        textTransform: "none",
        fontWeight: 600,
        color: "text.secondary",
        "&:hover": { bgcolor: "action.hover", color: "text.primary" }
      }}
    >
      Quay lại
    </Button>
  );

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        {BackButton}
        <Box
          sx={{
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2
          }}
        >
          <CircularProgress size={28} />
          <Typography color="text.secondary">Đang tải sản phẩm...</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        {BackButton}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            mt: 1,
            borderRadius: 2,
            borderColor: "error.light",
            bgcolor: "error.50"
          }}
        >
          <Typography color="error" sx={{ fontWeight: 600 }}>
            {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  if (!adminProps) return null;

  return (
    <Box sx={{ p: 2 }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2
        }}
      >
        {BackButton}
      </Stack>

      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          mb: 3
        }}
      >
        Chi tiết sản phẩm
      </Typography>

      <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Grid container spacing={4}>
            {/* Image */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box
                component="img"
                src={adminProps.image_url || adminProps.thumbnail}
                alt={adminProps.name}
                sx={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  bgcolor: "background.default"
                }}
              />
            </Grid>

            {/* Information */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  mb: 1
                }}
              >
                <Typography
                  sx={{ fontSize: 26, fontWeight: 700, lineHeight: 1.25 }}
                >
                  {adminProps.name}
                </Typography>
              </Stack>

              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.5,
                  mb: 2.5
                }}
              >
                <TagRoundedIcon
                  sx={{ fontSize: 16, color: "text.secondary" }}
                />
                <Typography color="text.secondary" variant="body2">
                  {adminProps.slug}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mb: 3, flexWrap: "wrap", rowGap: 1 }}
              >
                <Chip
                  size="small"
                  label={
                    adminProps.is_active ? "Đang hoạt động" : "Ngừng hoạt động"
                  }
                  color={adminProps.is_active ? "success" : "default"}
                />
                <Chip
                  size="small"
                  label={`Kho: ${adminProps.stock}`}
                  color={adminProps.stock > 0 ? "info" : "error"}
                  variant="outlined"
                />
                <Chip
                  size="small"
                  label={
                    adminProps.has_embedding
                      ? "Đã có Embedding"
                      : "Chưa có Embedding"
                  }
                  color={adminProps.has_embedding ? "primary" : "default"}
                  variant={adminProps.has_embedding ? "filled" : "outlined"}
                />
              </Stack>

              <Typography
                sx={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: "primary.main",
                  mb: 3
                }}
              >
                {adminProps.price.toLocaleString("vi-VN")} ₫
              </Typography>

              <Divider sx={{ mb: 2.5 }} />

              <Typography sx={{ fontWeight: 600, mb: 1 }}>Mô tả</Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.7 }}
              >
                {adminProps.description || "Chưa có mô tả"}
              </Typography>

              <Divider sx={{ mb: 2.5 }} />

              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InfoTile
                    icon={<TagRoundedIcon fontSize="small" />}
                    label="Mã sản phẩm"
                    value={adminProps.id}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InfoTile
                    icon={<CategoryRoundedIcon fontSize="small" />}
                    label="Mã danh mục"
                    value={adminProps.category_id}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InfoTile
                    icon={<SellRoundedIcon fontSize="small" />}
                    label="Mã thương hiệu"
                    value={adminProps.brand_id}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InfoTile
                    icon={<InventoryRoundedIcon fontSize="small" />}
                    label="Tồn kho"
                    value={adminProps.stock}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InfoTile
                    icon={<EventRoundedIcon fontSize="small" />}
                    label="Ngày tạo"
                    value={new Date(adminProps.created_at).toLocaleString(
                      "vi-VN"
                    )}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <InfoTile
                    icon={<UpdateRoundedIcon fontSize="small" />}
                    label="Cập nhật lần cuối"
                    value={new Date(adminProps.updated_at).toLocaleString(
                      "vi-VN"
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductAdminByIdContainer;
