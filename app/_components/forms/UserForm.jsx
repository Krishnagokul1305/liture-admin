"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { registerUserAction, updateUserAction } from "@/app/lib/action";
import { useQueryClient } from "@tanstack/react-query";

const getFormSchema = (isCreate) =>
  z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: isCreate
      ? z.string().min(6, "Password must be at least 6 characters")
      : z.string().optional(),
    role: z.enum(["USER", "ADMIN", "SUPERADMIN"]),
  });

export default function UserForm({
  close,
  initialData,
  isCreate = true,
  isCurrentUser = true,
}) {
  console.log(initialData);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(getFormSchema(isCreate)),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      password: "",
      role: initialData?.role || "USER",
    },
  });
  const queryClient = useQueryClient();
  async function onSubmit(data) {
    setLoading(true);
    console.log(data);
    try {
      if (isCreate) {
        toast.promise(registerUserAction(data), {
          loading: "Creating user...",
          success: "User created successfully!",
          error: "Error creating user",
        });
      } else {
        toast.promise(updateUserAction(initialData._id, data), {
          loading: "Updating user...",
          success: "User updated successfully!",
          error: "Error updating user",
        });
      }

      if (!isCurrentUser)
        queryClient.invalidateQueries({ queryKey: ["current-user"] });

      close();
    } catch (error) {
      console.error("User form error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-3xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  disabled={!isCreate}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isCreate && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <InputGroup>
                    <InputGroupInput
                      type={showPassword ? "text" : "password"}
                      placeholder={"Enter password"}
                      {...field}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        size="icon-xs"
                        type="button"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Role */}
        {isCurrentUser && (
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent className={"w-full"}>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              close();
            }}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <div className="flex justify-center items-center">
                <div
                  className={`w-5 h-5 border-2 border-t-transparent rounded-full animate-spin border-white dark:border-black`}
                ></div>
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
