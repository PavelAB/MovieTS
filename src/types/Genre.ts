import { Movie } from "./Movie";

export interface Genre {
    ID_Genre: number;
    name_genre: string;
    Movies: Partial<Movie>[]
}