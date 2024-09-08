import { Movie } from "./Movie";

export interface Tag {
    ID_Tag: number;
    name_tag: string;
    Movies?: Partial<Movie>[]
}