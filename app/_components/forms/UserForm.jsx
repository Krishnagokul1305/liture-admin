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
import { Checkbox } from "@/components/ui/checkbox";
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
    phone_number: z.string().optional(),
    role: z.enum(["NORMAL", "STAFF", "ADMIN"]),
    is_active: z.boolean().default(true),
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
      phone_number: initialData?.phone_number || "",
      role: initialData?.is_superuser
        ? "ADMIN"
        : initialData?.is_staff
          ? "STAFF"
          : "NORMAL",
      is_active: initialData?.is_active ?? true,
    },
  });
  const queryClient = useQueryClient();
  async function onSubmit(data) {
    setLoading(true);
    console.log(data);
    try {
      const roleFlags = {
        is_staff: data.role === "STAFF" || data.role === "ADMIN",
        is_superuser: data.role === "ADMIN",
      };

      const payload = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number || null,
        is_active: data.is_active,
        ...roleFlags,
        ...(isCreate ? { password: data.password } : {}),
      };

      if (isCreate) {
        await registerUserAction(payload);
      } else {
        await updateUserAction(initialData?.id, payload);
      }

      toast.success(
        isCreate ? "User created successfully!" : "User updated successfully!",
      );

      if (!isCurrentUser)
        queryClient.invalidateQueries({ queryKey: ["current-user"] });

      close();
    } catch (error) {
      console.log("User form error:", error);

      if (error.errors) {
        Object.keys(error.errors).forEach((field) => {
          const messages = error.errors[field];
          const message = Array.isArray(messages) ? messages[0] : messages;

          if (field === "detail") {
            toast.error(message);
          } else {
            form.setError(field, { type: "manual", message });
          }
        });
      } else {
        toast.error(error?.detail || "An unexpected error occurred");
      }
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

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter phone number" {...field} />
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
                      <SelectItem value="NORMAL">Normal User</SelectItem>
                      <SelectItem value="STAFF">Staff</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-md border p-3">
              <div>
                <FormLabel>Active</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Disable to block user access
                </p>
              </div>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(!!value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
