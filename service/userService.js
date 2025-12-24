import dbConnect from "@/app/lib/db";
import userModel from "../app/lib/model/user.model";
import bcrypt from "bcryptjs";
import { formatDateTime } from "@/app/utils/helper";
import { auth } from "@/app/lib/auth";

export async function getAllUsers({ role, search, page = 1, limit = 10 } = {}) {
  await dbConnect();
  const query = {};

  if (role) {
    query.role = role.toUpperCase();
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const users = await userModel
    .find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();

  const total = await userModel.countDocuments(query);

  return {
    users: users.map((user) => ({
      ...user,
      _id: user._id.toString(),
      createdAt: formatDateTime(user.createdAt?.toISOString())?.date,
      updatedAt: formatDateTime(user.updatedAt?.toISOString())?.date,
    })),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function createUser(data) {
  const { name, email, password, role = "USER" } = data;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return user;
}

export const getUserById = async (userId) => {
  const user = await userModel.findById(userId);

  if (!user) throw new Error("User not found");

  return user;
};

export const updateUser = async (userId, data) => {
  const allowedFields = ["name", "email", "role"];
  const filteredData = {};

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      filteredData[key] = data[key];
    }
  }

  console.log(data);

  const user = await userModel.findByIdAndUpdate(userId, filteredData, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new Error("User not found");

  return user;
};

export const deleteUser = async (userId) => {
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
  return true;
};

export const getCurrentUser = async () => {
  const user = (await auth())?.user;
  if (!user) {
    throw new Error("Session not found");
  }
  return getUserById(user?.id);
};

export async function hasCurrentUserRole(...expectedRoles) {
  const session = await auth();
  if (!session?.user?.id) return false;

  const user = await getUserById(session.user.id);
  if (!user) return false;

  return expectedRoles.includes(user.role);
}
