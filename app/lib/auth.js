import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // 1. Call Django Login API
          const loginRes = await fetch(
            `${process.env.DJANGO_API_URL}/auth/login/`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          const tokens = await loginRes.json();

          console.log(tokens);

          if (!loginRes.ok || !tokens.access) {
            throw new Error(tokens.detail || "Invalid credentials");
          }

          // 2. Call Django User/Me API using the access token
          const userRes = await fetch(
            `${process.env.DJANGO_API_URL}/users/me/`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${tokens.access}`,
              },
            },
          );

          const userData = await userRes.json();

          console.log(userData);

          if (!userRes.ok) throw new Error("Could not fetch user profile");

          // 3. Return user object + tokens to be stored in the JWT
          return {
            ...userData,
            accessToken: tokens.access,
            refreshToken: tokens.refresh,
          };
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // When user logs in, 'user' contains the object returned from authorize()
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      // Make the token and user data available to the frontend
      if (token) {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
});
