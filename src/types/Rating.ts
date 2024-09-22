import { Movie } from "./Movie";

export interface Rating {
    
    ID_Rating: number;
    rate_picture: number;
    rate_actor_game: number;
    rate_cinematography: number;
    rate_sound: number;
    rate_writing: number;
    Movie?: Partial<Movie> | string;
    User?: Partial<any> | string; //TODO change this

}