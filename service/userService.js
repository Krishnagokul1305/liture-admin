import userModel from "../app/lib/model/user.model";
import bcrypt from "bcryptjs";

export async function getAllUsers({ role, search, page = 1, limit = 10 } = {}) {
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
    .sort({ createdAt: -1 });

  const total = await userModel.countDocuments(query);

  return {
    users,
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

export const updateUserRole = async (userId, role) => {
  const user = await userModel.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  );

  if (!user) throw new Error("User not found");

  return user;
};

export const deleteUser = async (userId) => {
  const user = await userModel.findByIdAndDelete(userId);
  if (!user) throw new Error("User not found");
  return true;
};
