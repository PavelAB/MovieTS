import { Comment } from "../../types/Comment";
import { ErrorResponse } from "../../types/Error";
import { SuccessResponse } from "../../types/SuccesResponse";

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL

export const fetchCommentsByMovie = async (ID_Movie: number, token: string): Promise<SuccessResponse<Comment[]>> => {

    //TODO Backend route not implemented
    const url: string = MOVIE_URL + `${ID_Movie}`
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