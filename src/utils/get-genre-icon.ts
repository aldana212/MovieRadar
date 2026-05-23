// lib/get-genre-icon.ts
import { Film } from "lucide-react";
import { genreIcons } from "../utils/genre-icons";

export function getGenreIcon(id: number) {
  return genreIcons[id] ?? Film;
}