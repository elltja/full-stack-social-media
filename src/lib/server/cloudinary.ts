import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

type UploadResult = {
  public_id: string;
};

export async function uploadFile(file: File, folderName: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<UploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderName,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result as UploadResult);
      }
    );
    uploadStream.end(buffer);
  });
  return result.public_id;
}

export async function deleteUploadedFile(fileUrl: string, folderName: string) {
  const segments = fileUrl.split("/");

  const publicId = `${folderName}/` + segments[segments.length - 1];

  await cloudinary.uploader.destroy(publicId);
}

export function getCloudinaryUrl(publicId: string): string {
  return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
}
