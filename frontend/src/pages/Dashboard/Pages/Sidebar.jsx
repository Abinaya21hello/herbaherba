import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  IconButton,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/userActions";

const Sidebar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.get("api/user-logout");
      dispatch(logout());
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const drawerContent = (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#283618', // Herbal-themed background color
        color: 'white',
        padding: '20px 0',
      }}
    >
      {/* Close Button for Mobile View */}
      {isSmallScreen && (
        <IconButton
          onClick={toggleDrawer(false)}
          sx={{
            alignSelf: 'flex-end',
            marginRight: 2,
            color: "#fefae0",
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          padding: "16px 0",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#606C38",
            width: isSmallScreen ? 50 : 70,
            height: isSmallScreen ? 50 : 70,
          }}
        >
          KH
        </Avatar>
        {!isSmallScreen && (
          <Typography variant="h6" noWrap sx={{ mt: 2 }}>
            HERBALEAF
          </Typography>
        )}
      </Toolbar>
      <Divider sx={{ width: "80%", backgroundColor: "rgba(255, 255, 255, 0.3)" }} />
      <List sx={{ width: "100%", mt: 2, flexGrow: 1 }}>
        {[
          { text: "Dashboard", icon: <DashboardIcon />, link: "/dash" },
          { text: "Home", icon: <HomeIcon />, link: "/" },
          { text: "Orders", icon: <ShoppingCartIcon />, link: "/orders" },
          { text: "Change Password", icon: <PersonIcon />, link: "/changepassword" },
        ].map(({ text, icon, link }, index) => (
          <ListItem
            button
            component={Link}
            to={link}
            sx={{
              justifyContent: "center",
              padding: "15px 0",
              margin: "20px 0", // Increased gap between buttons
              borderRadius: "12px", // Rounded corners for buttons
              backgroundColor: "#606C38", // Herbal green color for button background
              color: "#fefae0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "background-color 0.3s ease, transform 0.2s ease",
              "&:hover": {
                backgroundColor: "#8C9C68", // Slightly lighter green on hover
                transform: "translateY(-3px)", // Slight lift on hover
              },
            }}
            key={index}
          >
            <ListItemIcon
              sx={{
                color: "#fefae0",
                minWidth: 40,
                justifyContent: "center",
                display: "flex",
                fontSize: "2.5rem",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{
                sx: {
                  fontSize: isSmallScreen ? "1rem" : "1.25rem",
                  fontWeight: "bold",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ width: "80%", backgroundColor: "rgba(255, 255, 255, 0.3)" }} />
      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{
          margin: "20px 0",
          padding: "10px 20px",
          width: "80%",
          backgroundColor: "#A4C639",
          color: "#283618",
          borderRadius: "12px", // Slightly more rounded for a modern look
          fontWeight: "bold",
          transition: "background-color 0.3s ease, transform 0.2s ease",
          "&:hover": {
            backgroundColor: "#A8D080", // Lighter herbal green on hover
            transform: "translateY(-3px)", // Slight lift on hover
          },
        }}
      >
        Logout
      </Button>
      <Typography
        variant="body2"
        sx={{
          color: "#fefae0",
          fontSize: "0.9rem",
          textAlign: "center",
          marginTop: "auto",
          padding: "10px 0",
        }}
      >
        © 2024 HERBALEAF. All rights reserved.
      </Typography>
    </div>
  );

  return (
    <div>
      {isSmallScreen && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{
            marginRight: 2,
            color: "#A4C639", // Herbal color for the menu button
            top: 8,
            left: 10,
          }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={isSmallScreen ? drawerOpen : true}
        onClose={toggleDrawer(false)}
        sx={{
          width: isSmallScreen ? "80vw" : 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: isSmallScreen ? "80vw" : 300,
            backgroundColor: "#283618", // Dark herbal green for the sidebar background
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Sidebar;
