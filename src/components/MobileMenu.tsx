import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="cursor-pointer md:hidden" />
      </SheetTrigger>
      <SheetContent className="border-none">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
