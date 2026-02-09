import { env } from "~/env";

export async function fetchPopularMovies() {
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

  return res.json(); //TODO: fix type
}

export async function fetchMovieDetails(id: string) {
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

  return res.json();//TODO: fix type
}

export async function fetchMovieByTitle(title: string) {
  const url = `https://api.themoviedb.org/3/search/multi?query=${title}&include_adult=true&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_READ_ACCESS_TOKEN}`,
    },
  };

  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("Failed to fetch movie data");
  }

  return res.json();//TODO: fix type
}
