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
  poster_path,
  vote_average,
  release_date,
}: MovieCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm cursor-pointer overflow-hidden pt-0 transition hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute inset-0 z-30 aspect-video" />
      <Link href={`/movie/${id}`} className="block" key={id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="Movie poster"
          className="relative z-20 w-full object-cover"
        />
      </Link>

      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{vote_average.toFixed(1)}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{release_date}</CardDescription>
      </CardHeader>
    </Card>
  );
}
