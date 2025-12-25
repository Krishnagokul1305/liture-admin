import dbConnect from "@/app/lib/db";
import internshipModel from "@/app/lib/model/internship.model";
import { formatDateTime } from "@/app/utils/helper";

/* ============================
   GET ALL INTERNSHIPS
============================ */
export async function getAllInternships({
  search,
  status,
  time, // "past" | "upcoming"
  page = 1,
  limit = 10,
} = {}) {
  await dbConnect();

  const query = {};
  const now = new Date();

  if (status) {
    query.status = status;
  }

  // 🔍 Search by title / description
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // ⏱ Time-based filtering
  if (time === "upcoming") {
    query.eventDate = { $gte: now };
  }

  if (time === "past") {
    query.eventDate = { $lt: now };
  }

  const skip = (page - 1) * limit;

  // 📌 Default sorting:
  // upcoming → nearest first
  // past → latest past first
  const sort =
    time === "upcoming"
      ? { eventDate: 1 }
      : time === "past"
      ? { eventDate: -1 }
      : { createdAt: -1 };

  const internships = await internshipModel
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .lean();

  const total = await internshipModel.countDocuments(query);

  return {
    internships: internships.map((internship) => ({
      ...internship,
      _id: internship._id.toString(),
      eventDate: formatDateTime(internship.eventDate)?.date,
      createdAt: formatDateTime(internship.createdAt)?.date,
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/* ============================
   CREATE INTERNSHIP
============================ */
export async function createInternship(data) {
  await dbConnect();

  const internship = await internshipModel.create({
    image: data.image,
    title: data.title,
    description: data.description,
    eventDate: data.eventDate,
    status: data.status || "active",
  });

  return internship;
}

/* ============================
   GET INTERNSHIP BY ID
============================ */
export async function getInternshipById(id) {
  await dbConnect();

  const internship = await internshipModel.findById(id);
  if (!internship) throw new Error("Internship not found");

  return internship;
}

/* ============================
   UPDATE INTERNSHIP
============================ */
export async function updateInternship(id, data) {
  await dbConnect();

  const allowedFields = [
    "image",
    "title",
    "description",
    "eventDate",
    "status",
  ];

  const filteredData = {};
  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      filteredData[key] = data[key];
    }
  }

  const internship = await internshipModel.findByIdAndUpdate(id, filteredData, {
    new: true,
    runValidators: true,
  });

  if (!internship) throw new Error("Internship not found");

  return internship;
}

export async function deleteInternship(id) {
  await dbConnect();

  const internship = await internshipModel.findByIdAndDelete(id);
  if (!internship) throw new Error("Internship not found");

  return true;
}
