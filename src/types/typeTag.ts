import { Movie } from "./typeMovie";

export interface Tag {
    ID_Tag: number;
    name_tag: string;
    Movies?: Partial<Movie>[]
}