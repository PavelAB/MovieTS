

export interface Person {
    ID_Personne: number;
    first_name: string;
    last_name: string;
    birth_date?: string | Date;
    job?: string;                      // TODO change this
    Awards_Personnes?: any;         // TODO Type Awards_Personnes[]
    ActedMovies?: any;              // TODO change this
    WrittenMovies?: any;            // TODO change this
    isDerector?: any;                // TODO change this
}