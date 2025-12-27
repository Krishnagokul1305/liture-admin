import dbConnect from "@/app/lib/db";
import membershipRegistrationModel from "@/app/lib/model/membershipRegistration.model";
import { formatDateTime } from "@/app/utils/helper";

export async function getAllMembershipRegistrations({
  search,
  membershipId,
  page = 1,
  limit = 10,
} = {}) {
  await dbConnect();

  const query = {};

  // 🔍 Search
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phoneNumber: { $regex: search, $options: "i" } },
    ];
  }

  // 🎯 Filter by membership
  if (membershipId) {
    query.membership = membershipId;
  }

  const skip = (page - 1) * limit;

  const registrations = await membershipRegistrationModel
    .find(query)
    .populate("membership", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await membershipRegistrationModel.countDocuments(query);

  return {
    registrations: registrations.map((reg) => ({
      ...reg,
      _id: reg._id.toString(),
      membership: reg.membership
        ? {
            ...reg.membership,
            _id: reg.membership._id.toString(),
          }
        : null,
      name: reg?.membership?.name,
      createdAt: formatDateTime(reg.createdAt).date,
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function createMembershipRegistration(data) {
  await dbConnect();

  const registration = await membershipRegistrationModel.create(data);

  return {
    ...registration.toObject(),
    _id: registration._id.toString(),
    createdAt: formatDateTime(registration.createdAt).date,
  };
}

export async function getMembershipRegistrationById(id) {
  await dbConnect();

  const registration = await membershipRegistrationModel
    .findById(id)
    .populate("membership", "name")
    .lean();

  if (!registration) return null;

  return {
    ...registration,
    _id: registration._id.toString(),
    membership: registration.membership
      ? {
          ...registration.membership,
          _id: registration.membership._id.toString(),
        }
      : null,
    createdAt: formatDateTime(registration.createdAt).date,
  };
}

export async function updateMembershipRegistration(id, data) {
  await dbConnect();

  const updated = await membershipRegistrationModel
    .findByIdAndUpdate(id, data, { new: true })
    .lean();

  if (!updated) return null;

  return {
    ...updated,
    _id: updated._id.toString(),
    createdAt: formatDateTime(updated.createdAt).date,
  };
}

export async function deleteMembershipRegistration(id) {
  await dbConnect();
  await membershipRegistrationModel.findByIdAndDelete(id);
}
