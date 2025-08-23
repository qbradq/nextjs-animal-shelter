"use client";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { centerCrop, makeAspectCrop, Crop } from "react-image-crop";
import React, { useRef, useState } from "react";
import { Pet } from "../data";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function IntakePage() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  async function OnSubmit() {
    if (!name || !desc || !imgRef || !imgRef.current) {
      return;
    }
    // Extract the cropped area and scale it to the needed dimensions
    if (!crop || !imgRef.current) {
      return;
    }
    const iw = imgRef.current.naturalWidth;
    const ih = imgRef.current.naturalHeight;
    const sx = (crop.x * 0.01 * iw) | 0;
    const sy = (crop.y * 0.01 * ih) | 0;
    const sw = (crop.width * 0.01 * iw) | 0;
    const sh = (crop.height * 0.01 * ih) | 0;
    const osc = new OffscreenCanvas(768, 768);
    const ctx = osc.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context available to crop and scale image.");
    }
    ctx.drawImage(imgRef.current, sx, sy, sw, sh, 0, 0, 768, 768);
    // Extract raw JPEG data
    const blob = await osc.convertToBlob({
      type: "image/jpeg",
      quality: 0.9,
    });
    const bTo64 = (blob: Blob) =>
      new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onerror = reject;
        r.onload = () => {
          if (typeof r.result === "string") {
            resolve(r.result);
          } else {
            reject();
          }
        };
        r.readAsDataURL(blob);
      });
    const b64String = await bTo64(blob);
    // Make POST call
    const pet: Pet = {
      uuid: "",
      name: name,
      description: desc,
      image: b64String,
    };
    const res = await fetch("/api/pets", {
      body: JSON.stringify(pet),
      method: "POST",
    });
    // Redirect to details page
    if (res.status > 299) {
      throw new Error("POST to /api/pets failed.");
    }
    const msg = await res.json();
    if (!msg || !msg.uuid) {
      throw new Error("POST to /api/pets malformed reply.");
    }
    redirect("/pets/" + msg.uuid);
  }
  function onNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function onDescChanged(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDesc(e.target.value);
  }
  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length < 1) {
      return;
    }
    setCrop(undefined);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgSrc(reader.result?.toString() || "");
    });
    reader.readAsDataURL(e.target.files[0]);
  }
  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop(
          {
            unit: "px",
            width: width < height ? width : height,
          },
          1,
          width,
          height,
        ),
        width,
        height,
      ),
    );
  }
  return (
    <>
      <div className="page-title">Intake Form</div>
      <div className="flex flex-col items-center">
        <form action={OnSubmit} className="flex flex-col w-full p-4 md:w-md">
          <label htmlFor="name">Pet&apos;s Name</label>
          <input
            type="text"
            name="name"
            placeholder="Pet's name"
            className="border-black border-2 rounded-sm mb-4"
            onChange={onNameChanged}
          />
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, c) => setCrop(c)}
              aspect={1}
              keepSelection={true}
              ruleOfThirds={true}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                alt="Image to crop"
                src={imgSrc}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
          <label htmlFor="image">Photo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border-black border-2 rounded-sm mb-4"
            onChange={onSelectFile}
          />
          <label htmlFor="description">Pet&apos;s Story</label>
          <textarea
            name="description"
            placeholder="Tell us about the pet."
            rows={5}
            className="border-black border-2 rounded-sm mb-4"
            onChange={onDescChanged}
          />
          <div className="w-full flex flex-row justify-end">
            <input type="submit" value="Check In" className="btn btn-blue" />
          </div>
        </form>
      </div>
    </>
  );
}
