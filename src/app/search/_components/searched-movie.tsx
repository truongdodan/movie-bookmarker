"use client"

import { api } from "~/trpc/react";
import { SearchedCard } from "./searched-card";
import { useSearchParams } from "next/navigation";

export function SearchedMoiveList() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const {data, isLoading, error} = api.movie.search.useQuery(
        {title: query},
        {enabled: query.length > 0}
    );

    if (isLoading) return <h1>Loading movie...</h1>
    if (error) return <h1>Failed to load error: {error.message}</h1>
    if (!data) return <h1 className="mb-4 text-2xl font-semibold">No movie that match: {query}</h1>

    console.log(data)

    return (
        <>
            <h1 className="mb-4 text-2xl font-semibold">Search Results: </h1>
            
            <ul className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {data?.results?.map((movie: any) => (
                    <SearchedCard {...movie} key={movie.id}/>
                ))}
            </ul>
        </>
    );
}