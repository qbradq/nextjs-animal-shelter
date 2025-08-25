"use client";
import { Pet } from "@/app/data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { redirect } from "next/navigation";
import { deletePet } from "../actions";

export default function PetDetails({ pet }: { pet: Pet }) {
  const [open, setOpen] = useState(false);
  function onOpen() {
    setOpen(true);
  }
  function onClose() {
    setOpen(false);
  }
  function onDelete() {
    deletePet(pet.uuid);
    setTimeout(() => {
      redirect("/pets");
    }, 1000);
  }
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Delete Pet</DialogTitle>
        <DialogContent>
          <DialogContentText>Permanently delete {pet.name}?</DialogContentText>
          <DialogActions>
            <Button variant="contained" color="error" onClick={onDelete}>
              Delete Permanently
            </Button>
            <Button variant="contained" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
      <Container maxWidth="lg">
        <Box
          gap={2}
          padding={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" textAlign="center">
            {pet.name}
          </Typography>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={process.env.NEXT_PUBLIC_CLOUDFRONT_URL + "/" + pet.image}
            alt={"Photo of " + pet.name}
            className="w-3xl border-2 border-black border-r-0 rounded-lg self-center"
          />
          <Typography
            variant="body1"
            component="p"
            whiteSpace="pre-line"
            width="80%"
            display="block"
            margin="auto"
          >
            {pet.description}
          </Typography>
          <Box
            justifyContent="end"
            sx={{
              gap: { xs: 2, sm: 4 },
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button variant="contained">Adopt Me!</Button>
            <Button variant="contained" color="error" onClick={onOpen}>
              <DeleteForeverIcon fontSize="large" />
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
