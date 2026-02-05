import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchMovieByTitle, fetchMovieDetails, fetchPopularMovies } from "~/server/tmdb";

export const movieRouter = createTRPCRouter({
    popular: publicProcedure.query(async () => {
        const res = await fetchPopularMovies();

        return {
            ...res,
            results: res.results.map((movie: any) => ({
                        id: movie.id,
                        title: movie.title,
                        posterPath: movie.poster_path,
                        releaseDate: movie.release_date,
                        rating: movie.vote_average
            }))
        }
    }),

    details: publicProcedure
        .input(z.object({id: z.string()}))
        .query(async ({input}) => {
            const movie = await fetchMovieDetails(input.id);

            return {
                id: movie.id,
                title: movie.title,
                posterPath: movie.poster_path,
                releaseDate: movie.release_date,
                rating: movie.vote_average,
                overview: movie.overview
            };
    }),

    search: publicProcedure
        .input(z.object({title: z.string()}))
        .query(async ({input}) => {
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
                posterPath: show.poster_path,
                releaseDate: show.release_date ?? show.first_air_date ?? "",
                overview: show.overview ?? ""
            }))

            return {
                ...res,
                results,
            }
        })
});