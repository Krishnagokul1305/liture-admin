"use server";

import { auth, signIn, signOut } from "./auth";
import dbConnect from "./db";
import { sendWelcomeEmail } from "./email";
import userModel from "./model/user.model";
import bcrypt from "bcryptjs";
import { createUser, getUserById } from "../../service/userService";

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
    if (!(await hasCurrentUserRole("SUPERADMIN"))) {
      throw new Error("Unauthorized");
    }
    await createUser(data);
    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    throw error;
  }
}
