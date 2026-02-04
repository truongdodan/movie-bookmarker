import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { fetchMovieDetails } from "~/server/tmdb";

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
        }),

    watchlist: protectedProcedure
        .query(async ({ctx}) => {
            const bookmarkList = await ctx.db.bookmark.findMany({
                where: {
                    userId: parseInt(ctx!.session!.user!.id), //TODO: fix type
                }
            });

            const watchlist = await Promise.all(
                bookmarkList.map(async (bookmark) => {
                    const movie = await fetchMovieDetails(String(bookmark.movieId));

                    return {
                        id: movie.id,
                        title: movie.title,
                        posterPath: movie.poster_path,
                        releaseDate: movie.release_date,
                        rating: movie.vote_average,
                        overview: movie.overview
                    };
                })
            );

            return watchlist.filter(Boolean);
        })
});