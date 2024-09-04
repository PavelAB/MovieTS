export interface User {
    ID_User: number;
    first_name: string;
    last_name: string;
    birth_date: string | Date;
    login: string;
    email: string;
    // TODO add Ratings and Comments but not sure
}