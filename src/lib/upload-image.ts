import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB

const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function uploadCategoryImage(
  file: File, path1: string
): Promise<string> {
  const extension = ALLOWED_IMAGE_TYPES[file.type];

  if (!extension) {
    throw new Error("INVALID_IMAGE_TYPE");
  }

  if (file.size <= 0) {
    throw new Error("EMPTY_IMAGE");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("IMAGE_TOO_LARGE");
  }

  const fileName = `${randomUUID()}.${extension}`;

  const uploadPath = path1.replace(/^\//, "").replace(/\/$/, "");

  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    uploadPath
  );

  await mkdir(uploadDirectory, {
    recursive: true,
  });

  const filePath = path.join(uploadDirectory, fileName);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(filePath, buffer);

  return `/uploads/${uploadPath}/${fileName}`;
}