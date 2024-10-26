import { ErrorResponse } from "../../types/Error";
import { User } from "../../types/User";

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL


/**
 * Handles user login in the application.
 * 
 * @param {Partial<User>} userData - An Object containing `login` and `password`.
 * @returns {Promise<User>} - A promise that resolves with the connected User object.
 * @throws {Error} - If userData is incomplete or login fails.
 */

export const login = async (userData: Partial<User>): Promise<User> => {
    

    if(!userData.login || !userData.password)
        throw new Error(`Incorrect or incomplete data for login`)

    const url: string = MOVIE_URL+"/auth/login"
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    })

    
    const result: User | ErrorResponse = await response.json()

    if (!response.ok) {
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Error during the POST request: ${errorResponse.msg}`)
    }

    const user: User = result as User

    return user
}


/**
 * Handles user sign-up in the application.
 * 
 * @param {Partial<User>} userData - An object containing the information for sign-up.
 * @returns {Promise<User>} - A promise that resolves with the connected User object.
 * @throws {Error} - If userData is incomplete or sign-up fails.
 */

export const signUp = async (userData: Partial<User>): Promise<User> => {

    if(!userData)
        throw new Error(`An error has occurred, no data received. Please try again.`)

    const url: string = MOVIE_URL + "/auth/register"
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)

    })

    const result: User | ErrorResponse = await response.json()

    if(!response){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Error during the POST request: ${errorResponse.msg}`)
    } 

    const user: User = result as User

    return user
}