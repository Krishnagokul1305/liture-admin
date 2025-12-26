import dbConnect from "@/app/lib/db";
import registrationModel from "@/app/lib/model/registration.model";
import { formatDateTime } from "@/app/utils/helper";

export async function createRegistration(data) {
  const registration = await registrationModel.create(data);
  return registration;
}

export async function getAllRegistrations({
  search,
  type,
  internshipId,
  webinarId,
  page = 1,
  limit = 10,
} = {}) {
  await dbConnect();

  const query = {};

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // 🎯 Filter by type
  if (type) {
    query.type = type;
  }

  // 🔗 Filter by internship or webinar
  if (internshipId) query.internship = internshipId;
  if (webinarId) query.webinar = webinarId;

  const skip = (page - 1) * limit;

  const registrations = await registrationModel
    .find(query)
    .populate("internship", "title")
    .populate("webinar", "title")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    registrations: registrations.map((reg) => {
      let title = null;
      if (reg.type === "internship" && reg.internship) {
        title = reg.internship.title;
      }
      if (reg.type === "webinar" && reg.webinar) {
        title = reg.webinar.title;
      }

      return {
        _id: reg._id.toString(),
        fullName: reg.fullName,
        email: reg.email,
        phoneNumber: reg.phoneNumber,
        reason: reg.reason,
        type: reg.type,
        title,
        createdAt: formatDateTime(reg.createdAt)?.date,
      };
    }),
    pagination: {
      total: await registrationModel.countDocuments(query),
      page,
      limit,
      totalPages: Math.ceil(
        (await registrationModel.countDocuments(query)) / limit
      ),
    },
  };
}

export async function getRegistrationById(id) {
  await dbConnect();

  const registration = await registrationModel
    .findById(id)
    .populate("internship", "title")
    .populate("webinar", "title")
    .lean();

  if (!registration) throw new Error("Registration not found");

  return {
    ...registration,
    _id: registration._id.toString(),
    internship: registration.internship
      ? {
          ...registration.internship,
          _id: registration.internship._id.toString(),
        }
      : null,
    webinar: registration.webinar
      ? {
          ...registration.webinar,
          _id: registration.webinar._id.toString(),
        }
      : null,
    createdAt: formatDateTime(registration.createdAt)?.date,
  };
}

export async function updateRegistration(id, data) {
  await dbConnect();
  return registrationModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteRegistration(id) {
  await dbConnect();
  return registrationModel.findByIdAndDelete(id);
}
