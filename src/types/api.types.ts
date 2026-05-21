export interface ApiResponse<T> {
  results: T[];

  total_results: number;

  total_pages: number;

  page: number;
}
