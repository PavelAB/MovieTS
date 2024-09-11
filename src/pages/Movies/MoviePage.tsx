import React from "react"
import { useAllMovies } from "../../hooks/useMovie"
import LoaderElement from "../../components/LoaderSpin/LoaderElement"
import { Movie } from "../../types/Movie"
import MovieCard from "../../components/MovieCard/MovieCard"




const MoviePage: React.FC = () => {

    const {data: AllMovies, isLoading: isLoadingAllMovies} = useAllMovies()

    if(isLoadingAllMovies && !AllMovies){
        return <LoaderElement />
    }




    return (
        <div className="col-span-12 flex flex-col min-h-screen border border-red-600">
            <div className="flex-grow-[1] h-[33vh] my-5 border border-green-600 flex flex-col items-center justify-center gap-4">
                <h1 className="text-center">Movie Page</h1>
                <div className="border border-red-700 h-10 w-full text-center">
                    Search Bar
                </div>
            </div>
            <div className="flex-grow-[2] grid grid-cols-1 border border-blue-800 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {
                    AllMovies && AllMovies.map((movie: Movie) => {
                        return <MovieCard key={movie.ID_Movie} movie={movie} />
                        
                    } )
                }
            </div>
        </div>
    )
}
export default MoviePage