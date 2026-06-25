import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Skeleton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import InventoryRoundedIcon from "@mui/icons-material/InventoryRounded";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logoutRequest } from "../../features/auth/authSlice";

const BRAND_COLOR = "#6366F1";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.profile
  );

  const [userAnchor, setUserAnchor] = React.useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(
    null
  );

  const [search, setSearch] = React.useState("");

  const handleLogout = () => {
    dispatch(logoutRequest());
    setUserAnchor(null);
    navigate("/login");
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const fullName = (user && user.fullName) || "User";

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#1A1A2E",
        borderBottom: "1px solid #eef0f3"
      }}
    >
      <Toolbar
        sx={{ justifyContent: "space-between", height: 64, px: 3, gap: 2 }}
      >
        {/* LOGO */}
        <Box
          onClick={() => navigate("/admin/dashboard")}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            flexShrink: 0
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              bgcolor: BRAND_COLOR,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 16,
              boxShadow: `0 4px 12px ${BRAND_COLOR}40`
            }}
          >
            🛍️
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: 17 }}>
            Aura
            <Box component="span" sx={{ color: BRAND_COLOR }}>
              AI
            </Box>
          </Typography>
        </Box>

        {/* SEARCH */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 520,
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            height: 40,
            borderRadius: 999,
            bgcolor: "#f4f5f7",
            border: "1px solid transparent",
            transition: "background-color 0.15s ease, box-shadow 0.15s ease",
            "&:focus-within": {
              bgcolor: "#fff",
              borderColor: BRAND_COLOR,
              boxShadow: `0 0 0 3px ${BRAND_COLOR}1A`
            }
          }}
        >
          <SearchRoundedIcon sx={{ color: "#94a3b8", fontSize: 20 }} />
          <InputBase
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm, thương hiệu..."
            sx={{ flex: 1, fontSize: 14 }}
          />
        </Box>

        {/* RIGHT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.2,
            flexShrink: 0
          }}
        >
          {/* NOTIF */}
          <IconButton
            onClick={(e) => setNotifAnchor(e.currentTarget)}
            sx={{
              width: 40,
              height: 40,
              bgcolor: "#f4f5f7",
              borderRadius: "50%",
              "&:hover": { bgcolor: "#ececef" }
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: 10,
                  height: 16,
                  minWidth: 16
                }
              }}
            >
              <NotificationsNoneRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>

          {/* USER PILL */}
          {isAuthenticated && user && (
            <Box
              onClick={(e) => !loading && setUserAnchor(e.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                pl: 0.8,
                pr: 1,
                py: 0.5,
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                transition: "background-color 0.15s ease",
                "&:hover": { bgcolor: loading ? "transparent" : "#f9fafb" }
              }}
            >
              {/* AVATAR LOADING */}
              {loading ? (
                <Skeleton variant="circular" width={30} height={30} />
              ) : (
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: 12,
                    fontWeight: 700,
                    bgcolor: BRAND_COLOR
                  }}
                  src={user.avatarUrl}
                >
                  {getInitials(fullName)}
                </Avatar>
              )}

              {/* NAME LOADING */}
              {loading ? (
                <Skeleton width={80} height={18} />
              ) : (
                <Typography
                  sx={{ fontSize: 13, fontWeight: 600, maxWidth: 140 }}
                  noWrap
                >
                  {fullName}
                </Typography>
              )}

              {!loading && (
                <KeyboardArrowDownRoundedIcon
                  sx={{ fontSize: 18, color: "text.secondary" }}
                />
              )}
            </Box>
          )}

          {/* USER MENU */}
          <Menu
            anchorEl={userAnchor}
            open={Boolean(userAnchor)}
            onClose={() => setUserAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 200,
                  borderRadius: 2.5,
                  boxShadow: "0 8px 28px rgba(20,20,43,0.12)"
                }
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.2 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700 }} noWrap>
                {fullName}
              </Typography>
              {user && user.email && (
                <Typography
                  sx={{ fontSize: 12, color: "text.secondary" }}
                  noWrap
                >
                  {user.email}
                </Typography>
              )}
            </Box>

            <Divider />

            <MenuItem onClick={() => navigate("/profile")} sx={{ py: 1.1 }}>
              <ListItemIcon>
                <PersonOutlineRoundedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary="Hồ sơ"
                slotProps={{
                  primary: {
                    sx: { fontSize: 13.5 }
                  }
                }}
              />
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={handleLogout}
              sx={{ py: 1.1, color: "error.main" }}
            >
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Đăng xuất"
                slotProps={{
                  primary: {
                    sx: { fontSize: 13.5, fontWeight: 600 }
                  }
                }}
              />
            </MenuItem>
          </Menu>

          {/* NOTIF MENU */}
          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={() => setNotifAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 280,
                  borderRadius: 2.5,
                  boxShadow: "0 8px 28px rgba(20,20,43,0.12)"
                }
              }
            }}
          >
            <Box sx={{ px: 2, py: 1.2 }}>
              <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                Thông báo
              </Typography>
            </Box>

            <Divider />

            <MenuItem sx={{ py: 1.2, gap: 1.5, alignItems: "flex-start" }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "#eef0fd",
                  color: BRAND_COLOR,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  mt: 0.2
                }}
              >
                <InventoryRoundedIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  Đơn hàng mới #1234
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  Vừa xong
                </Typography>
              </Box>
            </MenuItem>

            <MenuItem sx={{ py: 1.2, gap: 1.5, alignItems: "flex-start" }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "#fff4e5",
                  color: "#b45309",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  mt: 0.2
                }}
              >
                <InventoryRoundedIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                  Sản phẩm sắp hết hàng
                </Typography>
                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                  5 phút trước
                </Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
