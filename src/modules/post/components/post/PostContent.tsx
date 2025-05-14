import Image from "next/image";

export default function PostContent({
  textContent,
  imageUrls,
}: {
  textContent: string;
  imageUrls: string[];
}) {
  return (
    <>
      <p className="leading-6 break-all">{textContent}</p>

      {imageUrls.length > 0 && (
        <div className="flex flex-wrap gap-2 relative">
          {imageUrls.map((src, index) => (
            <div
              key={src + index}
              className="relative h-[250px] w-full max-w-[400px] flex-1 min-w-50"
            >
              <Image
                src={src}
                alt={`Post image ${index + 1}`}
                fill
                sizes="(max-width: 600px) 100vw, 400px"
                className="rounded-md shadow cursor-pointer object-cover transition duration-200 hover:brightness-75"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
