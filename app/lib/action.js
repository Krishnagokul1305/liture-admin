"use server";

import { signIn, signOut } from "./auth";
import dbConnect from "./db";
import { sendResetPasswordEmail, sendWelcomeEmail } from "./email";
import crypto from "crypto";
import bcrypt from "bcryptjs";

import {
  createUser,
  deleteUser,
  forgotPassword,
  registerUser,
  resetPassword,
  updateUser,
} from "../../service/userService";
import { revalidatePath } from "next/cache";
import userModel from "./model/user.model";
import {
  createInternship,
  deleteInternship,
  deleteInternshipRegistration,
  updateInternship,
  applyInternship,
} from "@/service/internshipService";
import {
  createWebinar,
  updateWebinar,
  deleteWebinar,
  deleteWebinarRegistration,
  registerWebinar,
} from "@/service/webinarService";
import {
  createMembership,
  deleteMembership,
  updateMembership,
  registerMembership,
} from "@/service/membershipService";
import { uploadImageToS3 } from "./s3";
import {
  createRegistration,
  deleteRegistration,
  updateRegistration,
} from "@/service/registrationService";
import {
  createMembershipRegistration,
  deleteMembershipRegistration,
  updateMembershipRegistration,
} from "@/service/membershipRegistrationService";

export async function signInAction(data) {
  await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirectTo: "/",
  });
}

export async function signOutAction() {
  await signOut();
}

export async function registerUserAction(data) {
  const user = await createUser(data);
  revalidatePath("/users");
  return user;
}

export async function signupUserAction(data) {
  const user = await registerUser(data);
  return user;
}

export async function updateUserAction(id, data) {
  const user = await updateUser(id, data);
  revalidatePath("/users");
  return user;
}

export async function deleteUserAction(id) {
  await deleteUser(id);
  revalidatePath("/users");
}

export async function forgotPasswordAction(email) {
  await forgotPassword(email);
}

export async function resetPasswordAction(data) {
  await resetPassword(data);
}

export async function createInternshipAction(formData) {
  await createInternship(formData);
  revalidatePath("/internships");
}

export async function updateInternshipAction(id, formData) {
  await updateInternship(id, formData);
  revalidatePath("/internships");
}

export async function deleteInternshipAction(id) {
  await deleteInternship(id);
  revalidatePath("/internships");
}

export async function createWebinarAction(formData) {
  await createWebinar(formData);
  revalidatePath("/webinars");
}

export async function updateWebinarAction(id, formData) {
  await updateWebinar(id, formData);
  revalidatePath("/webinars");
}

export async function deleteWebinarAction(id) {
  await deleteWebinar(id);
  revalidatePath("/webinars");
}

export async function createMembershipAction(data) {
  await createMembership(data);
  revalidatePath("/membership");
}

export async function deleteMembershipAction(id) {
  await deleteMembership(id);
  revalidatePath("/membership");
}

export async function updateMembershipAction(id, data) {
  await updateMembership(id, data);
  revalidatePath("/membership");
}

export async function createRegistrationAction(data) {
  await createRegistration(data);
  revalidatePath(`/registrations/${data?.type}s`);
}

export async function deleteRegistrationAction(id, type) {
  await deleteRegistration(id);
  revalidatePath(`/registrations/${type}`);
}

export async function updateRegistrationAction(id, data, type) {
  await updateRegistration(id, data);
  revalidatePath(`/registrations/${type}s`);
}

export async function deleteMembershipRegistrationAction(id) {
  await deleteMembershipRegistration(id);
  revalidatePath("/registrations/memberships");
}

export async function deleteInternshipRegistrationAction(id) {
  await deleteInternshipRegistration(id);
  revalidatePath("/registrations/internships");
}

export async function deleteWebinarRegistrationAction(id) {
  await deleteWebinarRegistration(id);
  revalidatePath("/registrations/webinars");
}

export async function createMembershipRegistrationAction(data) {
  await createMembershipRegistration(data);
  revalidatePath("/registrations/memberships");
}

export async function webinarregistrationaction(data) {
  const response = await registerWebinar(data);
  return response;
}

export async function internshipregistrationaction(formData) {
  const response = await applyInternship(formData);
  return response;
}

export async function membershipregistrationaction(data) {
  const response = await registerMembership(data);
  return response;
}

export async function changeWebinarRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  const { changeWebinarRegistrationStatus: changeStatus } =
    await import("@/service/webinarService");
  const response = await changeStatus(registrationId, status, rejectionReason);
  revalidatePath("/registrations/webinars");
  revalidatePath(`/registrations/webinars/${registrationId}`);
  return response;
}

export async function changeInternshipRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  const { changeInternshipRegistrationStatus: changeStatus } =
    await import("@/service/internshipService");
  const response = await changeStatus(registrationId, status, rejectionReason);
  revalidatePath("/registrations/internships");
  revalidatePath(`/registrations/internships/${registrationId}`);
  return response;
}

export async function changeMembershipRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  const { changeMembershipRegistrationStatus: changeStatus } =
    await import("@/service/membershipService");
  const response = await changeStatus(registrationId, status, rejectionReason);
  revalidatePath("/registrations/memberships");
  revalidatePath(`/registrations/memberships/${registrationId}`);
  return response;
}
