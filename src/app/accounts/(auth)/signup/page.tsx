import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SignUpForm from "@/features/auth/components/SignUpForm";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  return (
    <Card className="rounded-4xl sm:rounded-xl h-full min-h-fit sm:h-fit w-full sm:w-[450px] xl:w-[500px] py-10 sm:px-3 flex flex-col justify-between items-center">
      <div className="flex flex-col gap-5 w-full">
        <CardHeader>
          <h1 className="text-xl my-3">
            <CardTitle className="text-center">Create your account</CardTitle>
          </h1>
        </CardHeader>

        <CardContent>
          <SignUpForm />
          <Separator className="my-5" />
          <Link href="/accounts/signin" legacyBehavior passHref>
            <Button variant="secondary" className="cursor-pointer w-full">
              Sign In
            </Button>
          </Link>
        </CardContent>
      </div>
      <CardFooter className="flex flex-col w-fit gap-2 items-center">
        <span className="text-xs text-accent-foreground  flex gap-2">
          <Link href="#">© 2025 ABC Technologies, Inc.</Link>
        </span>
        <span className="text-xs text-accent-foreground w-fit text-center flex gap-2">
          <Link href="#" className="text-accent-foreground underline w-fit">
            {" "}
            Terms of service
          </Link>
          <Link href="#" className="text-accent-foreground underline w-fit">
            {" "}
            Privacy Policy.
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
}
