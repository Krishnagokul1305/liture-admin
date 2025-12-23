"use server";

import { auth, signIn, signOut } from "./auth";
import dbConnect from "./db";
import { sendWelcomeEmail } from "./email";

import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../../service/userService";
import { revalidatePath } from "next/cache";

export async function hasCurrentUserRole(...expectedRoles) {
  const session = await auth();
  if (!session?.user?.id) return false;

  const user = await getUserById(session.user.id);
  if (!user) return false;

  return expectedRoles.includes(user.role);
}

export async function signInAction(data) {
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
}

export async function signOutAction() {
  await signOut();
}

export async function registerUserAction(data) {
  try {
    await dbConnect();
    // if (!(await hasCurrentUserRole("SUPERADMIN"))) {
    //   throw new Error("Unauthorized");
    // }
    const user = await createUser(data);
    revalidatePath("/admin/users");
    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    throw error;
  }
}

export async function updateUserAction(id, data) {
  await dbConnect();
  await updateUser(id, data);
  revalidatePath("/admin/users");
}

export async function deleteUserAction(id) {
  await deleteUser(id);
  revalidatePath("/admin/users");
}
