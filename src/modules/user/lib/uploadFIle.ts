import { cloudinary } from "@/lib/server/cloudinary";

const PROFILE_PICTURE_FOLDER_NAME = "profile-pictures";

type UploadResult = {
  public_id: string;
};

export async function uploadFile(file: File) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<UploadResult>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: PROFILE_PICTURE_FOLDER_NAME,
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

  const publicId =
    `${PROFILE_PICTURE_FOLDER_NAME}/` + segments[segments.length - 1];

  await cloudinary.uploader.destroy(publicId);
}
