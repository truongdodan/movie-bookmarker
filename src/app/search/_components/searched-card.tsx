import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import Link from "next/link"
import { Badge } from "~/components/ui/badge";
import { X } from "lucide-react";

type SearchedCardProps = {
    id: string,
    title: string,
    posterPath: string | null,
    releaseDate: string,
    overview: string,
}

export function SearchedCard({id, title, posterPath, releaseDate, overview}: SearchedCardProps) {
    return (
    <Card className="flex flex-row gap-6 overflow-hidden p-0">
      {/* Poster - Left */}
        {posterPath ? (
          <Link href={`/movie/${id}`} className="h-full w-32 rounded bg-gray-200 flex items-center justify-center text-gray-400">
            <img
                src={`https://image.tmdb.org/t/p/w154${posterPath}`}
                alt={title}
                className="h-full w-full object-cover"
            />
        </Link>
        ) : (
          <Link href={`/movie/${id}`} className="h-full w-32 rounded bg-gray-200 flex items-center justify-center text-gray-400">
            No image
          </Link>
        )}

      {/* Details - Right */}
      <div className="flex-1 py-4">
        <div className="flex items-center gap-3 mb-2">
          <div>
            <Link href={`/movie/${id}`}>
              <CardTitle className="hover:underline text-lg">{title}</CardTitle>
            </Link>
            <CardDescription>{releaseDate}</CardDescription>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
          {overview}
        </p>
      </div>
    </Card>
  );
}