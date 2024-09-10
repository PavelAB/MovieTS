import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchMovieByID, fetchMovies } from "../api/Movie/ApiMovie"
import { Movie } from "../types/Movie"



/**
 * Custom React hook to fetch a list of movies.
 *
 * @returns {UseQueryResult<Movie[], Error>} An object containing the query status fetched data, and error information.
 */
export const useAllMovies = (): UseQueryResult<Movie[], Error> => {
    return useQuery<Movie[], Error>({
        queryKey: ['allMovies'],
        queryFn: () => fetchMovies()
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