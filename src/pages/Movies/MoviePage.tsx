import React from "react"
import { useMovieByID } from "../../hooks/useMovie"



const MoviePage: React.FC = () => {

    const { data: dataMovie, isError, error} = useMovieByID("15")



    if(isError)
        console.log("Error: "+ error.message)

    console.log(dataMovie)

    return (
        <>
            <h1>Movie Page</h1>
        </>
    )
}
export default MoviePage