"use client";

import Link from "next/link";
import { WatchlistCard } from "./_components/watchlist-card";
import { api } from "~/trpc/react";

export default function WatchlistPage() {
  const { data, isLoading, error } = api.bookmark.watchlist.useQuery();
  const utils = api.useUtils();
  const removeBookmark = api.bookmark.remove.useMutation({
    onSuccess: () => {
      utils.bookmark.watchlist.invalidate();
    },
  });
  const handleCardOnRemove = () => {
    console.log("Remove bookmark");
  };

  if (isLoading) return <h1>Loading watchlist...</h1>;
  if (error) return <h1>Failed to load watchlist: {error.message}</h1>;
  if (!data || data.length === 0) return <h1>Your watchlist is empty.</h1>;

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold">Watchlist</h1>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-1">
        {data.map((bookmark: any) => (
          <WatchlistCard
            key={bookmark.id}
            {...bookmark}
            onRemove={() => removeBookmark.mutate({ id: bookmark.id })}
          />
        ))}
      </ul>
    </>
  );
}
