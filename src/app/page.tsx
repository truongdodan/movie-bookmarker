
import { api, HydrateClient } from "~/trpc/server";
import { MovieList } from "./_components/movie-list";

  export default async function Home() {
    return (
      <HydrateClient>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <MovieList />
        </div>
      </main>
    </HydrateClient>
    );
  }