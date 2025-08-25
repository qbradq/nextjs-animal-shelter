"use client";

export const dynamic = "force-dynamic";

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function cropImage(
  image: HTMLImageElement,
  area: Area,
  width: number,
  height: number,
): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return "";
  }
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    width,
    height,
  );
  return canvas.toDataURL("image/jpeg", 0.9);
}
