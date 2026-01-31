
import { api, HydrateClient } from "~/trpc/server";
import { MovieList } from "./_components/movie-list";

  export default async function Home() {
    return (
      <HydrateClient>
          <MovieList />
    </HydrateClient>
    );
  }