import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import ErrorMessage from "../Error/ErrorMessage";
import { Rating } from "../../types/Rating";
import RadarDiagramForRank from "./RadarDiagramForRanks";
import { RangeInput } from "../Inputs/RangeInput";
import { useRatingByMovieAndUser } from "../../hooks/useRating";






const CreateRank: React.FC = () => {

    const { user } = useUser()
    const { ID_Movie } = useParams()

    const [actorGameRate, setActorGameRate] = useState<number>(5)
    const [writingRate, setWritingRate] = useState<number>(5)
    const [cinematographyRate, setCinematographyRate] = useState<number>(5)
    const [soundRate, setSoundRate] = useState<number>(5)


    const [newRang, setNewRang] = useState<Partial<Rating>>({
        rate_actor_game: actorGameRate,
        rate_cinematography: cinematographyRate,
        rate_sound: soundRate,
        rate_writing: writingRate,
        Movie: ID_Movie,
        User: user ? user.ID_User : "" 
    })


    const shouldFetch: boolean = user ? true : false
    const { data: rating } = useRatingByMovieAndUser(Number(ID_Movie), Number(user?.ID_User), user?.token!, shouldFetch)

    useEffect(() => {
        if(rating){
            setActorGameRate(rating.rate_actor_game)
            setCinematographyRate(rating.rate_cinematography)
            setSoundRate(rating.rate_sound)
            setWritingRate(rating.rate_writing)
        }
    }, [rating])


    useEffect(() => {
        setNewRang({
            rate_actor_game: actorGameRate,
            rate_cinematography: cinematographyRate,
            rate_sound: soundRate,
            rate_writing: writingRate,
            Movie: ID_Movie,
            User: user ? user.ID_User : ""
        })
    }, [actorGameRate, writingRate, cinematographyRate, soundRate, user, ID_Movie]
)



    if (!user) {
        return <ErrorMessage
            title="Please log in."
            subTitle="Only authorized users can rate the movies."
            goToPageTitle="log in"
            goToPageURL="/login"
        />
    }
    
    console.log(user.ID_User, ID_Movie)
    console.log("data ..:> ", rating)


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        console.log()
    }


    return (
        <div className="flex flex-col w-full items-center gap-4">
            <div>
                <h1>Title</h1>
            </div>
            <div className="min-w-[80%] flex flex-col gap-4 items-center lg:flex-row">
                <RadarDiagramForRank
                    rangs={[newRang]}
                    idHTMLElement="newRate"
                    title="New Rate" />
                <div className="flex flex-grow">
                    <form onSubmit={handleSubmit}>
                        <RangeInput
                            key={"actor"} 
                            title="Actor's Performance :"
                            value={actorGameRate}
                            name={"actorGameRate"}
                            updateValue={(e) => setActorGameRate(Number(e.target.value))}/>
                        <RangeInput
                            key={"sound"} 
                            title="Sound Quality :"
                            value={soundRate}
                            name={"soundRate"}
                            updateValue={(e) => setSoundRate(Number(e.target.value))}/>
                        <RangeInput 
                            key={"cinematic"}
                            title="Cinematic Quality :"
                            value={cinematographyRate}
                            name={"cinematographyRate"}
                            updateValue={(e) => setCinematographyRate(Number(e.target.value))}/>
                        <RangeInput 
                            key={"scenario"}
                            title="Scenario Quality :"
                            value={writingRate}
                            name={"writingRate"}
                            updateValue={(e) => setWritingRate(Number(e.target.value))}/>
                        <div className="mt-5 flex justify-center">
                            <button
                                type="submit"
                                className="px-3 h-8 min-w-[42px] max-w-[300px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                Create Rang
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateRank