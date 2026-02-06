import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Movie } from "~/types/movie";

type MovieCardProps = Movie;

export function MovieCard({
  id,
  title,
  posterPath,
  rating,
  releaseDate,
}: MovieCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm cursor-pointer overflow-hidden pt-0 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-0 z-30 aspect-video" />
      <Link href={`/movie/${id}`} className="block" key={id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt="Movie poster"
          className="relative z-20 w-full object-cover"
        />
      </Link>

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{rating.toFixed(1)}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{releaseDate}</CardDescription>
      </CardHeader>
    </Card>
  );
}
