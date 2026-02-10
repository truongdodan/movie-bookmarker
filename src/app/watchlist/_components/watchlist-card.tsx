import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardTitle } from "~/components/ui/card";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { X } from "lucide-react";
import type { Movie } from "~/types/movie";

type WatchlistCardProps = Movie & {
  onRemove: () => void;
}

export function WatchlistCard({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  overview,
  onRemove,
}: WatchlistCardProps) {
  return (
    <Card className="flex flex-row gap-6 overflow-hidden p-0">
      {/* Poster - Left */}
      {poster_path ? (
        <Link
          href={`/movie/${id}`}
          className="flex h-full w-32 items-center justify-center rounded bg-gray-200 text-gray-400"
        >
          <img
            src={`https://image.tmdb.org/t/p/w154${poster_path}`}
            alt={title}
            className="h-full w-full object-cover"
          />
        </Link>
      ) : (
        <Link
          href={`/movie/${id}`}
          className="flex h-full w-32 items-center justify-center rounded bg-gray-200 text-gray-400"
        >
          No image
        </Link>
      )}

      {/* Details - Right */}
      <div className="flex-1 py-4">
        <div className="mb-2 flex items-center gap-3">
          <Badge className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
            {vote_average.toFixed(1)}
          </Badge>
          <div>
            <Link href={`/movie/${id}`}>
              <CardTitle className="text-lg hover:underline">{title}</CardTitle>
            </Link>
            <CardDescription>{release_date}</CardDescription>
          </div>
        </div>
        <p className="mb-3 text-sm text-gray-700">{overview}</p>

        {/* Actions */}
        <Button
          size="icon"
          variant="outline"
          className="rounded-full"
          onClick={onRemove}
        >
          <X size={20} className="stroke-[3] text-gray-400" />
        </Button>
      </div>
    </Card>
  );
}
