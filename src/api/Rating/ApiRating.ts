import { ErrorResponse } from "../../types/Error";
import { Rating } from "../../types/Rating";
import { SuccessResponse } from "../../types/SuccesResponse";

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL

/**
 * Fetches a unique rating for a given movie and user, based on the provided `ID_Movie` and `ID_User`.
 * 
 * @param {number} ID_Movie - The ID of the movie.
 * @param {number} ID_User - The ID of the connected User.
 * @param {string} token - The Bearer token used for authorization in the request. 
 * @returns {Promise<Rating | null>} A promise that resolves to a Rating or null if no rating exists for the specified movie and user.
 * @throws {Error} If the fetch fails or return an error response.
 */

export const fetchRatingByMovieAndUser = async (ID_Movie: number, ID_User: number, token: string): Promise<Rating | null> => {


    const url: string = MOVIE_URL + `/ratings/params?ID_Movie=${ID_Movie}&ID_User=${ID_User}`
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
        
    })

    const result: SuccessResponse<Rating[]> | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Failled to fetch rating. Error: ${errorResponse.msg}`)
    }
    const successResponse: SuccessResponse<Rating[]> = result as SuccessResponse<Rating[]>

    const searchedRating: Rating = successResponse.data[0] 

    if(!searchedRating)
        return null

    return searchedRating

}