import { AwardMovie } from "./AwardMovie";
import { Company } from "./Company";
import { Genre } from "./Genre";
import { Person } from "./Person";

export interface Movie {
    ID_Movie: number;
    title: string;
    cover?: any;             // TODO change this
    release_date?: string | Date;
    directed_by?: any;       // TODO change this
    Ratings?: any;            // TODO Type Rating[]
    Comments?: any;          // TODO Type Comments[]
    Tags?: any;              // TODO Type Tags[]
    Companies?: Company[];         // TODO Type Companies[]
    Awards_Movies?: AwardMovie[];      // TODO Type Award_Movies[]
    Actors: Person[];            // TODO Type Actors[]
    Writers?: any;           // TODO Type Writers[]
    Director?: Person;          // TODO Type Director
    Genres?: Genre[];            // TODO Type Genres[]

}
