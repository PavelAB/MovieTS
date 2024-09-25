import { ErrorResponse } from "../../types/Error";
import { Rating } from "../../types/Rating";
import { SuccessResponse, SuccessResponseMsg } from "../../types/SuccesResponse";

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


/**
 * Function to create or update a rating for a specific movie by the connected user. Primarily used in the CreateRank.tsx component.
 * 
 * @param {Partial<Rating>} ratingData - A partial `Rating` object containing the data to create or update a rating.
 * @param {string} token - The Bearer token used for authorization in the request. 
 * 
 * @returns {Promise<SuccessResponseMsg>} A promise that resolves to a 'SuccessResponseMsg' containing information about whether the rating was created or updated.
 * 
 * @throws {Error} If the creation or update fails, throws an error with a descriptive message.
 */
export const createRating = async (ratingData: Partial<Rating>, token: string): Promise<SuccessResponseMsg> => {


    const url: string = MOVIE_URL+"/ratings"
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ratingData)
    })

    const result: SuccessResponseMsg | ErrorResponse = await response.json()

    if(!response.ok) {
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Error during the POST request: ${errorResponse.msg}`)
    }

    const success: SuccessResponseMsg = result as SuccessResponseMsg

    return success
}