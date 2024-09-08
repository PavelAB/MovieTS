import { Person } from "./Person";

export interface AwardPersonne {
    
    ID_Award_Personne: number;
    type_award: string;
    name_award: string;
    year_award: string;

    Personne: Partial<Person>;
    
}