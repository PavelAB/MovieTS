import React, { useState } from "react"
import { useAllMovies } from "../../hooks/useMovie"
import LoaderElement from "../../components/LoaderSpin/LoaderElement"
import { Movie } from "../../types/Movie"
import MovieCard from "../../components/MovieCard/MovieCard"


const itemsPerPageOptions: number[] = [5,10,25]

const MoviePage: React.FC = () => {

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(itemsPerPageOptions[0])
        

    const {data: resultMovie, isLoading: isLoadingAllMovies} = useAllMovies(page, limit)

       
    
    if(isLoadingAllMovies && !resultMovie){
        return <LoaderElement />
    }

    console.log("result", resultMovie)


    return (
        <div className="col-span-12 flex flex-col min-h-screen border border-red-600">
            <div className="flex-grow-[1] h-[33vh] my-5 border border-green-600 flex flex-col items-center justify-center gap-4">
                <h1 className="text-center">Movie Page</h1>
                <div className="border border-red-700 h-10 w-full text-center">
                    Search Bar
                </div>
            </div>
            <div className=" flex gap-2 items-center justify-end mr-5">
                <button
                    className="px-3 h-8 min-w-[42px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" 
                    onClick={() => {
                            setLimit(itemsPerPageOptions[0])
                            setPage(1)
                            }}>
                        {itemsPerPageOptions[0]}
                </button>
                <button 
                    className="px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" 
                    onClick={() => {
                            setLimit(itemsPerPageOptions[1])
                            setPage(1)
                            }}>
                        {itemsPerPageOptions[1]}
                </button>
                <button
                    className="px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"  
                    onClick={() => {
                            setLimit(itemsPerPageOptions[2])
                            setPage(1)
                            }}>
                        {itemsPerPageOptions[2]}
                </button>
            </div>
            <div className="flex-grow-[2] grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {
                    resultMovie?.data && resultMovie?.data.map((movie: Movie) => {
                        return <MovieCard key={movie.ID_Movie} movie={movie} />
                        
                    } )
                }
            </div>
            <div className="flex justify-center gap-4 p-3 items-center">
                <button 
                    className="px-3 h-8 min-w-[78px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    disabled={page > 1 ? false : true }
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>
                        Previous
                </button>
                <p>{page}</p>
                <button
                    className="px-3 h-8 min-w-[78px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    disabled={resultMovie!.totalPages > page ? false : true} 
                    onClick={() => setPage((prevPage) => prevPage + 1)}>
                        Next
                </button>
            </div>
        </div>
    )
}
export default MoviePage