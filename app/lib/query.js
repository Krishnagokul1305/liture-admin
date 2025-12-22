import userModel from "./model/user.model";

export async function getAllUsers() {
  try {
    return await userModel.find();
  } catch (error) {
    console.log(error);
  }
}
