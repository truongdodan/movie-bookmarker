"use client";

import { Field } from "~/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  const searchQuery = useSearchParams();
  const urlQuery = searchQuery.get("q") ?? "";
  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <Field className="max-w-sm">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputGroupInput
            id="inline-start-input"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputGroupAddon align="inline-start">
            <button type="submit">
              <SearchIcon className="text-muted-foreground" />
            </button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    </Field>
  );
}
