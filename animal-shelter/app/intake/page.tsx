"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { insertPet } from "../actions";
import ImageUploader from "../components/ImageUploader";

export const dynamic = "force-dynamic";

export default function IntakePage() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUploaded: false,
    imageDataUrl: "",
  });
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  function handleCroppedImage(imageUrl: string) {
    if (!imgRef.current) {
      return;
    }
    imgRef.current.src = imageUrl;
    setFormData((prev) => ({
      ...prev,
      ["imageUploaded"]: true,
      ["imageDataUrl"]: imageUrl,
    }));
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!imgRef.current) {
      return;
    }
    insertPet(formData.name, formData.description, formData.imageDataUrl);
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      alignItems="center"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        maxWidth: 768,
        margin: "auto",
      }}
    >
      <Typography variant="h4" component="h1">
        Pet Intake
      </Typography>
      <TextField
        label="Pet's Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Pet's story"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={15}
        fullWidth
        required
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/missing.png"
        alt="Please upload a photo of the pet."
        width={768}
        height={768}
        ref={imgRef}
        style={{
          border: "1px solid black",
          borderRadius: "5px",
        }}
      />
      <ImageUploader width={768} height={768} onComplete={handleCroppedImage} />
      <Button
        variant="contained"
        type="submit"
        disabled={
          formData.name == "" ||
          formData.description == "" ||
          !formData.imageUploaded
        }
        fullWidth
      >
        Finish Intake
      </Button>
    </Box>
  );
}
