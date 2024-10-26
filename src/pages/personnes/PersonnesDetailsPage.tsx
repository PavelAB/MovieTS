import { useParams } from "react-router-dom"



const PersonnesDetailsPage: React.FC = () => {

    const { ID_Personne } = useParams()

    //TODO fetch person with ID_Personne

    //TODO fetch MM_staring_by_Personnes_Movies include Movie, by ID_Personne with page, limit, orderBy

    console.log("ID_Personne :> ", ID_Personne)

    return (
        <div className="col-span-12 flex flex-col min-h-screen border border-red-500 justify-center items-start gap-4">

        </div>
    )
}

export default PersonnesDetailsPage