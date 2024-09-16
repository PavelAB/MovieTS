import React from "react";
import { useParams } from "react-router-dom";
import { useMovieByID } from "../../../hooks/useMovie";
import LoaderElement from "../../../components/LoaderSpin/LoaderElement";


const DetailRow: React.FC<{ desription: string, definition: string }> = ({desription, definition}) => {
    return (
        <div className="px-4 py-6 flex justify-between items-center gap-4">
            <div className="text-sm font-medium leading-6 text-gray-900">
                {desription}
            </div>
            <div className="text-sm leading-6 text-gray-700">
                {definition}
            </div>
        </div>
    )
}



const MovieDetailsPage: React.FC = () => {

    const { ID_Movie } = useParams()
    const shouldFetch: boolean = ID_Movie ? true : false


    const { data: movie, isLoading: isLoadingMovie } = useMovieByID(ID_Movie, shouldFetch)

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
            <div className="mt-6 max-w-[80%] border border-black flex flex-row gap-4 items-center justify-center">
                <img
                    src={`http://localhost:8080${movie.cover}`}
                    className="h-96 w-72 object-contain"
                />
                <div className="divide-y divide-gray-100 flex flex-col border border-blue-600 justify-between ">
                    <DetailRow desription="Director" definition={movie.Director ? movie.Director.first_name : "No information"} />
                    <DetailRow desription="Actors" definition={movie.Director ? movie.Director.first_name : "No information"} />
                    <DetailRow desription="Genres" definition={movie.Director ? movie.Director.first_name : "No information"} />
                    <DetailRow desription="Companies" definition={movie.Director ? movie.Director.first_name : "No information"} />
                    <DetailRow desription="Awards" definition={movie.Director ? movie.Director.first_name : "No information"} />
                    <DetailRow desription="Release Date" definition={movie.Director ? movie.Director.first_name : "No information"} />


                </div>

            </div>
        </div>
    )
}
export default MovieDetailsPage