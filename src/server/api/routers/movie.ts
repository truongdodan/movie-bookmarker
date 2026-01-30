import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { fetchPopularMovies } from "~/server/tmdb";

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
    })
});