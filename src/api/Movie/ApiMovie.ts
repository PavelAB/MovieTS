import { Movie } from "../../types/typeMovie"

const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL

/**
 * Fetches a movie by its ID.
 * 
 * @param {string} movieID - The ID of the movie to fetch.
 * @returns {Promise<Movie>} A promise that resolves to a Movie object containing movie details.
 * @throws {Error} If no movie ID is provided or if the fetch fails.
 */

export const fetchMovieByID = async (movieID: string): Promise<Movie> => {

    const ID_Number: number = Number(movieID)

    if(!movieID)
        throw new Error(`No ID provided to fetch movie`)

    if(!ID_Number)
        throw new Error(`ID provided is not a number`)

    const url: string = MOVIE_URL+"/movies/"+movieID
    const response = await fetch(url)

    if(!response.ok){
        throw new Error(`Failed to fetch moive with id = ${movieID}`)
    }

    const movie: Movie = await response.json()

    return movie
}

