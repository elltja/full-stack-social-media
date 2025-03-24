import React from "react";
import WritePostHeader from "./WritePostHeader";
import WritePostFooter from "./WritePostFooter";

export default function WritePost() {
  return (
    <div className="w-full h-fit bg-white rounded-md shadow flex flex-col p-5 gap-5">
      <WritePostHeader />
      <WritePostFooter />
    </div>
  );
}
