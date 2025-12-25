"use server";

import { signIn, signOut } from "./auth";
import dbConnect from "./db";
import { sendResetPasswordEmail, sendWelcomeEmail } from "./email";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import {
  createUser,
  deleteUser,
  hasCurrentUserRole,
  updateUser,
} from "../../service/userService";
import { revalidatePath } from "next/cache";
import userModel from "./model/user.model";
import {
  createInternship,
  deleteInternship,
  updateInternship,
} from "@/service/internshipService";
import {
  createWebinar,
  updateWebinar,
  deleteWebinar,
} from "@/service/webinarService";

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
    const user = await createUser(data);
    revalidatePath("/users");
    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    throw error;
  }
}

export async function updateUserAction(id, data) {
  await dbConnect();
  await updateUser(id, data);
  revalidatePath("/users");
}

export async function deleteUserAction(id) {
  await deleteUser(id);
  revalidatePath("/users");
}

export async function forgotPasswordAction(email) {
  await dbConnect();

  const user = await userModel.findOne({ email });

  if (!user) {
    return true;
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const resetURL = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

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

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  user.password = hashedPassword;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return true;
}

export async function createInternshipAction(data) {
  await createInternship(data);
  revalidatePath("/internships");
}

export async function updateInternshipAction(id, data) {
  await updateInternship(id, data);
  revalidatePath("/internships");
}

export async function deleteInternshipAction(id) {
  await deleteInternship(id);
  revalidatePath("/internships");
}

export async function createWebinarAction(data) {
  await createWebinar(data);
  revalidatePath("/webinars");
}

export async function updateWebinarAction(id, data) {
  await updateWebinar(id, data);
  revalidatePath("/webinars");
}

export async function deleteWebinarAction(id) {
  await deleteWebinar(id);
  revalidatePath("/webinars");
}
