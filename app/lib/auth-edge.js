import { getToken } from "next-auth/jwt";

export async function auth(req) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  return token;
}
