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
    Companies?: any;         // TODO Type Companies[]
    Awards_Movies?: any;      // TODO Type Award_Movies[]
    Actors: Person[];            // TODO Type Actors[]
    Writers?: any;           // TODO Type Writers[]
    Director?: Person;          // TODO Type Director
    Genres?: any;            // TODO Type Genres[]

}
