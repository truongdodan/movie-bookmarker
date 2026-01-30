
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

type MovieCardProps = {
    title: string,
    posterPath: string | null;
    rating: number;
    releaseDate: string;
}

export function MovieCard({title, posterPath, rating, releaseDate}: MovieCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0
    cursor-pointer
    transition
    hover:-translate-y-1
    hover:shadow-lg"
    >
      <div className="absolute inset-0 z-30 aspect-video" />
      <img
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
        alt="Movie poster"
        className="relative z-20 w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">{rating.toFixed(1)}</Badge>
        </CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {releaseDate}
        </CardDescription>
      </CardHeader>
      {/* <CardFooter>
        <Button className="w-full">View Event</Button>
      </CardFooter> */}
    </Card>
  )
}
