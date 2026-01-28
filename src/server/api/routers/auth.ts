import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import bcrypt from "bcryptjs";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({ 
        email: z.string().email(), 
        username: z.string().min(3).max(20), 
        password: z.string()
                    .min(8)
                    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                    .regex(/[0-9]/, "Password must contain at least one number")
                    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character") 
    }))
    .mutation(async ({ ctx, input }) => {
        const exists = await ctx.db.user.findFirst({
            where: {
                OR: [
                    { email: input.email },
                    { username: input.username }
                ]
            }
        });

        if (exists) {
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(input.password, 10);

        await ctx.db.user.create({
        data: {
          email: input.email,
          username: input.username,
          hashedPassword,
        },
      });

      return {success: true}
    }),
});
