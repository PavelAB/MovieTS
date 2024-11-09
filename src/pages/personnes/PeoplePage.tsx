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


    // Received data
    const { user: connectedUser } = useUser()
    const [carouselPeopleArray, setCarouselPeopleArray] = useState<Person[]>([])
    
    // Fetch states
    const [carouselPeopleLimit, setCarouselPeopleLimit] = useState<number>(8)
    const [carouselSearchingJob, setCarouselSearchingJob] = useState<string>(SEARCHING_JOB_OPTIONS.DEFAULT_EMPTY)
    const shouldFetch: boolean = connectedUser?.token ? true : false
    
    
    const [carouselCenterIndex, setCarouselCenterIndex] = useState<number>(0)
    const [carouselLeftNearIndex, setCarouselLeftNearIndex] = useState<number | null>(null)
    const [carouselLeftFarIndex, setCarouselLeftFarIndex] = useState<number | null>(null)
    const [carouselRightNearIndex, setCarouselRightNearIndex] = useState<number | null>(null)
    const [carouselRightFarIndex, setCarouselRightFarIndex] = useState<number | null>(null)


    const {data: randomPersonResponse, isLoading: isLoadingRandomPersons} = useRandomPersons(
        carouselSearchingJob, 
        carouselPeopleLimit, 
        connectedUser?.token as string, 
        shouldFetch
    )

    useEffect(()=>{
        if(randomPersonResponse) setCarouselPeopleArray(randomPersonResponse.data)
    }, [randomPersonResponse])

    useEffect(()=>{        
        setCarouselCenterIndex(Math.floor(carouselPeopleArray.length / 2))
    }, [carouselPeopleArray])


    useEffect(()=>{
        // If there are at least 3 elements, set the left and right near elements around the center element.
        if(carouselPeopleArray.length >= 3){
            setCarouselLeftNearIndex(getPositionRelativeToCenter(-1))
            setCarouselRightNearIndex(getPositionRelativeToCenter(1))

            // If there are 5 or more elements, also set the left and right far elements
            // to display a total of 5 elements in the carousel.
            if(carouselPeopleArray.length >= 5){
                setCarouselLeftFarIndex(getPositionRelativeToCenter(-2))
                setCarouselRightFarIndex(getPositionRelativeToCenter(2))
            }
        }
    }, [carouselCenterIndex])

    if(isLoadingRandomPersons && carouselPeopleArray.length < 0) return <LoaderElement />

    const carouselSwipeRight = (): void => {
        setCarouselCenterIndex((prev) => (prev + 1) > carouselPeopleArray.length - 1 ? 0 : prev + 1 )        
    }
    const carouselSwipeLeft = (): void => {
        setCarouselCenterIndex((prev) => (prev - 1) >= 0 ? prev - 1 : carouselPeopleArray.length - 1)
    }

    // This function manages the circular display of an array by calculating a relative position
    // based on an offset (addend) from the center index in the carousel.
    function getPositionRelativeToCenter (addend: number): number{
        const newPosition: number = carouselCenterIndex + addend

        if(newPosition < 0) return newPosition + carouselPeopleArray.length
        else if(newPosition >= carouselPeopleArray.length) return newPosition - carouselPeopleArray.length

        
        return newPosition
    }

    const PersonCard: React.FC<{ person: Partial<Person>, cardDimension: string}> = ({ person, cardDimension}) => {
        return (
            <div className={`min-h-[350px] flex flex-col gap-2 items-center justify-center`} style={{ minWidth: cardDimension }}>
                <img
                    src={`http://localhost:8080${person.picture! as string}`}
                    className={`object-contain`}
                    style={{ height: cardDimension }}
                />
                <div className={`min-h-[50px] overflow-hidden text-center text-ellipsis`} style={{ maxWidth: cardDimension }}>
                    {person.ID_Personne}: {person.first_name} {person.last_name}
                </div>
            </div>
        )
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
            { carouselPeopleArray.length > 0 && 
                <div className="flex gap-8 min-w-[80%] items-center justify-center">
                <button onClick={carouselSwipeLeft}>
                    <IconLeft />
                </button>
                    {carouselLeftFarIndex !== null && <PersonCard key={"carouselLeftFarElement"} person={carouselPeopleArray[carouselLeftFarIndex]} cardDimension="100px" />}
                    {carouselLeftNearIndex !== null && <PersonCard key={"carouselLeftNearElement"} person={carouselPeopleArray[carouselLeftNearIndex]} cardDimension="150px" />}
                    {carouselCenterIndex !== null && <PersonCard key={"carouselCenterElement"} person={carouselPeopleArray[carouselCenterIndex]} cardDimension="300px" />}
                    {carouselRightNearIndex !== null && <PersonCard key={"carouselRightNearElement"} person={carouselPeopleArray[carouselRightNearIndex]} cardDimension="150px" />}
                    {carouselRightFarIndex !== null && <PersonCard key={"carouselRightFarElement"} person={carouselPeopleArray[carouselRightFarIndex]} cardDimension="100px" />}
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