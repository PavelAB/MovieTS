import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { Rating } from "../types/Rating";
import { createRating, fetchRatingByMovieAndUser } from "../api/Rating/ApiRating";
import { SuccessResponseMsg } from "../types/SuccesResponse";




/**
 * Custom React hook to fetch a rating based on the provided movie and user IDs.
 *
 * @param {number} ID_Movie - The ID of the movie.
 * @param {number} ID_User - The ID of the connected User.
 * @param {string} token - The Bearer token used for authorization in the request.
 * @param {boolean} [shouldFetch = true] - A boolean indicating whether the rating should be fetched or not (default is true).
 * @returns {UseQueryResult<Rating | null, Error>} An Rating if it exists for the specified movie and user, or null if it doesn't.
 * @throws {Error} If an error occurs during the fetch operation. 
 */
export const useRatingByMovieAndUser = (ID_Movie: number, ID_User: number, token: string, shouldFetch: boolean = true): UseQueryResult<Rating | null, Error> => {
    
    if (!ID_Movie || !ID_User || !token) {
        shouldFetch = false
    }

    return useQuery<Rating | null, Error>({
        queryKey: ['ratingByMovieAndUser', ID_Movie, ID_User, token],
        queryFn: () => fetchRatingByMovieAndUser(ID_Movie, ID_User, token),
        enabled: shouldFetch
    })
}

/**
 * Custom React hook to handle the creation or update of a rating.
 *
 * @param {Partial<Rating>} ratingData - A partial `Rating` object containing the data to create or update a rating.
 * @param {string} token - The Bearer token used for authorization in the request.
 * 
 * @returns {UseMutationResult<SuccessResponseMsg, Error, void, unknown>} - A mutation result object that includes the mutate function for triggering the request.
 */
export const useNewRating = (ratingData: Partial<Rating>, token: string):UseMutationResult<SuccessResponseMsg, Error, void, unknown> => {
    const mutation = useMutation({
        mutationFn: () => createRating(ratingData, token)
    })

    return mutation
}