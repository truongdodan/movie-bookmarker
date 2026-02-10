import { TRPCError } from "@trpc/server";
import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  fetchMovieByTitle,
  fetchMovieDetails,
  fetchPopularMovies,
} from "~/server/tmdb";
import type { Movie } from "~/types/movie";

export const movieRouter = createTRPCRouter({
  popular: publicProcedure.query(async () => {
    try {
      const res = await fetchPopularMovies();

      return {
        ...res,
        results: res.results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          overview: movie.overview,
        })),
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get Popular Movies",
      });
    }
  }),

  details: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const movie: Movie = await fetchMovieDetails(input.id);

        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          overview: movie.overview,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get movie details",
        });
      }
    }),

  search: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      try {
        const res = await fetchMovieByTitle(input.title);

        const results = res.results
          .filter((show: any) => {
            if (!show) return false;
            if (show.media_type === "person") return false;
            if (!show.poster_path) return false;

            return true;
          })
          .map((show: any) => ({
            id: show.id,
            title: show.name ?? show.title,
            poster_path: show.poster_path,
            release_date: show.release_date ?? show.first_air_date ?? "",
            vote_average: show.vote_average ?? 0,
            overview: show.overview ?? "",
          }));

        return {
          ...res,
          results,
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get search result",
        });
      }
    }),
});
