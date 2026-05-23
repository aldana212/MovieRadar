import type { Movie } from "@/features/movies/types/movie.types";
import type { FavoriteRow } from "../types/favorite.types";

export const favoriteToMovie = (fav: FavoriteRow): Movie => ({
  id: fav.movie_id,
  title: fav.title,
  poster_path: fav.poster_path,
  backdrop_path: null, // no lo tienes
  release_date: fav.release_date ?? "",
  vote_average: fav.vote_average ?? 0,
  overview: fav.overview ?? "",
});