import type { Genre } from "./genre.types";

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  popularity: number;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Videos {
  results: Video[];
}

export interface Similar {
  results: SimilarMovie[];
}

export interface MovieDetails {
  id: number;

  title: string;
  original_title: string;
  tagline: string;
  overview: string;

  poster_path: string | null;
  backdrop_path: string | null;

  release_date: string;
  runtime: number;

  vote_average: number;
  vote_count: number;
  popularity: number;

  budget: number;
  revenue: number;

  original_language: string;
  status: string;

  genres: Genre[];

  production_companies: ProductionCompany[];

  credits: Credits;

  videos: Videos;

  similar: Similar;
}