import { Movie } from "./typeMovie";

export interface Company {
    ID_Company: number;
    name_company: string;
    Movies: Partial<Movie>[]
}