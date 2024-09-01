import { useQuery } from "@tanstack/react-query"
import { fetchMovieByID } from "../api/Movie/movie"


/**
 * Custom React hook to fetch movie details by movie ID.
 *
 * @param {string} movieID - The ID of the movie to fetch.
 * @returns {Object} An object containing the query status and data.
 */
export const useMovieByID = (movieID: string): object => {
    return useQuery({
        queryKey: ['movies', movieID], 
        queryFn: () => fetchMovieByID(movieID)
    })
}