import React, { useState } from "react"
import { useMoviesByTitle } from "../../hooks/useMovie"
import LoaderElement from "../../components/LoaderSpin/LoaderElement"
import { Movie } from "../../types/Movie"
import MovieCard from "../../components/MovieCard/MovieCard"
import LimitButton from "../../components/Buttons/LimitButton"
import { useNavigate } from "react-router-dom"

// These values are used to define the limit for the number of films fetched per page.
const itemsPerPageOptions: number[] = [5, 10, 25]




const MoviePage: React.FC = () => {

    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(itemsPerPageOptions[0])
    const [searchTitle, setSearchTitle] = useState<string>("")
    const navigate = useNavigate()



    const { data: resultMovie, isLoading: isLoadingAllMovies } = useMoviesByTitle(page, limit, searchTitle)


    const updateLimit = (newLimit: number): void => {
        setLimit(newLimit)
        setPage(1)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setSearchTitle((event.currentTarget.elements.namedItem("search-input") as HTMLInputElement).value)
    }


    if (isLoadingAllMovies) {
        return <LoaderElement />
    }

    // TODO Create a reusable component that will display a general error for missing data.
    if(!resultMovie){ 
        return <h1>No movie</h1>
    }

    console.log("result", resultMovie)



    return (
        <div className="col-span-12 flex flex-col min-h-screen border border-red-600">
            <div className="flex-grow-[1] h-[33vh] my-5 border border-green-600 flex flex-col items-center justify-center gap-4">
                <h1 className="text-center">
                    Movie Page
                </h1>
                <div className="text-center min-w-[80%] mx-auto">
                    <form onSubmit={handleSubmit}>
                        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input 
                                type="search" 
                                id="default-search" 
                                name="search-input" 
                                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400" 
                                placeholder="Search movies..." />
                            <button 
                                type="submit" 
                                className=" absolute end-2.5 bottom-2.5 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 ">
                                    Search
                            </button>
                        </div>
                    </form>

                </div>
            </div>
            <div className=" flex gap-2 items-center justify-end mr-5">
                {
                    itemsPerPageOptions.map((limitOption: number) => 
                        <LimitButton
                            key={`LimitButton_${limitOption}`}
                            limit={limitOption}
                            isLimit={limit}
                            setPage={() => updateLimit(limitOption)} />
                    )
                }
            </div>
            <div className="flex-grow-[2] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {
                    resultMovie.data.length !== 0 ? resultMovie.data.map((movie: Movie) => {
                        return <MovieCard key={movie.ID_Movie} movie={movie} onDetails={(ID_Movie) => {
                            navigate(`/movie/${ID_Movie}`)
                        }}/>

                    }) :
                    <h1 className="col-span-full text-center mx-auto my-auto">
                        No movies matching your search were found. Please try again.
                    </h1>
                }
            </div>
            <div className="flex justify-center gap-4 p-3 items-center">
                <button
                    className="px-3 h-8 min-w-[78px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    disabled={page > 1 ? false : true}
                    onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}>
                    Previous
                </button>
                <p>{page}</p>
                <button
                    className="px-3 h-8 min-w-[78px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    disabled={resultMovie.totalPages > page ? false : true}
                    onClick={() => setPage((prevPage) => prevPage + 1)}>
                    Next
                </button>
            </div>
        </div>
    )
}
export default MoviePage