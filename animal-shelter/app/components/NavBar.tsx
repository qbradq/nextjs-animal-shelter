"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import classNames from "classnames";
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

export function OldNavBar() {
  const [navBarOpen, setNavBarOpen] = React.useState(false);
  return (
    <nav
      className="sticky top-0 shadow-sm z-50 bg-white border-gray-200
            border-b-4 border-solid"
    >
      <div className="flex justify-around container mx-auto py-2">
        <Link href={"/"} className="nav-link">
          <h1 className="text-2xl font-bold">
            Brad&apos;s Example Animal Shelter
          </h1>
        </Link>
        <span
          onClick={() => setNavBarOpen(!navBarOpen)}
          className="md:hidden cursor-pointer self-center"
        >
          {!navBarOpen ? (
            <RxHamburgerMenu className="text-4xl" />
          ) : (
            <IoCloseSharp className="text-4xl" />
          )}
        </span>
        <ul
          className={classNames(
            `
            absolute left-0 bg-white w-full flex flex-col items-center gap-8
            md:static md:flex-row md:justify-end md:flex-wrap md:max-w-[32-rem]
            md:p-0.5 border-b-4 border-gray-400 md:border-0
            `,
            `${navBarOpen ? "top-[52px]" : "top-[-1000px]"}`,
          )}
        >
          <li>
            <Link href={"/pets"}>Pets</Link>
          </li>
          <li>
            <Link href={"/intake"}>Intake</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

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
