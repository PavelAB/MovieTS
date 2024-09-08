import { ErrorResponse } from "../../types/Error";
import { User } from "../../types/User";

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL


/**
 * Handle user login in application
 * 
 * @param {Partial<User>} userData - Object containing `login` and `password`.
 * @returns {Promise<Movie>} Resolves with the connected User object.
 * @throws {Error} If userData is incomplete or login fails.
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