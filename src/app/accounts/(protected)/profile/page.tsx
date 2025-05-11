import { Card } from "@/components/ui/card";
import ProfileForm from "@/modules/user/components/ProfileForm";
import React from "react";

export default async function Profile() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Card className="w-[80vw] h-fit p-7">
        <ProfileForm />
      </Card>
    </div>
  );
}
