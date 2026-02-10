import { env } from "~/env";
import type { Movie } from "~/types/movie";

export async function fetchPopularMovies(): Promise<{ results: Movie[] }> {
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  return (await res.json()) as { results: Movie[] };
}

export async function fetchMovieDetails(id: string): Promise<Movie> {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  return (await res.json()) as Movie;
}

export async function fetchMovieByTitle(
  title: string,
): Promise<{ results: Movie[] }> {
  const url = `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=true&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${env.TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  return (await res.json()) as { results: Movie[] };
}
