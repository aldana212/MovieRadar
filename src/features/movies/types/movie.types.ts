import type { Genre } from "./genre.types";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;

  genre_ids?: number[];
  genres?: Genre[];

  runtime?: number;
  tagline?: string;
  status?: string;
  vote_count?: number;
  popularity?: number;
}
