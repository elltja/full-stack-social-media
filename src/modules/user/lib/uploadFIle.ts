import { cloudinary } from "@/lib/server/cloudinary";

type UploadResult = {
  public_id: string;
};

export async function uploadFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<UploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "profile-pictures",
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

export async function unUploadFile(fileUrl: string) {
  const segments = fileUrl.split("/");

  const publicId = "'profile-picture/" + segments[segments.length - 1];
  await cloudinary.uploader.destroy(publicId);
}
