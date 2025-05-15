import { getCloudinaryUrl, uploadFile } from "@/lib/server/cloudinary";
import { prisma } from "@/lib/server/prisma";
import { getCurrentUser } from "@/modules/auth/lib/user";
import { POST_IMAGES_FOLDER_NAME } from "@/modules/post/lib/constants";
import { PostFormState } from "@/modules/post/lib/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await createPost(await request.formData());
  } catch (error) {
    console.error("Error publishing post " + error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Successfully published post" },
    { status: 200 }
  );
}

async function createPost(formData: FormData): Promise<PostFormState> {
  const text = formData.get("text") as string;
  const images = formData.getAll("images");

  if (typeof text !== "string") {
    return { error: "Invalid request", text: "" };
  }

  if (text === "") return { text: "" };

  const currentUser = await getCurrentUser();

  const imageUrls = await uploadFiles(images);

  await prisma.post.create({
    data: {
      content: text,
      author_id: currentUser.id,
      image_urls: imageUrls,
    },
  });
  return { text: "" };
}

async function uploadFiles(files: unknown[]) {
  const fileUrls = await Promise.all(
    files.map(async (file) => {
      if (!(file instanceof File)) {
        return null;
      }
      const publicId = await uploadFile(file, POST_IMAGES_FOLDER_NAME);
      return getCloudinaryUrl(publicId);
    })
  );
  return fileUrls.filter((url): url is string => url !== null);
}
