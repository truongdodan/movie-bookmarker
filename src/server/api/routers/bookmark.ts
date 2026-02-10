import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { fetchMovieDetails } from "~/server/tmdb";
import { TRPCError } from "@trpc/server";
import type { Movie } from "~/types/movie";

export const bookmarkRouter = createTRPCRouter({
  add: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const userId = Number(ctx.session?.user.id);
      try {
        return ctx.db.bookmark.create({
          data: {
            userId: userId,
            movieId: input.id,
          },
        });
      } catch (error) {
        console.error("Error: ", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add bookmark",
        });
      }
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const userId = Number(ctx.session?.user.id);

        return ctx.db.bookmark.deleteMany({
          where: {
            userId: userId, //TODO: fix type
            movieId: input.id,
          },
        });
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to remove bookmark",
        });
      }
    }),

  isBookmarked: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        const userId = Number(ctx.session?.user.id);

        const bookmark = await ctx.db.bookmark.findFirst({
          where: {
            userId: userId,
            movieId: input.id,
          },
        });

        return Boolean(bookmark);
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to check bookmark",
        });
      }
    }),

  watchlist: protectedProcedure.query(async ({ ctx }) => {
    try {
      const userId = Number(ctx.session?.user.id);

      const bookmarkList = await ctx.db.bookmark.findMany({
        where: {
          userId: userId,
        },
      });

      const watchlist = await Promise.all(
        bookmarkList.map(async (bookmark) => {
          const movie: Movie = await fetchMovieDetails(
            String(bookmark.movieId),
          );

          return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average,
            overview: movie.overview,
          };
        }),
      );

      return watchlist.filter(Boolean);
    } catch {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get Watchlist",
      });
    }
  }),
});
