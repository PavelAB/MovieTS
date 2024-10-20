import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query"
import { Comment, Like } from "../types/Comment"
import { create, createLike, fetchCommentsByMovie } from "../api/Comment/ApiComment"
import { SuccessResponse, SuccessResponseMsg } from "../types/SuccesResponse"

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

/**
 * Custom React hook to handle the creation or update of a like on a comment.
 *
 * @param {Like} likeData - Object containing the data to create or update a like on a comment.
 * @param {number} likeData.Comment - The ID of the comment being liked.
 * @param {number} likeData.User - The ID of the user liking the comment.
 * @param {string} token - The Bearer token used for authorization in the request.
 * 
 * @returns {UseMutationResult<SuccessResponseMsg, Error, void, unknown>} - A mutation result object that includes the mutate function for triggering the request.
 */
export const useNewLike = (likeData: Like, token: string):UseMutationResult<SuccessResponseMsg, Error, void, unknown> => {
    
    //TODO Create validation for received variables
    
    const mutation = useMutation({
        mutationFn: () => createLike(likeData, token)
    })

    return mutation
}

/**
 * Custom React hook to handle the creation a comment.
 *
 * @param {Partial<Comment>} commentData - An object containing the data to create a comment.
 * @param {number} data.Movie - The ID of the movie being commented on.
 * @param {number} data.User - The ID of the user creating the comment.
 * @param {string} data.body - The content of the comment.
 * @param {string} token - The Bearer token used for authorization in the request.
 * 
 * @returns {UseMutationResult<SuccessResponseMsg, Error, void, unknown>} - A mutation result object that includes the mutate function for triggering the request.
 */
export const useCreate = (commentData: Partial<Comment>, token: string): UseMutationResult<SuccessResponseMsg, Error, void, unknown> => {
    
    //TODO Create validation for received variables
    
    const mutation = useMutation({
        mutationFn: () => create(commentData, token)
    })

    return mutation
}