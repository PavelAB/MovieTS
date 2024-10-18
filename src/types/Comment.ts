import { Movie } from "./Movie";
import { User } from "./User";

export interface Comment {
    
    ID_Comment: number;
    body: string;
    User: Partial<User>; 
    Movie: Partial<Movie>;
    NumberLikes: number;
    IDUsersLikes: number[];
    createdAt: Date;
}

//TODO Check ! I'm not sure if adding a Like interface is a good practice, but since it's a separate table in the database, maybe it's acceptable.
export interface Like {
    Comment: number;
    User: number;
}