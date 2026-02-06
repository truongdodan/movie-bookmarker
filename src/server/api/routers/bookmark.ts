import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { fetchMovieDetails } from "~/server/tmdb";
import { TRPCError } from "@trpc/server";

export const bookmarkRouter = createTRPCRouter({
  add: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return ctx.db.bookmark.create({
          data: {
            userId: parseInt(ctx.session!.user!.id), //TODO: fix type
            movieId: input.id,
          },
        });
      } catch (error: any) {
        if (error.code === "P2002") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Movie already in watchlist",
          });
        }

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
        return ctx.db.bookmark.deleteMany({
          where: {
            userId: parseInt(ctx.session!.user!.id), //TODO: fix type
            movieId: input.id,
          },
        });
      } catch (error: any) {
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
        const bookmark = await ctx.db.bookmark.findFirst({
          where: {
            userId: parseInt(ctx.session!.user!.id), //TODO: fix type
            movieId: input.id,
          },
        });

        return Boolean(bookmark);
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to check bookmark",
        });
      }
    }),

  watchlist: protectedProcedure.query(async ({ ctx }) => {
    try {
      const bookmarkList = await ctx.db.bookmark.findMany({
        where: {
          userId: parseInt(ctx.session!.user!.id), //TODO: fix type
        },
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
            overview: movie.overview,
          };
        }),
      );

      return watchlist.filter(Boolean);
    } catch (error: any) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get Watchlist",
      });
    }
  }),
});
