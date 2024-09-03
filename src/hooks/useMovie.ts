import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchMovieByID } from "../api/Movie/ApiMovie"
import { Movie } from "../types/typeMovie"


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