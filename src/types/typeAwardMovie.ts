import { Movie } from "./typeMovie";

export interface AwardMovie {
    
    ID_Award_Movie: number;
    type_award: string;
    name_award: string;
    year_award: string;

    Movie: Partial<Movie>;
    
}