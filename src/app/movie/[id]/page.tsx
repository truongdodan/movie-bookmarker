"use client";

import { BookmarkCheck, BookmarkIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function MovieDetails() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const untils = api.useUtils();
  const { data, isLoading, error } = api.movie.details.useQuery({ id });
  const { data: isBookmarked } = api.bookmark.isBookmarked.useQuery({
    id: Number(id),
  });
  const addBookmark = api.bookmark.add.useMutation({
    onSuccess: async () => {
      await untils.bookmark.isBookmarked.invalidate({ id: Number(id) });
    },
  });
  const removeBookmark = api.bookmark.remove.useMutation({
    onSuccess: async () => {
      await untils.bookmark.isBookmarked.invalidate({ id: Number(id) });
    },
  });
  const isUpdating = addBookmark.isPending || removeBookmark.isPending;

  function handleBookmark() {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (isBookmarked) {
      removeBookmark.mutate({ id: Number(id) });
      return;
    } else {
      addBookmark.mutate({ id: Number(id) });
    }
  }

  if (isLoading) return <h1>Loading movie...</h1>;
  if (error) return <h1>Failed to load error: {error.message}</h1>;
  if (!data) return <h1>There is no movie data.</h1>;

  const { title, poster_path, vote_average, release_date, overview } = data;

  return (
    <div>
      <section className="flex flex-col gap-6 md:flex-row md:gap-10">
        {/* Poster */}
        <div className="mx-auto w-full max-w-xs overflow-hidden rounded-xl shadow-lg md:mx-0 md:w-[280px] md:flex-none lg:w-[320px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            className="w-full object-cover"
          />
        </div>

        {/* Info */}
        <section className="flex flex-col gap-5">
          {/* Title + Year */}
          <header>
            <h1 className="text-2xl leading-tight font-bold sm:text-3xl">
              {title}{" "}
              <span className="text-muted-foreground font-normal">
                ({new Date(release_date).getFullYear()})
              </span>
            </h1>
          </header>

          {/* Rating + Bookmark */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {vote_average.toFixed(1)}
              </div>
              <span className="text-sm font-medium">User Score</span>
            </div>

            {/* Bookmark */}
            <button
              type="button"
              className="hover:bg-muted rounded-full border p-3 transition"
              aria-label="Bookmark movie"
              disabled={isUpdating}
              onClick={handleBookmark}
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-yellow-500" />
              ) : (
                <BookmarkIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Overview */}
          <section className="max-w-prose">
            <h2 className="text-lg font-semibold">Overview</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              {overview}
            </p>
          </section>
        </section>
      </section>
    </div>
  );
}
