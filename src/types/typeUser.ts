export interface User {
    ID_User: string;
    first_name: string;
    last_name: string;
    birth_date: string | Date;
    login: string;
    email: string;
    password?: string;
    role?: string;
    token?: string;
    // TODO add Ratings and Comments but not sure
}