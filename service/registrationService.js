import dbConnect from "@/app/lib/db";
import registrationModel from "@/app/lib/model/registration.model";
import { formatDateTime } from "@/app/utils/helper";

export async function createRegistration(data) {
  await dbConnect();

  const createData = { ...data };

  if (createData.webinar === "") delete createData.webinar;
  if (createData.internship === "") delete createData.internship;
  if (createData.type === "internship") {
    delete createData.webinar;
  }

  if (createData.type === "webinar") {
    delete createData.internship;
  }

  return registrationModel.create(createData);
}

export async function updateRegistration(id, data) {
  await dbConnect();

  const update = { ...data };
  const unset = {};

  // Remove empty strings
  if (update.webinar === "") delete update.webinar;
  if (update.internship === "") delete update.internship;

  // 🔥 Enforce mutual exclusivity
  if (update.type === "internship") {
    unset.webinar = 1;
    delete update.webinar; // ⬅️ IMPORTANT
  }

  if (update.type === "webinar") {
    unset.internship = 1;
    delete update.internship; // ⬅️ IMPORTANT
  }

  const updateQuery = Object.keys(unset).length
    ? { $set: update, $unset: unset }
    : { $set: update };

  return registrationModel.findByIdAndUpdate(id, updateQuery, {
    new: true,
    runValidators: true,
  });
}

export async function deleteRegistration(id) {
  await dbConnect();
  return registrationModel.findByIdAndDelete(id);
}

export async function getPastRegistrationStats() {
  await dbConnect();

  const today = new Date();
  const endUTC = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );

  const startUTC = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - 9,
      0,
      0,
      0,
      0,
    ),
  );

  const results = await registrationModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startUTC,
          $lte: endUTC,
        },
      },
    },

    {
      $group: {
        _id: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "UTC",
            },
          },
          type: "$type",
        },
        count: { $sum: 1 },
      },
    },

    {
      $group: {
        _id: "$_id.date",
        webinar: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "webinar"] }, "$count", 0],
          },
        },
        internship: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "internship"] }, "$count", 0],
          },
        },
      },
    },

    {
      $project: {
        _id: 0,
        date: "$_id",
        webinar: 1,
        internship: 1,
      },
    },

    { $sort: { date: 1 } },
  ]);

  // Fill missing days
  const days = [];
  for (let i = 9; i >= 0; i--) {
    const d = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() - i,
      ),
    );
    const dateStr = d.toISOString().slice(0, 10);

    const found = results.find((r) => r.date === dateStr);

    days.push({
      date: dateStr,
      webinar: found?.webinar ?? 0,
      internship: found?.internship ?? 0,
    });
  }

  return days;
}

export async function getRecentRegistrations(limit = 5) {
  await dbConnect();

  const registrations = await registrationModel
    .find()
    .sort({ createdAt: -1 }) // newest first
    .limit(limit)
    .populate("internship", "title eventDate")
    .populate("webinar", "title eventDate")
    .lean();

  return registrations.map((reg) => ({
    _id: reg._id.toString(),
    fullName: reg.fullName,
    email: reg.email,
    phoneNumber: reg.phoneNumber,
    reason: reg.reason,
    type: reg.type,
    title:
      reg.type === "internship"
        ? (reg.internship?.title ?? null)
        : (reg.webinar?.title ?? null),
    createdAt: formatDateTime(reg.createdAt)?.date,
  }));
}
