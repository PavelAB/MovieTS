import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchMovieByID, fetchMovies } from "../api/Movie/ApiMovie"
import { Movie } from "../types/Movie"
import { SuccessResponse } from "../types/SuccesResponse"



/**
 * Custom React hook to fetch a list of movies.
 *
 * @param {number} [page=1] - The page number for pagination (default is 1).
 * @param {number} [limit=10] - The number of movies per page for pagination (default is 10).
 * @returns {UseQueryResult<SuccessResponse<Movie[]>, Error>} An object containing the query status fetched Obejct contains data, and error information.
 */
export const useAllMovies = (page: number = 1, limit: number = 10): UseQueryResult<SuccessResponse<Movie[]>, Error> => {
    return useQuery<SuccessResponse<Movie[]>, Error>({
        queryKey: ['allMovies', page, limit],
        queryFn: () => fetchMovies(page, limit),
        placeholderData: (previousData) => previousData,
    })
}




/**
 * Custom React hook to fetch movie details by movie ID.
 *
 * @param {string} movieID - The ID of the movie to fetch.
 * @returns {UseQueryResult<Movie, Error>} An object containing the query status fetched data, and error information.
 */

export const useMovieByID = (movieID: string): UseQueryResult<Movie, Error> => {
    return useQuery<Movie, Error>({
        queryKey: ['movies', movieID], 
        queryFn: () => fetchMovieByID(movieID)
    })
}