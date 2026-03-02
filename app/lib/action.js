"use server";

import { signOut } from "./auth";

import {
  createUser,
  contactservice,
  deleteUser,
  forgotPassword,
  registerUser,
  resetPassword,
  updateUser,
  verifyEmail,
} from "../../service/userService";
import { revalidatePath } from "next/cache";
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
  deleteMembershipRegistration,
  updateMembership,
  registerMembership,
} from "@/service/membershipService";

export async function signOutAction() {
  await signOut();
}

export async function registerUserAction(data) {
  const user = await createUser(data);
  revalidatePath("/users");
  return user;
}

export async function signupUserAction(data) {
  try {
    const user = await registerUser(data);
    return { success: true, data: user };
  } catch (error) {
    // Check if error contains validation errors array or error message
    let serverErrors = null;
    let errorMessage = null;
    try {
      const maybeString =
        typeof error === "string"
          ? error
          : typeof error?.message === "string"
            ? error.message
            : "";
      const parsed = JSON.parse(maybeString);
      serverErrors = parsed?.errors ?? null;
      errorMessage = parsed?.error ?? null;
    } catch {
      if (error && typeof error === "object" && "errors" in error) {
        serverErrors = error.errors;
      }
    }
    if (serverErrors) {
      return { errors: serverErrors };
    }
    return { error: errorMessage || error?.message || "Signup failed" };
  }
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
  try {
    const response = await forgotPassword(email);
    return { success: true, data: response };
  } catch (error) {
    return { error: error?.message || "Failed to send reset link" };
  }
}

export async function resetPasswordAction(data) {
  try {
    await resetPassword(data);
    return { success: true };
  } catch (error) {
    return { error: error?.message || "Failed to reset password" };
  }
}

export async function contactAction(data) {
  const response = await contactservice(data);
  return response;
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

export async function webinarregistrationaction(data) {
  try {
    const response = await registerWebinar(data);
    return { success: true, data: response };
  } catch (error) {
    return { error: error?.message || "Registration failed" };
  }
}

export async function internshipregistrationaction(formData) {
  try {
    const response = await applyInternship(formData);
    return { success: true, data: response };
  } catch (error) {
    return { error: error?.message || "Registration failed" };
  }
}

export async function membershipregistrationaction(data) {
  try {
    const response = await registerMembership(data);
    return { success: true, data: response };
  } catch (error) {
    return { error: error?.message || "Registration failed" };
  }
}

export async function changeWebinarRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  try {
    const { changeWebinarRegistrationStatus: changeStatus } =
      await import("@/service/webinarService");
    const response = await changeStatus(
      registrationId,
      status,
      rejectionReason,
    );
    revalidatePath("/registrations/webinars");
    revalidatePath(`/registrations/webinars/${registrationId}`);
    return { success: true, data: response };
  } catch (error) {
    return {
      error: error?.error || error?.message || "Failed to change status",
    };
  }
}

export async function changeInternshipRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  try {
    const { changeInternshipRegistrationStatus: changeStatus } =
      await import("@/service/internshipService");
    const response = await changeStatus(
      registrationId,
      status,
      rejectionReason,
    );
    revalidatePath("/registrations/internships");
    revalidatePath(`/registrations/internships/${registrationId}`);
    return { success: true, data: response };
  } catch (error) {
    return {
      error: error?.error || error?.message || "Failed to change status",
    };
  }
}

export async function changeMembershipRegistrationStatus(
  registrationId,
  status,
  rejectionReason = null,
) {
  try {
    const { changeMembershipRegistrationStatus: changeStatus } =
      await import("@/service/membershipService");
    const response = await changeStatus(
      registrationId,
      status,
      rejectionReason,
    );
    revalidatePath("/registrations/memberships");
    revalidatePath(`/registrations/memberships/${registrationId}`);
    return { success: true, data: response };
  } catch (error) {
    return {
      error: error?.error || error?.message || "Failed to change status",
    };
  }
}

export async function verifyEmailAction(token) {
  await verifyEmail(token);
}
