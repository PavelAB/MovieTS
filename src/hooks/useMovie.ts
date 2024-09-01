import { useQuery } from "@tanstack/react-query"
import { fetchMovieByID } from "../api/Movie/movie"

export const useMovie = (movieID: string) => {
    return useQuery({
        queryKey: ['movies', movieID], 
        queryFn: () => fetchMovieByID(movieID)
    })
}