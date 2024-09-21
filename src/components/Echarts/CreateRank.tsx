import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";






const CreateRank: React.FC = () => {

    const {user} = useUser()
    const {ID_Movie} = useParams()

    if(!user){
        return <div>To rate the movie, please log in to the application.</div>
    }

    console.log(user?.ID_User, ID_Movie)


    const [actorGameRate, setActorGameRate] = useState<number>(0)
    const [writingRate, setWritingRate] = useState<number>(0)
    const [cinematographyRate, setCinematographyRate] = useState<number>(0)
    const [soundRate, setSoundRate] = useState<number>(0)



    return (
        <div>
            <div>
                <h1>Title</h1>
            </div>
            <div>
                <div>Echart</div>
                <div>Forms</div>
            </div>
        </div>
    )
}

export default CreateRank