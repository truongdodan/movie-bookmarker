import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const bookmarkRouter = createTRPCRouter({
    add: protectedProcedure
        .input(z.object({id: z.number()}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.bookmark.create({
                data: {
                    userId: parseInt(ctx!.session!.user!.id), //TODO: fix type
                    movieId: input.id
                }
            });
        }),

    remove: protectedProcedure
        .input(z.object({id: z.number()}))
        .mutation(async ({ctx, input}) => {
            return ctx.db.bookmark.deleteMany({
                where: {
                    userId: parseInt(ctx!.session!.user!.id), //TODO: fix type
                    movieId: input.id,
                }
            })
        }),
    
    isBookmarked: protectedProcedure
        .input(z.object({id: z.number()}))
        .query(async ({ctx, input}) => {
            const bookmark = await ctx.db.bookmark.findFirst({
                where: {
                    userId: parseInt(ctx!.session!.user!.id), //TODO: fix type
                    movieId: input.id,
                }
            });

            return Boolean(bookmark);
        })
});