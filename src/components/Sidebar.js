import React from "react";
import {NavLink, useLocation} from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Box,
} from "@mui/material";
import {
  HomeOutlined,
  PersonOutlined,
  PetsOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import logo from "../assets/logo.png";
import useAuthStore from "../authStore";

function Sidebar() {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer variant="permanent">
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box sx={{display: "flex", alignItems: "center", px: 2}}>
          <img
            src={logo}
            alt="Logo"
            style={{width: "40px", marginRight: "8px"}}
          />
          <span style={{fontWeight: "bold"}}>Bird Identify Manager</span>
        </Box>
        <List>
          <ListItem
            button
            component={NavLink}
            to="/"
            exact
            sx={{
              backgroundColor:
                location.pathname === "/" ? "lightblue" : "inherit",
            }}
          >
            <ListItemIcon>
              <HomeOutlined />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/users"
            sx={{
              backgroundColor:
                location.pathname === "/users" ? "lightblue" : "inherit",
            }}
          >
            <ListItemIcon>
              <PersonOutlined />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/birds"
            sx={{
              backgroundColor:
                location.pathname === "/birds" ? "lightblue" : "inherit",
            }}
          >
            <ListItemIcon>
              <PetsOutlined />
            </ListItemIcon>
            <ListItemText primary="Birds" />
          </ListItem>
          <ListItem
            button
            component={NavLink}
            to="/history"
            sx={{
              backgroundColor:
                location.pathname === "/history" ? "lightblue" : "inherit",
            }}
          >
            <ListItemIcon>
              <HistoryOutlined />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
        <Box sx={{flexGrow: 1}} />
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
