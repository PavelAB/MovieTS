import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Comment } from "../types/Comment"
import { fetchCommentsByMovie } from "../api/Comment/ApiComment"
import { SuccessResponse } from "../types/SuccesResponse"

/**
 * Custom React hook to fetch a list of comments based on the provided movie ID.
 *
 * @param {number} ID_Movie - The ID of the movie.
 * @param {string} token - The Bearer token used for authorization in the request.
 * @param {boolean} [shouldFetch = true] - A boolean indicating whether the comments should be fetched or not (default is true).
 * @returns {UseQueryResult<SuccessResponse<Comment[]> , Error>}  An object containing the query status and fetched data, if comments exist for the specified movie.
 * @throws {Error} If an error occurs during the fetch operation. 
 */
export const useCommentByMovie = (ID_Movie: number, token: string, shouldFetch: boolean = true): UseQueryResult<SuccessResponse<Comment[]>, Error> => {
    
    if (!ID_Movie || !token) {
        shouldFetch = false
    }

    return useQuery<SuccessResponse<Comment[]>, Error>({
        queryKey: ['commentByMovie', ID_Movie, token],
        queryFn: () => fetchCommentsByMovie(ID_Movie, token),
        enabled: shouldFetch
    })
}