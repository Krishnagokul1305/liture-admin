"use server";

import { auth, signIn, signOut } from "./auth";
import dbConnect from "./db";
import { sendResetPasswordEmail, sendWelcomeEmail } from "./email";
import crypto from "crypto";

import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../../service/userService";
import { revalidatePath } from "next/cache";
import userModel from "./model/user.model";

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

export async function forgotPasswordAction(email) {
  await dbConnect();

  const user = await userModel.findOne({ email });

  if (!user) {
    return true;
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}`;

  await sendResetPasswordEmail(user.email, resetURL);

  console.log("RESET URL:", resetURL);

  return true;
}

export async function resetPasswordAction(token, newPassword) {
  await dbConnect();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await userModel
    .findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    })
    .select("+password");

  if (!user) {
    throw new Error("Token is invalid or has expired");
  }

  user.password = newPassword;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return true;
}
