import { Comment, Like } from "../../types/Comment";
import { ErrorResponse } from "../../types/Error";
import { SuccessResponse, SuccessResponseMsg } from "../../types/SuccesResponse";

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL


/**
 * Fetches a list of comments for a given movie, based on the provided `ID_Movie`.
 * 
 * @param {number} ID_Movie - The ID of the movie for which the comments are being fetched.
 * @param {string} token - The Bearer token used for authorization in the request. 
 * @returns {SuccessResponse<Comment[]>} A promise that resolves to a `SuccessResponse` containing an array of comments for the provided `ID_Movie`.
 * @throws {Error} If the fetch operation fails or the response contains an error.
 */
export const fetchCommentsByMovie = async (ID_Movie: number, token: string): Promise<SuccessResponse<Comment[]>> => {

    const url: string = MOVIE_URL + `/comments/params?ID_Movie=${ID_Movie}`
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    const result: SuccessResponse<Comment[]> | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Failled to fetch comments. Error: ${errorResponse.msg}`)
    }

    const successResponse: SuccessResponse<Comment[]> = result as SuccessResponse<Comment[]>

    return successResponse
}

/**
 * Function to create or update a like on a comment.
 * 
 * @param {Like} likeData - An object containing the data to create or update a like on a comment.
 * @param {number} likeData.Comment - The ID of the comment being liked.
 * @param {number} likeData.User - The ID of the user liking the comment.
 * @param {string} token - The Bearer token used for authorization in the request. 
 * 
 * @returns {Promise<SuccessResponseMsg>} A promise that resolves to a 'SuccessResponseMsg' containing information about whether the like was created or updated.
 * 
 * @throws {Error} If the creation or update fails, throws an error with a descriptive message.
 */
export const createLike = async (likeData: Like, token: string): Promise<SuccessResponseMsg> => {

    const url: string = MOVIE_URL+"/comments/like"
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(likeData)
    })
    const result: SuccessResponseMsg | ErrorResponse = await response.json()

    if(!response.ok) {
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Error during the POST request: ${errorResponse.msg}`)
    }

    const success: SuccessResponseMsg = result as SuccessResponseMsg

    return success
}

/**
 * Function to create a comment.
 * 
 * @param {Partial<Comment>} data - An object containing the data to create a comment.
 * @param {number} data.Movie - The ID of the movie being commented on.
 * @param {number} data.User - The ID of the user creating the comment.
 * @param {string} data.body - The content of the comment.
 * @param {string} token - The Bearer token used for authorization in the request. 
 * 
 * @returns {Promise<SuccessResponseMsg>} A promise that resolves to a 'SuccessResponseMsg' containing information about whether the comment was created.
 * 
 * @throws {Error} If the creation or update fails, throws an error with a descriptive message.
 */
export const create = async (data: Partial<Comment>, token: string): Promise<SuccessResponseMsg> => {

    const url: string = MOVIE_URL+`/comments`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result: SuccessResponseMsg | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Error during the POST request: ${errorResponse.msg}`)
    }

    const success: SuccessResponseMsg = result as SuccessResponseMsg

    return success
}