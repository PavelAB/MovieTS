import { ErrorResponse } from "../../types/Error"
import { Movie } from "../../types/Movie"
import { SuccesResponse } from "../../types/SuccesResponse"
import { MoviesArraySchema, MovieSchema } from "../../utils/zodValidators"

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL

/**
 * Fetches a list of movies from th API.
 * 
 * @returns {Promise<Movie[]>} A promise that resolves to an array Movie objects.
 * @throws {Error} If the fetch fails or return an error response.
 */
export const fetchMovies = async (): Promise<Movie[]> => {

    const url: string = MOVIE_URL + "/movies"
    const response = await fetch(url)

    const result: SuccesResponse<Movie[]> | ErrorResponse = await response.json()

    if(!response.ok){
        const errorResponse: ErrorResponse = result as ErrorResponse
        throw new Error(`Failed to fetch movies. Error: ${errorResponse.msg}`)
    }

    const succesResponse: SuccesResponse<Movie[]> = result as SuccesResponse<Movie[]>

    const movies: Movie[] = MoviesArraySchema.parse(succesResponse.values) 

    return movies
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

