"use server";

import { signIn, signOut } from "./auth";
import dbConnect from "./db";
import { sendWelcomeEmail } from "./email";
import userModel from "./model/user.model";
import bcrypt from "bcryptjs";

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
    data.password = await bcrypt.hash(data.password, 10);
    const user = await userModel.create(data);
    await sendWelcomeEmail(user.email, user.name);
  } catch (error) {
    console.log(error);
  }
}
