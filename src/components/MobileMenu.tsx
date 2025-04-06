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
import Navigation from "./Navigation";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="cursor-pointer lg:hidden" />
      </SheetTrigger>
      <SheetContent className="border-none">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <Navigation />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
