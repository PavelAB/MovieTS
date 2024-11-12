import { ErrorResponse } from "../../types/Error"
import { Person } from "../../types/Person"
import { SuccessResponse } from "../../types/SuccesResponse"

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL



/**
 * Fetches a list of random persons based on the provided `limit` and `job`.
 * 
 * @param {number} limit - The number of persons to be fetched.
 * @param {number} job - The job type filter, which can be "Actor", "Director", or "Writer".
 * @param {string} token - The Bearer token used for authorization in the request. 
 * @returns {SuccessResponse<Person[]>} - A promise that resolves to a `SuccessResponse` containing an array of persons based on the provided `limit` and `job`.
 * 
 * @throws {Error} If the fetch operation fails or the response contains an error.
 */
export const fetchRandomPersons = async (limit: number, job: string, token: string): Promise<SuccessResponse<Person[]>> => {
    const url: string = MOVIE_URL + `/personnes/random?limit=${limit}&job=${job}`
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const result: SuccessResponse<Person[]> | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Failled to fetch comments. Error: ${errorResponse.msg}`)
    }

    const successResponse: SuccessResponse<Person[]> = result as SuccessResponse<Person[]>
    return successResponse
}