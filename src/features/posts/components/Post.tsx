import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";

export default function Post() {
  return (
    <div className="w-full h-fit bg-background rounded-md shadow flex flex-col p-5 gap-5 md:gap-4">
      <PostHeader />
      <p className="leading-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat
        quam quis purus pretium, at convallis ante ullamcorper. Nulla vestibulum
        varius sem sed consectetur. Etiam et elit eleifend, pellentesque
      </p>
      <PostFooter />
    </div>
  );
}
