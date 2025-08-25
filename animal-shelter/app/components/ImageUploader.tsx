"use client";

import React, { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { cropImage } from "../image";

export default function ImageUploader({
  width,
  height,
  onComplete,
}: {
  width: number;
  height: number;
  onComplete: (imageUrl: string) => void;
}) {
  const [haveFile, setHaveFile] = useState<boolean>(false);
  const [haveCompleted, setHaveCompleted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: width,
    height: height,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length < 1 || !imgRef.current) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setSrc(reader.result?.toString() || "");
      imgRef.current!.src = src;
    };
    reader.readAsDataURL(e.target.files[0]);
    if (!imgRef.current) {
      return;
    }
    const w = imgRef.current.width;
    const h = imgRef.current.height;
    const d = w < h ? w / 2 : h / 2;
    const newCrop: Crop = {
      unit: "px",
      x: (w - d) / 2,
      y: (h - d) / 2,
      width: d,
      height: d,
    };
    setCrop(newCrop);
    setCompletedCrop({
      unit: "px",
      x: newCrop.x,
      y: newCrop.y,
      width: newCrop.width,
      height: newCrop.height,
    });
    setHaveFile(true);
  }

  function onSubmit() {
    if (!imgRef.current || !completedCrop) {
      return;
    }
    const w = imgRef.current.width;
    const nw = imgRef.current.naturalWidth;
    const scale = nw / w;
    const cropped = cropImage(
      imgRef.current,
      {
        x: (completedCrop.x * scale) | 0,
        y: (completedCrop.y * scale) | 0,
        width: (completedCrop.width * scale) | 0,
        height: (completedCrop.height * scale) | 0,
      },
      width,
      height,
    );
    onComplete(cropped);
    setOpen(false);
    setHaveCompleted(true);
  }

  return (
    <>
      <Button
        variant={haveCompleted ? "outlined" : "contained"}
        component="label"
        onClick={() => setOpen(true)}
        fullWidth
      >
        Upload Photo
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullScreen>
        <DialogTitle textAlign="center">Upload Pet Photo</DialogTitle>
        <DialogContent sx={{ justifyItems: "center" }}>
          {src ? (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => {
                setCompletedCrop(c);
              }}
              aspect={width / height}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Source image"
                ref={imgRef}
                width={width}
                height={height}
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
              />
            </ReactCrop>
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/missing.png"
                alt="Please upload source image."
                ref={imgRef}
                width={width}
                height={height}
                style={{
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant={haveFile ? "outlined" : "contained"}
            component="label"
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={onSelectFile}
            />
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" disabled={!src} onClick={onSubmit}>
            Finish Crop
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
