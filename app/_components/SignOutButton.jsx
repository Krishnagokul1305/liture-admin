"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "../lib/action";

export default function SignOutButton() {
  async function handleClick() {
    await signOutAction();
  }
  return <Button onClick={handleClick}>Sign Out</Button>;
}
