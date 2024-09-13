import { ErrorResponse } from "../../types/Error"
import { Movie } from "../../types/Movie"
import { SuccessResponse } from "../../types/SuccesResponse"
import { MovieSchema } from "../../utils/zodValidators"

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL

/**
 * Fetches a list of movies from th API.
 * 
 * @param {number} page- The page number for pagination.
 * @param {number} limit - The number of movies per page for pagination.
 * @returns {Promise<SuccessResponse<Movie[]>>} A promise that resolves to an Object SuccessResponse<T>.
 * @throws {Error} If the fetch fails or return an error response.
 */
export const fetchMovies = async (page: number, limit: number): Promise<SuccessResponse<Movie[]>> => {
 
    const url: string = MOVIE_URL + `/movies?page=${page}&limit=${limit}`
    const response = await fetch(url)

    const result: SuccessResponse<Movie[]> | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Failed to fetch movies. Error: ${errorResponse.msg}`)
    }

    const succesResponse: SuccessResponse<Movie[]> = result as SuccessResponse<Movie[]>

    return succesResponse
}


/**
 * Fetches a movie by its ID.
 * 
 * @param {string} movieID - The ID of the movie to fetch.
 * @returns {Promise<Movie>} A promise that resolves to a Movie object containing movie details.
 * @throws {Error} If no movie ID is provided or if the fetch fails.
 */

export const fetchMovieByID = async (movieID: string): Promise<Movie> => {

    // TODO Needs to be refactored.

    const ID_Number: number = Number(movieID)

    if(!movieID)
        throw new Error(`No ID provided to fetch movie`)

    if(!ID_Number)
        throw new Error(`ID provided is not a number`)

    const url: string = MOVIE_URL+"/movies/"+movieID
    const response = await fetch(url)

    const result: Movie | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Failed to fetch movies. Error: ${errorResponse.msg}`)
    }

    const movie: Movie = MovieSchema.parse(result as Movie)

    return movie
}

