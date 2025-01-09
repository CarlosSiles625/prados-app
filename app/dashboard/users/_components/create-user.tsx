"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CreateUserForm from "./create-user-form";

export function CreateUser() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Registrar Usuario</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Registrar usuario</SheetTitle>
        </SheetHeader>
        <CreateUserForm />
      </SheetContent>
    </Sheet>
  );
}
