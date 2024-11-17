import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchMovieByID, fetchMovieByPersonID, fetchMoviesByTitle } from "../api/movie/ApiMovie"
import { Movie } from "../types/Movie"
import { SuccessResponse } from "../types/SuccesResponse"




/**
 * Custom React hook to fetch a list of movies.
 *
 * @param {number} [page=1] - The page number for pagination (default is 1).
 * @param {number} [limit=10] - The number of movies per page for pagination (default is 10).
 * @param {string} [searchTitle = <empty string>] - The researched title (default is empty string).
 * @returns {UseQueryResult<SuccessResponse<Movie[]>, Error>} An object containing the query status fetched Obejct contains data, and error information.
 */
export const useMoviesByTitle = (page: number = 1, limit: number = 10, searchTitle: string = ""): UseQueryResult<SuccessResponse<Movie[]>, Error> => {
    return useQuery<SuccessResponse<Movie[]>, Error>({
        queryKey: ['allMovies', page, limit, searchTitle],
        queryFn: () => fetchMoviesByTitle(page, limit, searchTitle),
        placeholderData: (previousData) => previousData,
    })
}




/**
 * Custom React hook to fetch movie details by movie ID.
 *
 * @param {string} movieID - The ID of the movie to fetch.
 * @param {boolean} shouldFetch - A boolean indicating whether the movie should be fetched or not.
 * @returns {UseQueryResult<Movie, Error>} An object containing the query status fetched data, and error information.
 */

export const useMovieByID = (movieID: string | undefined, shouldFetch: boolean): UseQueryResult<Movie, Error> => {

    // TODO Needs to be refactored.
    
    if(!movieID)
        throw new Error(`No ID provided to fetch movie`)
    
    const ID_Number: number = Number(movieID)

    if(!ID_Number)
        throw new Error(`ID provided is not a number`)


    return useQuery<Movie, Error>({
        queryKey: ['movies', ID_Number], 
        queryFn: () => fetchMovieByID(ID_Number),
        enabled: shouldFetch
    })
}



/**
 * Custom React hook to fetch a list of movies associated with a specific person based on the provided `ID_Person`.
 *
 * @param {number} ID_Person - The ID of the person whose movies are to be fetched.
 * @param {boolean} [shouldFetch = true] - A boolean indicating whether the movies should be fetched (default is true).
 * @returns {UseQueryResult<SuccessResponse<Movie[]> , Error>}  An object containing the query status and fetched data.
 * @throws {Error} If no `ID_Person` is provided or if an error occurs during the fetch operation. 
 */
export const useMoviesByPersonID = (ID_Person: number, shouldFetch: boolean = true): UseQueryResult<SuccessResponse<Movie[]>, Error> => {
    
    if(!ID_Person){
        shouldFetch = false
        throw new Error(`No ID provided to fetch movie`)
    }    
    
    return useQuery<SuccessResponse<Movie[]>, Error>({
        queryKey: ['moviesByPersonID', ID_Person], 
        queryFn: () => fetchMovieByPersonID(ID_Person),
        enabled: shouldFetch
    })
}