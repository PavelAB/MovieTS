import React from "react";
import { useParams } from "react-router-dom";
import { useMovieByID } from "../../../hooks/useMovie";
import LoaderElement from "../../../components/LoaderSpin/LoaderElement";


const MovieDetailsPage: React.FC = () => {

    const {ID_Movie} = useParams()
    const shouldFetch: boolean = ID_Movie ? true : false


    const {data: movie, isLoading: isLoadingMovie} = useMovieByID(ID_Movie, shouldFetch)

    if (isLoadingMovie) {
        return <LoaderElement />
    }

    // TODO Create a reusable component that will display a general error for missing data.
    if(!movie){ 
        return <h1>No movie</h1>
    }
    

    console.log("movie", movie.ID_Movie)

    return (
        <h1>MovieDetailsPage {ID_Movie}</h1>
    )
}
export default MovieDetailsPage