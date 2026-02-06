"use client";

import { ChevronsUpDown, LogOut, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOutAction } from "../lib/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import UserForm from "./forms/UserForm";
import { useRef, useState } from "react";
import { useCurrentUser } from "@/hooks/use-currrent-user";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export function NavUser() {
  const { isMobile } = useSidebar();
  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { isLoading, user } = useCurrentUser();
  console.log(user);
  if (isLoading || !user) {
    return (
      <Button variant="ghost" size="icon" className="rounded-full">
        <Skeleton className="size-8 rounded-full" />
      </Button>
    );
  }

  async function signout() {
    toast.promise(signOutAction(), {
      loading: "Logging out...",
    });
    router.push("/login");
  }

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name ? user.name.charAt(0).toUpperCase() : "CN"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setOpen(false);
                  modalRef.current?.open();
                }}
              >
                <User className="size-4" />
                Edit Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={async () => await signout()}
              >
                <LogOut className="size-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Modal
        ref={modalRef}
        title="Edit Profile"
        description="Update your profile information"
      >
        <UserForm isCurrentUser={false} isCreate={false} initialData={user} />
      </Modal>
    </>
  );
}
