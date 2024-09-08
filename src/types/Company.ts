import { Movie } from "./Movie";

export interface Company {
    ID_Company: number;
    name_company: string;
    Movies: Partial<Movie>[]
}