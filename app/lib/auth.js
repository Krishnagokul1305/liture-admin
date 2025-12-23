import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
import dbConnect from "./db";
import userModel from "./model/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    // }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        await dbConnect();

        const user = await userModel
          .findOne({ email: credentials.email })
          .select("+password");

        if (!user) throw new Error("No user found with this email.");

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) throw new Error("Invalid password.");
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await dbConnect();
        const existingUser = await userModel.findOne({ email: user.email });
        console.log(existingUser);
        if (!existingUser) {
          const errorUrl = new URL("/auth/error", process.env.NEXTAUTH_URL);
          errorUrl.searchParams.set("error", "NoAccount");
          throw new Error(`NEXT_REDIRECT:${errorUrl.toString()}`);
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        console.log(user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
});
