import React from "react";

export default function notFound() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col gap-2 text-center my-96">
        <h1 className="font-bold text-2xl">Ooops...</h1>
        <p>Page not found</p>
      </div>
    </div>
  );
}
