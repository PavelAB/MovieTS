import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Rating } from "../types/Rating";
import { fetchRatingByMovieAndUser } from "../api/Rating/ApiRating";




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
        throw new Error("ID_Movie, ID_User, and token are required.");
    }
    
    return useQuery<Rating | null, Error>({
        queryKey: ['ratingByMovieAndUser', ID_Movie, ID_User, token],
        queryFn: () => fetchRatingByMovieAndUser(ID_Movie, ID_User, token),
        enabled: shouldFetch
    })
}