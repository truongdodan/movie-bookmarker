"use client"

import { BookmarkIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function MovieDetails() {
    const params = useParams<{id: string}>();
    const id = params.id;

    const {data, isLoading, error} = api.movie.details.useQuery({id});

    if (isLoading) return <h1>Loading movie...</h1>
    if (error) return <h1>Failed to load error: {error.message}</h1>

    const {title, posterPath, rating, releaseDate, overview} = data;

    return (
        <div>
        <section className="flex flex-col gap-6 md:flex-row md:gap-10">
            {/* Poster */}
            <div className="mx-auto w-full max-w-xs overflow-hidden rounded-xl shadow-lg md:mx-0 md:w-[280px] md:flex-none lg:w-[320px]">
            <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={title}
                className="w-full object-cover"
            />
            </div>

            {/* Info */}
            <section className="flex flex-col gap-5">
            {/* Title + Year */}
            <header>
                <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
                {title}{" "}
                <span className="text-muted-foreground font-normal">
                    ({new Date(releaseDate).getFullYear()})
                </span>
                </h1>
            </header>

            {/* Rating + Bookmark */}
            <div className="flex flex-wrap items-center gap-4">
                {/* Rating */}
                <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white text-sm font-semibold">
                    {rating.toFixed(1)}
                </div>
                <span className="text-sm font-medium">User Score</span>
                </div>

                {/* Bookmark */}
                <button
                type="button"
                className="rounded-full border p-3 transition hover:bg-muted"
                aria-label="Bookmark movie"
                >
                <BookmarkIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Overview */}
            <section className="max-w-prose">
                <h2 className="text-lg font-semibold">Overview</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                {overview}
                </p>
            </section>
            </section>
        </section>
        </div>

    )
}