import { db } from "~/server/db";
import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        /* const user = await db.user.findUnique({
          where: {
            username: credentials.username,
          }
        })

        if (!user) {
          return null;
        }

        const isPwdValid = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isPwdValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.username,
        }; */

        try {
          console.log("Attempting to find user:", credentials.username);
          const user = await db.user.findUnique({
            where: {
              username: credentials.username,
            }
          })
  
          if (!user) {
            console.log("No user found with that username.");
            return null;
          }
  
          console.log("User found, comparing password...");
          const isPwdValid = await bcrypt.compare(credentials.password, user.hashedPassword);
  
          if (!isPwdValid) {
            console.log("Password comparison failed.");
            return null;
          }
  
          console.log("Password is valid. Returning user.");
          return {
            id: String(user.id),
            name: user.username,
          };

        } catch (error) {
          console.error("An error occurred during authorization:", error);
          // Returning null or throwing an error here will cause the login to fail.
          // For debugging, we log it and return null.
          return null;
        }
      },
    })
  ],
  pages: {
    signIn: "/login",
  },  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  }
}