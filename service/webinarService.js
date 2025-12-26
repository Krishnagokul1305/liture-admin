import dbConnect from "@/app/lib/db";
import webinarModel from "@/app/lib/model/webinar.model";
import { formatDateTime } from "@/app/utils/helper";

/* ============================
   GET ALL WEBINARS
============================ */
export async function getAllWebinars({
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

  // 🔍 Search
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

  // 📌 Sorting logic
  const sort =
    time === "upcoming"
      ? { eventDate: 1 } // nearest upcoming first
      : time === "past"
      ? { eventDate: -1 } // latest past first
      : { createdAt: -1 }; // default

  const webinars = await webinarModel
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .lean();

  const total = await webinarModel.countDocuments(query);

  return {
    webinars: webinars.map((webinar) => ({
      ...webinar,
      _id: webinar._id.toString(),
      eventDate: formatDateTime(webinar.eventDate)?.date,
      createdAt: formatDateTime(webinar.createdAt)?.date,
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getAllWebinarsMinimal() {
  await dbConnect();

  const webinars = await webinarModel
    .find({}, { _id: 1, title: 1 })
    .lean()
    .exec();

  return webinars.map((w) => ({
    value: w._id.toString(),
    label: w.title,
  }));
}

/* ============================
   CREATE WEBINAR
============================ */
export async function createWebinar(data) {
  await dbConnect();

  const webinar = await webinarModel.create({
    image: data.image,
    title: data.title,
    description: data.description,
    eventDate: data.eventDate,
    status: data.status || "upcoming",
  });

  return webinar;
}

export async function getWebinarById(id) {
  await dbConnect();

  const webinar = await webinarModel.findById(id).lean();
  if (!webinar) throw new Error("Webinar not found");

  return {
    ...webinar,
    _id: webinar._id.toString(),
    eventDate: formatDateTime(webinar.eventDate)?.date,
    createdAt: formatDateTime(webinar.createdAt)?.date,
  };
}

export async function updateWebinar(id, data) {
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

  const webinar = await webinarModel.findByIdAndUpdate(id, filteredData, {
    new: true,
    runValidators: true,
  });

  if (!webinar) throw new Error("Webinar not found");

  return webinar;
}

/* ============================
   DELETE WEBINAR
============================ */
export async function deleteWebinar(id) {
  await dbConnect();

  const webinar = await webinarModel.findByIdAndDelete(id);
  if (!webinar) throw new Error("Webinar not found");

  return true;
}
