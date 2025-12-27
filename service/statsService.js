import dbConnect from "@/app/lib/db";
import userModel from "../app/lib/model/user.model";
import internshipModel from "@/app/lib/model/internship.model";
import membershipModel from "@/app/lib/model/membership.model";
import webinarModel from "@/app/lib/model/webinar.model";

export async function getDashboardStats() {
  await dbConnect();

  const [users, internships, webinars, memberships] = await Promise.all([
    userModel.countDocuments(),
    internshipModel.countDocuments({ status: "active" }),
    webinarModel.countDocuments({ status: "active" }),
    membershipModel.countDocuments({ isActive: true }),
  ]);

  return {
    users,
    internships,
    webinars,
    memberships,
  };
}
