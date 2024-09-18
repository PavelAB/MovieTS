import { Movie } from "./Movie";

export interface Comment {
    
    ID_Comment: number;
    body: string;
    ID_User: any; // TODO change this
    
    Movie?: Partial<Movie>;
    createdAt: Date;
}