
const MOVIE_URL: string = import.meta.env.VITE__MOVIES_API_URL

export const fetchMovieByID = async (movieID: string) => {

    if(!movieID)
        return "Error: movie.ts -> NO ID"


    const url: string = MOVIE_URL+"/movies/"+movieID
    const response = await fetch(url)

    if(!response.ok){
        throw new Error(`Failed to fetch moive with id = ${movieID}`)
    }

    return response.json()
}

