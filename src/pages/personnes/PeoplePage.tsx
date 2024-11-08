import React, { useEffect, useState } from "react";
import { Person } from "../../types/Person";
import IconRight from "../../components/uiElements/icons/IconRight";
import IconLeft from "../../components/uiElements/icons/IconLeft";
import { useRandomPersons } from "../../hooks/usePerson";
import { useUser } from "../../context/UserContext";
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement";


type SearchingJobOptions = {
    DEFAULT_EMPTY: string,
    ACTOR: string,
    DIRECTOR: string,
    WRITER: string
}

const SEARCHING_JOB_OPTIONS: SearchingJobOptions = {
    DEFAULT_EMPTY: "",
    ACTOR: "Actor",
    DIRECTOR: "Director",
    WRITER: "Writer"
}


const PeoplePage: React.FC = () => {


    const { user: connectedUser } = useUser()

    const [carouselPeopleLimit, setCarouselPeopleLimit] = useState<number>(8)
    const [carouselSearchingJob, setCarouselSearchingJob] = useState<string>(SEARCHING_JOB_OPTIONS.DEFAULT_EMPTY)
    const [people, setPeople] = useState<Person[]>([])
    const shouldFetch: boolean = connectedUser?.token ? true : false

    const [carouselCenterElement, setCarouselCenterElement] = useState<number>(0)
    const [carouselLeftNearElement, setCarouselLeftNearElement] = useState<number | null>(null)
    const [carouselLeftFarElement, setCarouselLeftFarElement] = useState<number | null>(null)
    const [carouselRightNearElement, setCarouselRightNearElement] = useState<number | null>(null)
    const [carouselRightFarElement, setCarouselRightFarElement] = useState<number | null>(null)


    const {data: randomPersonResponse, isLoading: isLoadingRandomPersons} = useRandomPersons(
        carouselSearchingJob, 
        carouselPeopleLimit, 
        connectedUser?.token as string, 
        shouldFetch
    )


    useEffect(()=>{        
        setCarouselCenterElement(Math.floor(people.length / 2))
    }, [people])

    useEffect(()=>{
        if(randomPersonResponse) setPeople(randomPersonResponse.data)
    }, [randomPersonResponse])

    useEffect(()=>{

        if(people.length >= 5){
            carouselCenterElement + 1 < people.length ? setCarouselRightNearElement(carouselCenterElement + 1) : setCarouselRightNearElement((carouselCenterElement + 1) - people.length)
            carouselCenterElement - 1 < 0 ? setCarouselLeftNearElement((carouselCenterElement - 1) + people.length) : setCarouselLeftNearElement(carouselCenterElement - 1)
            carouselCenterElement - 2 < 0 ? setCarouselLeftFarElement((carouselCenterElement - 2) + people.length) : setCarouselLeftFarElement(carouselCenterElement - 2)  
            carouselCenterElement + 2 < people.length ? setCarouselRightFarElement(carouselCenterElement + 2) : setCarouselRightFarElement((carouselCenterElement + 2) - people.length)
        }
        else if(people.length >= 3){            
            carouselCenterElement + 1 < people.length ? setCarouselRightNearElement(carouselCenterElement + 1) : setCarouselRightNearElement((carouselCenterElement + 1) - people.length)
            carouselCenterElement - 1 < 0 ? setCarouselLeftNearElement((carouselCenterElement - 1) + people.length) : setCarouselLeftNearElement(carouselCenterElement - 1)
        }
    }, [carouselCenterElement])

    if(isLoadingRandomPersons && people.length < 0) return <LoaderElement />

    console.log("test", people)

    const StarRow: React.FC<{ element: Partial<Person>, minHImage: string, maxWText: string }> = ({ element, minHImage, maxWText }) => {
        return (
            <div className={`min-h-[350px] flex flex-col gap-2 items-center justify-center`} style={{ minWidth: minHImage }}>
                <img
                    src={`http://localhost:8080${element.picture! as string}`}
                    className={`object-contain`}
                    style={{ minHeight: minHImage, maxHeight: minHImage }}
                />
                <div className={`min-h-[50px] overflow-hidden text-center text-ellipsis`} style={{ maxWidth: maxWText }}>
                    {element.ID_Personne}: {element.first_name} {element.last_name}
                </div>
            </div>
        )
    }

    const carouselSwipeRight = (): void => {
        setCarouselCenterElement((prev) => (prev + 1) > people.length - 1 ? 0 : prev + 1 )        
    }
    const carouselSwipeLeft = (): void => {
        setCarouselCenterElement((prev) => (prev - 1) >= 0 ? prev - 1 : people.length - 1)
    }

    return (
        <div className="col-span-12 flex flex-col min-h-screen border border-red-600 justify-start items-center gap-4">
            <div>
                {/* Title */}
                <h1>This is tilte</h1>
            </div>
            <div>
                {/* Search bar */}
                <p>Search bar</p>
            </div>
            { people.length > 0 && 
                <div className="flex gap-8 min-w-[80%] items-center justify-center">
                {/* Carousel for stars */}
                <button onClick={carouselSwipeLeft}>
                    <IconLeft />
                </button>
                    {carouselLeftFarElement !== null && <StarRow key={"carouselLeftFarElement"} element={people[carouselLeftFarElement]} maxWText="100px" minHImage="100px" />}
                    {carouselLeftNearElement !== null && <StarRow key={"carouselLeftNearElement"} element={people[carouselLeftNearElement]} maxWText="150px" minHImage="150px" />}
                    {carouselCenterElement !== null && <StarRow key={"carouselCenterElement"} element={people[carouselCenterElement]} maxWText="300px" minHImage="300px" />}
                    {carouselRightNearElement !== null && <StarRow key={"carouselRightNearElement"} element={people[carouselRightNearElement]} maxWText="150px" minHImage="150px" />}
                    {carouselRightFarElement !== null && <StarRow key={"carouselRightFarElement"} element={people[carouselRightFarElement]} maxWText="100px" minHImage="100px" />}
                <button onClick={carouselSwipeRight}>
                    <IconRight />
                </button>
                
            </div>}
            <div>
                {/* Carouser for films */}
            </div>
        </div>
    )
}
export default PeoplePage