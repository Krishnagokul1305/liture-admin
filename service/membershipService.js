import dbConnect from "@/app/lib/db";
import membershipModel from "@/app/lib/model/membership.model";
import { formatDateTime } from "@/app/utils/helper";

export async function createMembership(data) {
  await dbConnect();
  return await membershipModel.create(data);
}

/**
 * READ ALL
 */
export async function getAllMemberships(filter = {}) {
  await dbConnect();

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

export async function getAllMembershipsOptions() {
  await dbConnect();

  const memberships = await membershipModel
    .find({}, { _id: 1, name: 1 })
    .lean();

  return memberships.map(({ _id, name }) => ({
    label: name,
    value: _id.toString(),
  }));
}

/**
 * READ ONE
 */
export async function getMembershipById(id) {
  await dbConnect();
  return await membershipModel.findById(id);
}

/**
 * READ BY NAME (optional helper)
 */
export async function getMembershipByName(name) {
  await dbConnect();
  return await membershipModel.findOne({ name });
}

/**
 * UPDATE
 */
export async function updateMembership(id, data) {
  await dbConnect();
  return await membershipModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

/**
 * DELETE (hard delete)
 */
export async function deleteMembership(id) {
  await dbConnect();
  return await membershipModel.findByIdAndDelete(id);
}

/**
 * SOFT DELETE (recommended)
 */
export async function deactivateMembership(id) {
  await dbConnect();
  return await membershipModel.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );
}
