export interface FavoriteRow {
  id: string;
  user_id: string;
  movie_id: number;
  title: string;
  poster_path: string | null;
  release_date: string | null;
  vote_average: number | null;
  overview: string | null;
  created_at: string;
}
