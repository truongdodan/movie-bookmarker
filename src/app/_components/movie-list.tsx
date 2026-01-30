"use client"

import { api } from "~/trpc/react";
import { MovieCard } from "./movie-card";

export function MovieList() {
    const {data, isLoading, error} = api.movie.popular.useQuery();

    if (isLoading) return <h1>Loading movie...</h1>
    if (error) return <h1>Failed to load error: {error.message}</h1>

    return (
        <>
            <h1 className="mb-4 text-2xl font-semibold">Popular Movies</h1>
            
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {data?.results?.map((movie: any) => (
                    <MovieCard key={movie.id} {...movie}/>
                ))}
            </ul>
        </>
    );
}