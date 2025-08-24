"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  function toggleDrawer() {
    setDrawerOpen(!drawerOpen);
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Animal Shelter
        </Typography>
        {isMobile ? (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ display: "flex" }}>
            <Button color="inherit" href="/">
              Home
            </Button>
            <Button color="inherit" href="/pets">
              Pets
            </Button>
            <Button color="inherit" href="/intake">
              Intake
            </Button>
          </Box>
        )}
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItemButton>
            <Link href="/">Home</Link>
          </ListItemButton>
          <ListItemButton>
            <Link href="/pets">Pets</Link>
          </ListItemButton>
          <ListItemButton>
            <Link href="/intake">Intake</Link>
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
}
