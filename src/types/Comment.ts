import { MMCommentUser } from "./MMCommentUser";
import { Movie } from "./Movie";
import { User } from "./User";

export interface Comment {
    
    ID_Comment: number;
    body: string;
    User: Partial<User>; 
    Movie: Partial<Movie>;
    Comment: MMCommentUser;
    createdAt: Date;
}