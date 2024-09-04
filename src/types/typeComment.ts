import { Movie } from "./typeMovie";

export interface Comment {
    
    ID_Comment: number;
    body: string;
    User: any; // TODO change this

    Movie?: Partial<Movie>;
    
}