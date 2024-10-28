import { ErrorResponse } from "../../types/Error"
import { Movie } from "../../types/Movie"
import { SuccessResponse } from "../../types/SuccesResponse"
import { MovieSchema } from "../../utils/zodValidators"

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL

/**
 * Fetches a list of movies where the title contains 'searchTitle' from the API.
 * 
 * @param {number} page - The page number for pagination.
 * @param {number} limit - The number of movies per page for pagination.
 * @param {string} searchTitle - The title to search for.
 * @returns {Promise<SuccessResponse<Movie[]>>} A promise that resolves to a SuccessResponse object containing an array of movies.
 * @throws {Error} If the fetch fails or return an error response.
 */
export const fetchMoviesByTitle = async (page: number, limit: number, searchTitle: string): Promise<SuccessResponse<Movie[]>> => {

    const url: string = MOVIE_URL + `/movies/searchByTitle?page=${page}&limit=${limit}&searchString=${searchTitle}`
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
 * @param {number} ID_Movie - The ID of the movie to fetch.
 * @returns {Promise<Movie>} A promise that resolves to a Movie object containing movie details.
 * @throws {Error} If no movie ID is provided or if the fetch fails.
 */

export const fetchMovieByID = async (ID_Movie: number): Promise<Movie> => {    

    const url: string = MOVIE_URL+"/movies/" + ID_Movie
    const response = await fetch(url)

    const result: Movie | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Failed to fetch movies. Error: ${errorResponse.msg}`)
    }

    const movie: Movie = MovieSchema.parse(result as Movie)

    return movie
}

