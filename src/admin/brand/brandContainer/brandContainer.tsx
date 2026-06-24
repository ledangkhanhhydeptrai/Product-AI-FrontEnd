import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { getBrandRequest } from "../../../features/brands/brandSlice";
import DataTable, { Column } from "../../../components/Table";
import ConfirmDialog from "../../../components/ConfirmDialog";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Typography,
  Paper,
  Skeleton,
  Button,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent
} from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { BrandProps } from "../../../features/brands/brandTypes";
import CreateBrandContainer from "./createBrandContainer";

const BrandContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const [openCreate, setOpenCreate] = React.useState(false);
  const navigate = useNavigate();
  const { data, loading, error } = useAppSelector((state) => state.brand);
  const [brandToDelete, setBrandToDelete] = React.useState<BrandProps | null>(
    null
  );

  React.useEffect(() => {
    dispatch(getBrandRequest());
  }, [dispatch]);

  const safeData: BrandProps[] = Array.isArray(data) ? data : [];

  const handleConfirmDelete = () => {
    // if (!brandToDelete) return;
    // dispatch(deleteBrandRequest({ id: brandToDelete.id }));
    // setBrandToDelete(null);
  };

  // ================= COLUMNS =================
  const columns: Column<BrandProps>[] = [
    {
      id: "id",
      label: "ID",
      width: 80,
      render: (row) => (
        <Typography
          sx={{
            fontSize: 12.5,
            color: "#94a3b8",
            fontWeight: 600,
            fontFamily: "monospace"
          }}
        >
          #{row.id.slice(0, 6)}
        </Typography>
      )
    },
    {
      id: "logo",
      label: "Logo",
      width: 90,
      render: (row) =>
        row.logo ? (
          <Avatar
            src={row.logo}
            alt={row.name}
            variant="rounded"
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              border: "1px solid #eef0f3"
            }}
          />
        ) : (
          <Avatar
            variant="rounded"
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              bgcolor: "#eef2ff",
              color: "#6366f1",
              fontSize: 14,
              fontWeight: 700
            }}
          >
            {row.name?.charAt(0)?.toUpperCase() || "?"}
          </Avatar>
        )
    },
    {
      id: "name",
      label: "Brand Name",
      render: (row) => (
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1e293b" }}>
          {row.name}
        </Typography>
      )
    },
    {
      id: "description",
      label: "Description",
      render: (row) => (
        <Typography
          sx={{
            fontSize: 13,
            color: row.description ? "#475569" : "#cbd5e1",
            fontStyle: row.description ? "normal" : "italic",
            maxWidth: 300,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {row.description || "No description"}
        </Typography>
      )
    },
    {
      id: "actions",
      label: "",
      width: 100,
      render: (row) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Tooltip title="Edit brand">
            <IconButton
              onClick={() => navigate(`/admin/brands/edit/${row.id}`)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                color: "#64748b",
                "&:hover": { bgcolor: "#eef2ff", color: "#6366f1" }
              }}
            >
              <EditRoundedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete brand">
            <IconButton
              onClick={() => setBrandToDelete(row)}
              sx={{
                width: 32,
                height: 32,
                borderRadius: "8px",
                color: "#64748b",
                "&:hover": { bgcolor: "#fef2f2", color: "#ef4444" }
              }}
            >
              <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  // ================= ERROR =================
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: "20px",
            border: "1px solid #fecaca",
            textAlign: "center",
            background: "linear-gradient(180deg, #fff5f5 0%, #ffffff 100%)"
          }}
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: "16px",
              bgcolor: "#fee2e2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2
            }}
          >
            <Typography sx={{ fontSize: 24 }}>⚠️</Typography>
          </Box>

          <Typography sx={{ fontWeight: 700, color: "#991b1b", fontSize: 15 }}>
            Failed to load brands
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              color: "#b91c1c",
              mt: 0.75,
              maxWidth: 360,
              mx: "auto"
            }}
          >
            {String(error)}
          </Typography>

          <Button
            startIcon={<RefreshRoundedIcon />}
            onClick={() => dispatch(getBrandRequest())}
            sx={{
              mt: 3,
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "10px",
              border: "1px solid #fecaca",
              color: "#dc2626",
              px: 2.5,
              "&:hover": { bgcolor: "#fef2f2", borderColor: "#fca5a5" }
            }}
          >
            Retry
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.75 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px -4px rgba(99,102,241,0.4)"
            }}
          >
            <LocalOfferRoundedIcon sx={{ color: "#fff", fontSize: 21 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: 19,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.01em"
              }}
            >
              Brands
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#64748b" }}>
              {loading
                ? "Loading..."
                : `${safeData.length} brand${safeData.length === 1 ? "" : "s"} available`}
            </Typography>
          </Box>
        </Box>

        <Tooltip title="Refresh">
          <IconButton
            onClick={() => dispatch(getBrandRequest())}
            disabled={loading}
            sx={{
              width: 38,
              height: 38,
              borderRadius: "10px",
              border: "1px solid #eef0f3",
              color: "#64748b",
              "&:hover": { bgcolor: "#f8fafc", color: "#6366f1" }
            }}
          >
            <RefreshRoundedIcon
              sx={{
                fontSize: 19,
                animation: loading ? "spin 0.9s linear infinite" : "none",
                "@keyframes spin": {
                  from: { transform: "rotate(0deg)" },
                  to: { transform: "rotate(360deg)" }
                }
              }}
            />
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          onClick={() => setOpenCreate(true)}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            px: 2.5,
            bgcolor: "#6366f1",
            "&:hover": { bgcolor: "#4f46e5" }
          }}
        >
          + Create Brand
        </Button>
      </Box>

      {/* TABLE */}
      {loading ? (
        <Box
          sx={{
            border: "1px solid #eef0f3",
            borderRadius: "16px",
            p: 2,
            bgcolor: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 1.25
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={44}
              sx={{ borderRadius: "10px", bgcolor: "#f1f5f9" }}
            />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #eef0f3",
            boxShadow: "0 1px 2px rgba(15,23,42,0.03)"
          }}
        >
          <DataTable
            columns={columns}
            rows={safeData}
            rowKey={(row) => row.id}
            emptyText="No brands found"
            emptyHint="Add your first brand to get started."
          />
        </Box>
      )}

      <ConfirmDialog
        open={Boolean(brandToDelete)}
        title="Delete brand"
        description={
          brandToDelete
            ? `Are you sure you want to delete "${brandToDelete.name}"? This action cannot be undone.`
            : undefined
        }
        onCancel={() => setBrandToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      <Dialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          Create Brand
          <IconButton onClick={() => setOpenCreate(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* 👉 GẮN FORM CỦA BẠN VÀO ĐÂY */}
          <CreateBrandContainer onClose={() => setOpenCreate(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BrandContainer;
