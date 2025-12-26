import membershipModel from "@/app/lib/model/membership.model";
import { formatDateTime } from "@/app/utils/helper";

export async function createMembership(data) {
  return await membershipModel.create(data);
}

/**
 * READ ALL
 */
export async function getAllMemberships(filter = {}) {
  const memberships = await membershipModel
    .find(filter)
    .sort({ createdAt: -1 })
    .lean();

  return memberships.map((membership) => ({
    ...membership,
    _id: membership._id.toString(),
    createdAt: formatDateTime(membership.createdAt).date,
  }));
}

/**
 * READ ONE
 */
export async function getMembershipById(id) {
  return await membershipModel.findById(id);
}

/**
 * READ BY NAME (optional helper)
 */
export async function getMembershipByName(name) {
  return await membershipModel.findOne({ name });
}

/**
 * UPDATE
 */
export async function updateMembership(id, data) {
  return await membershipModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

/**
 * DELETE (hard delete)
 */
export async function deleteMembership(id) {
  return await membershipModel.findByIdAndDelete(id);
}

/**
 * SOFT DELETE (recommended)
 */
export async function deactivateMembership(id) {
  return await membershipModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
}
