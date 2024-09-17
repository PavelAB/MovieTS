import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieByID } from "../../../hooks/useMovie";
import LoaderElement from "../../../components/LoaderSpin/LoaderElement";


const DetailRow: React.FC<{ desription: string, definition: string[] }> = ({ desription, definition }) => {
    return (
        <div className="px-4 py-6 flex justify-between items-center gap-4">
            <div className="text-sm font-medium leading-6 text-gray-900">
                {desription}
            </div>
            <div className="text-sm leading-6 text-gray-700">
                {definition.map((name) => name)}
            </div>
        </div>
    )
}



const MovieDetailsPage: React.FC = () => {

    const { ID_Movie } = useParams()
    const shouldFetch: boolean = ID_Movie ? true : false

    // Used to dynamically display the number of elements based on the screen size.
    const [visibleElementsCount, setVisibleElementsCount] = useState<number>(1)


    const { data: movie, isLoading: isLoadingMovie } = useMovieByID(ID_Movie, shouldFetch)


    useEffect(() => {
        // Returns the number of elements to display based on the screen size.
        const updateNomberOfElementDisplayed = (): void => {
            if(window.innerWidth > 1024) setVisibleElementsCount(3)
            else if(window.innerWidth < 1024 && window.innerWidth > 768 ) setVisibleElementsCount(2)
            else setVisibleElementsCount(1)
        }

        updateNomberOfElementDisplayed()
        window.addEventListener('resize', updateNomberOfElementDisplayed)

        return () => window.removeEventListener('resize', updateNomberOfElementDisplayed)
    })

    if (isLoadingMovie) {
        return <LoaderElement />
    }

    // TODO Create a reusable component that will display a general error for missing data.
    if (!movie) {
        return <h1>No movie</h1>
    }


    console.log("movie", movie)

    return (
        <div className="col-span-12 flex flex-col min-h-screen border border-red-500 justify-center items-center">
            <div className="text-center">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                    {movie.title}
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    Movie description.
                </p>
            </div>
            <div className="mt-6 max-w-[80%] border border-black flex flex-col gap-4 items-center justify-center sm:flex-row">
                <img
                    src={`http://localhost:8080${movie.cover}`}
                    className="h-96 w-72 object-contain"
                />
                <div className="divide-y divide-gray-100 flex flex-col border border-blue-600 justify-between ">
                    <div className="px-4 py-6 flex items-center gap-4" >
                        <div className="text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                            Director :
                        </div>
                        <div className="text-sm leading-6 text-gray-700 flex justify-start">
                            {
                                movie.Director ? <span> {movie.Director?.first_name} {movie.Director?.last_name} </span>
                                :
                                <span>No information</span>
                            }
                        </div>
                    </div>
                    <div className="px-4 py-6 flex items-center gap-4">
                        <div className="text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                            Actors :
                        </div>
                        <div className="text-sm leading-6 text-gray-700 flex justify-start gap-1 whitespace-nowrap">
                            {
                                movie.Actors && movie.Actors ? movie.Actors.slice(0, visibleElementsCount).map((actor, index) => {
                                    return <span key={`actor${index}`}>
                                        {actor.first_name} {actor.last_name} </span>
                                })
                                :
                                <span>No information</span>
                            }
                            { movie.Actors && movie.Actors.length >= 2 && <span>...</span> }
                        </div>
                    </div>
                    <div className="px-4 py-6 flex items-center gap-4">
                        <div className="text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                            Genres :
                        </div>
                        <div className="text-sm leading-6 text-gray-700 flex justify-start gap-1 whitespace-nowrap">
                            {
                                movie.Genres && movie.Genres.length > 0 ? movie.Genres.slice(0, visibleElementsCount).map((genre, index) => {
                                    return <span key={`genre${index}`}>
                                        {genre.name_genre}</span>
                                })
                                :
                                <span>No information</span>
                            }
                            { movie.Genres && movie.Genres.length >= 2 && <span>...</span> }
                        </div>
                    </div>
                    <div className="px-4 py-6 flex items-center gap-4">
                        <div className="text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                            Companies :
                        </div>
                        <div className="text-sm leading-6 text-gray-700 flex justify-start gap-1 whitespace-nowrap">
                            {
                                movie.Companies &&  movie.Companies ? movie.Companies.slice(0, visibleElementsCount).map((company, index) => {
                                    return <span key={`company${index}`}>
                                        {company.name_company} </span>
                                })
                                :
                                <span>No information</span>
                            }
                            { movie.Companies && movie.Companies.length >= 2 && <span>...</span> }
                        </div>
                    </div>
                    <div className="px-4 py-6 flex items-center gap-4">
                        <div className="text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                            Awards :
                        </div>
                        <div className="text-sm leading-6 text-gray-700 flex justify-start gap-1 whitespace-nowrap">
                            {
                                movie.Awards_Movies && movie.Awards_Movies?.length > 0 ? movie.Awards_Movies.slice(0, visibleElementsCount).map((award, index) => {
                                    return <span key={`award${index}`}>
                                        {award.name_award} </span>
                                })
                                :
                                <span>No information</span>
                            }
                            { movie.Awards_Movies && movie.Awards_Movies.length >= 2 && <span>...</span> }
                        </div>
                    </div>
                    <div className="px-4 py-6 flex items-center gap-4">
                        <div className="text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                            Release Date :
                        </div>
                        <div className="text-sm leading-6 text-gray-700 flex justify-start gap-1 whitespace-nowrap">                            
                            {movie.release_date && new Date(movie.release_date).toLocaleDateString('fr-BE',{day: 'numeric', month: 'long', year: 'numeric'})}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default MovieDetailsPage