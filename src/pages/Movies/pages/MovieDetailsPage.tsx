import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useMovieByID } from "../../../hooks/useMovie";
import LoaderElement from "../../../components/LoaderSpin/LoaderElement";
import { Person } from "../../../types/Person";
import { Genre } from "../../../types/Genre";
import { Company } from "../../../types/Company";
import { AwardMovie } from "../../../types/AwardMovie";
import { Comment, Like } from "../../../types/Comment";
import CommentCard from "../../../components/Comments/CommentCard";
import RadarDiagramForRank from "../../../components/Echarts/RadarDiagramForRanks";
import CreateRank from "../../../components/Echarts/CreateRank";
import { useCommentByMovie, useCreate, useNewLike } from "../../../hooks/useComment";
import { useUser } from "../../../context/UserContext";
import { SuccessResponseMsg } from "../../../types/SuccesResponse";
import { useQueryClient } from "@tanstack/react-query";
import InfoRow from "../../../components/MovieDetailRow/InfoRow";
import IconInfo from "../../../components/icons/IconInfo";



const MovieDetailsPage: React.FC = () => {

    const { ID_Movie } = useParams()
    const { user, showNotification } = useUser()
    const queryClient = useQueryClient()
    const shouldFetch: boolean = ID_Movie ? true : false

    // Used to dynamically display the number of elements based on the screen size.
    const [visibleElementsCount, setVisibleElementsCount] = useState<number>(1)
    // The state isRate is used to optionally display one of two components: true for Average Rate and false for User Rate.
    const [isRate, setIsRate] = useState<boolean>(true)
    const [likeData, setLikeData] = useState<Like>()
    const [commentData, setCommentData] = useState<Partial<Comment>>()
    const [newComment, setNewComment] = useState<string>('')



    const { data: movie, isLoading: isLoadingMovie } = useMovieByID(ID_Movie, shouldFetch)

    const shouldFetchComments: boolean = movie?.ID_Movie ? true : false

    const { data: comments, isLoading: isLoadingComments} = useCommentByMovie(Number(ID_Movie), user?.token as string, shouldFetchComments)

    const { mutate: mutateLike } = useNewLike(likeData!, user?.token!)

    const { mutate: mutateComment } = useCreate(commentData!, user?.token!)

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

    if (isLoadingMovie || isLoadingComments) {
        return <LoaderElement />
    }

    // TODO Create a reusable component that will display a general error for missing data.
    if (!movie) {
        return <h1>No movie</h1>
    }

    const handleNewLike= (ID_Comment: number): void => {
        setLikeData({Comment: ID_Comment, User: Number(user?.ID_User)})
        mutateLike(
            undefined,
            {
                onSuccess: (data: SuccessResponseMsg): void => {
                    console.log(data.msg)
                    queryClient.invalidateQueries({queryKey: ['commentByMovie']})
                },
                onError: (err: Error): void => {
                    console.log("Error during create a like", err)
                }
            }
        )
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        setCommentData({
            Movie: Number(ID_Movie),
            User: Number(user?.ID_User!),
            body: newComment
        })

        mutateComment(
            undefined,
            {
                onSuccess: (data: SuccessResponseMsg): void => {
                    queryClient.invalidateQueries({queryKey: ['commentByMovie']})
                    showNotification({message: data.msg})                    
                },
                onError: (err: Error): void => {
                    console.log("Error during create a like", err)
                }
            }
        )
    }

    return (
        <div className="col-span-12 flex flex-col min-h-screen border border-red-500 justify-center items-center gap-4">
            <div className="text-center">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                    {movie.title}
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    Movie description.
                </p>
            </div>
            <div className="mt-6 max-w-[80%] border border-black flex flex-col gap-4 items-center justify-center sm:flex-row">
                <div className=" flex flex-col gap-2 items-center">
                    <img
                    src={`http://localhost:8080${movie.cover}`}
                    className="h-96 w-72 object-contain"
                    />
                    <div>
                        Global Movie Rate : {(movie.Ratings && movie.Ratings.length > 0) ? movie.Ratings?.reduce((acc, currVal) => acc + currVal.rate_picture, 0)/ movie.Ratings?.length : "No information"}
                    </div>
                </div>                
                <div className="divide-y divide-gray-100 flex flex-col border border-blue-600 justify-between ">
                    <InfoRow<Person>
                        title="Director :"
                        data={movie.Director}
                        renderItem={(director: Person) => `${director.first_name} ${director.last_name}`}                           
                    />
                    <InfoRow<Person>
                        title="Actors :"
                        data={movie.Actors}
                        renderItem={(actor: Person) => `${actor.first_name} ${actor.last_name}`}
                        isList={true}
                        visibleElementCount={visibleElementsCount}
                    />
                    <InfoRow<Genre>
                        title="Genres :"
                        data={movie.Genres}
                        renderItem={(genre: Genre) => genre.name_genre}
                        isList={true}
                        visibleElementCount={visibleElementsCount}
                    />
                    <InfoRow<Company> 
                        title="Companies :"
                        data={movie.Companies}
                        renderItem={(company: Company) => company.name_company}
                        isList={true}
                        visibleElementCount={visibleElementsCount}
                    />
                    <InfoRow<AwardMovie>
                        title="Awards :"
                        data={movie.Awards_Movies}
                        renderItem={(award: AwardMovie) => award.name_award}
                        isList={true}
                        visibleElementCount={visibleElementsCount}
                    />
                    <InfoRow<string> 
                        title="Release Date :"
                        data={movie.release_date as string}
                        renderItem={(date) => new Date(date).toLocaleDateString('fr-BE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        isList={false}
                    />
                </div>                
            </div>
            <div className="min-w-[80%] flex flex-col gap-4 items-center border border-green-600">
                <button
                    className="px-3 h-8 min-w-[42px] max-w-[300px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" 
                    onClick={()=>setIsRate(!isRate)}
                    disabled={!user ? true : false}>
                        {isRate ? "Your Rate" : "Average Rate"}
                </button>
                {   
                    //TODO Remember to save the values entered by the user if they navigate between two diagrams.
                    //TODO I can't send the 'Rank' table; I only need to send the Movie and User IDs. I'll retrieve the 'Ranks' directly within the component.
                    isRate ? <RadarDiagramForRank rangs={movie.Ratings} idHTMLElement="averageRate" title="Average Rate"/> : <CreateRank />
                }                
            </div>
            {   comments && user ?
                <div className="p-6 min-w-[80%]">
                    {/* For the proper functioning of the comments section, I want to add 
                        the ability to like comments and display the number of likes/dislikes. 
                        I need to rethink the way data is retrieved from the backend. */}
                    <h2 className="text-lg font-bold mb-4">
                        Comments
                    </h2>
                    <div className="flex flex-col gap-4">
                        {
                            comments.data.map((comment: Comment, index: number) =>
                                <CommentCard 
                                    key={`Comment${index}`} 
                                    Comment={comment} 
                                    ID_User={Number(user?.ID_User)} 
                                    createNewLike={(ID_Comment) => handleNewLike(ID_Comment)} 
                                />
                            )
                        }
                    </div>
                    <form className="bg-white p-4 rounded-lg shadow-md"
                        onSubmit={handleSubmit}
                        >
                        <h3 className="text-lg font-bold mb-2">Add a comment</h3>

                        <div className="mb-4">
                            <label 
                                className="block text-gray-700 font-bold mb-2" 
                                htmlFor="comment">
                                    Comment
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="comment" 
                                rows={3} 
                                placeholder="Enter your comment"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}>
                            </textarea>
                        </div>
                        <button
                            className="px-3 h-8 min-w-[42px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            type="submit">
                            Submit
                        </button>
                    </form>
                    
                </div> 
                :
                <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <IconInfo />
                    <div className="ms-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                        Please <NavLink
                                    to={"/login"}
                                    className={"font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"}>
                                        Sign In
                                </NavLink>   to the application to view comments.
                    </div>
                </div>
            }
        </div>
    )
}
export default MovieDetailsPage