import React from "react";
import { Movie } from "../../types/Movie";
import { Rating } from "../../types/Rating";

const MovieCard: React.FC<{movie: Movie}> = ({movie}) => {


    return (
        <div key={movie.ID_Movie} className="rounded-lg p-4 bg-black/5 border-2 border-solid border-black/5 transition-all hover:bg-black/10 flex flex-col items-stretch justify-start gap-2">
            <h2 className="font-mono font-bold text-lg">{movie.title}</h2>
            <p className="text-xs">Director : {movie.Director ? `${movie.Director.first_name} ${movie.Director.last_name}`  : 'No Information'}</p>
            <p className="flex justify-start">
                <span className="mr-3">{movie.Comments ? "Comments : " + movie.Comments.length : 0}</span>
                <span>Rate : {(movie.Ratings && movie.Ratings.length > 0) ? movie.Ratings.reduce((acc: number, currVal: Rating) => acc + currVal.rate_picture, 0) / movie.Ratings.length : 'N/A'}</span>
            </p>
        </div>
    )
}
export default MovieCard