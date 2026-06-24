import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  InputBase,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { logoutRequest } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userAnchor, setUserAnchor] = React.useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = React.useState<null | HTMLElement>(
    null
  );

  // ===== USER MENU =====
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setUserAnchor(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserAnchor(null);
  };

  // ===== NOTIFICATION MENU =====
  const handleOpenNotifMenu = (e: React.MouseEvent<HTMLElement>) => {
    setNotifAnchor(e.currentTarget);
  };

  const handleCloseNotifMenu = () => {
    setNotifAnchor(null);
  };

  // ===== LOGOUT =====
  const handleLogout = () => {
    dispatch(logoutRequest());
    handleCloseUserMenu();
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        color: "#0f172a",
        borderBottom: "1px solid #eef0f3"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 72, px: 3 }}>
        {/* SEARCH */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            width: 360,
            height: 42,
            px: 1.75,
            borderRadius: "10px",
            bgcolor: "#f4f5f7",
            border: "1px solid transparent",
            "&:hover": { borderColor: "#e2e4e9" },
            "&:focus-within": {
              bgcolor: "#fff",
              borderColor: "#6366F1",
              boxShadow: "0 0 0 3px rgba(99,102,241,0.12)"
            }
          }}
        >
          <SearchRoundedIcon sx={{ fontSize: 19, color: "#94a3b8" }} />
          <InputBase
            placeholder="Search orders, products, users..."
            sx={{ flex: 1, fontSize: 14 }}
          />
        </Box>

        {/* RIGHT */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* NOTIFICATION */}
          <IconButton
            onClick={handleOpenNotifMenu}
            sx={{
              bgcolor: "#f4f5f7",
              borderRadius: "10px",
              width: 42,
              height: 42
            }}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsNoneRoundedIcon
                sx={{ fontSize: 21, color: "#475569" }}
              />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={handleCloseNotifMenu}
            slotProps={{
              paper: { sx: { width: 320, mt: 1.5, borderRadius: "12px" } }
            }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                Notifications
              </Typography>
            </Box>
            <Divider />

            {[
              { title: "New order #4821 received", time: "2m ago" },
              { title: 'Product "Aria Lamp" is low on stock', time: "1h ago" },
              { title: "New review awaiting moderation", time: "3h ago" }
            ].map((n) => (
              <MenuItem key={n.title} sx={{ py: 1.25 }}>
                <Box>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 500 }}>
                    {n.title}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                    {n.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>

          <Divider orientation="vertical" flexItem sx={{ mx: 0.75 }} />

          {/* USER */}
          <Box
            onClick={handleOpenUserMenu}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1,
              py: 0.6,
              borderRadius: "10px",
              cursor: "pointer",
              "&:hover": { bgcolor: "#f4f5f7" }
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/150?img=12"
              sx={{ width: 36, height: 36 }}
            />
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 600 }}>
                Sarah Chen
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: "text.secondary" }}>
                Super Admin
              </Typography>
            </Box>
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 18 }} />
          </Box>

          <Menu
            anchorEl={userAnchor}
            open={Boolean(userAnchor)}
            onClose={handleCloseUserMenu}
            slotProps={{
              paper: { sx: { width: 220, mt: 1.5, borderRadius: "12px" } }
            }}
          >
            <MenuItem>
              <ListItemIcon>
                <PersonOutlineRoundedIcon fontSize="small" />
              </ListItemIcon>
              My profile
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <SettingsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              Account settings
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout} sx={{ color: "#dc2626" }}>
              <ListItemIcon>
                <LogoutRoundedIcon fontSize="small" sx={{ color: "#dc2626" }} />
              </ListItemIcon>
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
