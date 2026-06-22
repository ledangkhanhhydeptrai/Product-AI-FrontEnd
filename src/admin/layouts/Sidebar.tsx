import React, { useState } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Tooltip
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: <DashboardRoundedIcon />, path: "/" },
  {
    title: "Orders",
    icon: <ShoppingBagRoundedIcon />,
    path: "/orders",
    badge: 12
  },
  { title: "Products", icon: <Inventory2RoundedIcon />, path: "/products" },
  { title: "Categories", icon: <CategoryRoundedIcon />, path: "/admin/category" },
  { title: "Users", icon: <PeopleAltRoundedIcon />, path: "/users" },
  {
    title: "Reviews",
    icon: <ReviewsRoundedIcon />,
    path: "/reviews",
    badge: 3
  },
  { title: "Settings", icon: <SettingsRoundedIcon />, path: "/settings" }
];
const SIDEBAR_WIDTH = 264;
const SIDEBAR_WIDTH_COLLAPSED = 84;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const active = location.pathname;
  return (
    <Box
      sx={{
        width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
        flexShrink: 0,
        height: "100vh",
        position: "sticky",
        top: 0,
        background: "linear-gradient(180deg, #0B1120 0%, #0E1426 100%)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        transition: "width 0.22s ease",
        overflow: "hidden"
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          px: collapsed ? 0 : 2.5,
          py: 2.75,
          minHeight: 76
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 4px 14px rgba(99,102,241,0.45)"
            }}
          >
            <BoltRoundedIcon sx={{ fontSize: 20, color: "#fff" }} />
          </Box>
          {!collapsed && (
            <Typography
              sx={{ fontWeight: 700, fontSize: 17, letterSpacing: 0.2 }}
            >
              Nimbus
            </Typography>
          )}
        </Box>

        {!collapsed && (
          <IconButton
            size="small"
            onClick={() => setCollapsed(true)}
            sx={{
              color: "rgba(255,255,255,0.45)",
              "&:hover": { color: "#fff" }
            }}
          >
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Section label */}
      {!collapsed && (
        <Typography
          sx={{
            px: 2.75,
            pb: 1,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1.2,
            color: "rgba(255,255,255,0.32)",
            textTransform: "uppercase"
          }}
        >
          Menu
        </Typography>
      )}

      {/* Menu */}
      <List sx={{ px: 1.5, flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = active === item.title;
          const content = (
            <ListItemButton
              key={item.title}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 0.5,
                py: 1.05,
                px: collapsed ? 1.4 : 1.75,
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: "10px",
                color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                ...(isActive && {
                  background: "rgba(99,102,241,0.16)"
                })
              }}
            >
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: collapsed ? "auto" : 38,
                  "& svg": { fontSize: 21 }
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={item.title}
                  slotProps={{
                    primary: {
                      sx: { fontSize: 14.5, fontWeight: isActive ? 600 : 500 }
                    }
                  }}
                />
              )}

              {!collapsed && item.badge && (
                <Box
                  sx={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    minWidth: 22,
                    height: 22,
                    px: 0.5,
                    borderRadius: "7px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isActive ? "#6366F1" : "rgba(255,255,255,0.08)",
                    color: isActive ? "#fff" : "rgba(255,255,255,0.55)"
                  }}
                >
                  {item.badge}
                </Box>
              )}
            </ListItemButton>
          );

          return collapsed ? (
            <Tooltip key={item.title} title={item.title} placement="right">
              {content}
            </Tooltip>
          ) : (
            content
          );
        })}
      </List>

      {/* Collapse toggle when collapsed */}
      {collapsed && (
        <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
          <IconButton
            size="small"
            onClick={() => setCollapsed(false)}
            sx={{
              color: "rgba(255,255,255,0.45)",
              "&:hover": { color: "#fff" },
              transform: "rotate(180deg)"
            }}
          >
            <ChevronLeftRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Footer / upgrade card */}
      {!collapsed && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              borderRadius: "12px",
              p: 2,
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.18), rgba(139,92,246,0.1))",
              border: "1px solid rgba(99,102,241,0.25)"
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.25 }}>
              v2.4 — Store engine
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>
              All systems operational
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
