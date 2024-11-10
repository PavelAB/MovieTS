import { useEffect, useState } from "react"
import { useUser } from "../../../context/UserContext"
import { Person } from "../../../types/Person"
import { useRandomPersons } from "../../../hooks/usePerson"
import LoaderElement from "../../uiElements/loaderSpin/LoaderElement"
import IconRight from "../../uiElements/icons/IconRight"
import IconLeft from "../../uiElements/icons/IconLeft"
import { useQueryClient } from "@tanstack/react-query"




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


const PeopleCarousel: React.FC<{onCenterPersonIdChange: (id: number) => void}> = ({onCenterPersonIdChange}) => {


    // Received data
    const { user: connectedUser } = useUser()
    const [carouselPeopleArray, setCarouselPeopleArray] = useState<Person[]>([])

    const queryClient = useQueryClient()
    
    // Fetch states
    const [carouselPeopleLimit] = useState<number>(8)
    const [carouselSearchingJob, setCarouselSearchingJob] = useState<string>(SEARCHING_JOB_OPTIONS.DEFAULT_EMPTY)
    const shouldFetch: boolean = connectedUser?.token ? true : false
    
    
    const [carouselCenterIndex, setCarouselCenterIndex] = useState<number>(0)
    const [carouselLeftNearIndex, setCarouselLeftNearIndex] = useState<number | null>(null)
    const [carouselLeftFarIndex, setCarouselLeftFarIndex] = useState<number | null>(null)
    const [carouselRightNearIndex, setCarouselRightNearIndex] = useState<number | null>(null)
    const [carouselRightFarIndex, setCarouselRightFarIndex] = useState<number | null>(null)
    const [isCarouselFiltresOpen, setIsCarouselFiltresOpen] = useState<boolean>(false)

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
        if(carouselPeopleArray.length > 0 && carouselCenterIndex >= 0)
            onCenterPersonIdChange(getCenterPersonId())
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

    if(isLoadingRandomPersons && carouselPeopleArray.length <= 0) return <LoaderElement />

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

    function getCenterPersonId():number {
        return carouselPeopleArray[carouselCenterIndex].ID_Personne
    }



    const PersonCard: React.FC<{ cardPerson: Partial<Person>, cardDimension: string}> = ({ cardPerson, cardDimension}) => {
        return (
            <div className={`min-h-[350px] flex flex-col gap-2 items-center justify-center`} style={{ minWidth: cardDimension }}>
                <img
                    src={`http://localhost:8080${cardPerson.picture! as string}`}
                    className={`object-contain`}
                    style={{ height: cardDimension }}
                />
                <div className={`min-h-[50px] overflow-hidden text-center text-ellipsis`} style={{ maxWidth: cardDimension }}>
                    {cardPerson.ID_Personne}: {cardPerson.first_name} {cardPerson.last_name}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-w-[80%] gap-8  items-center justify-center">
            {carouselPeopleArray.length > 0 && 
                <div className="flex min-w-[100%] items-center justify-center">
                    <button onClick={carouselSwipeLeft}>
                        <IconLeft />
                    </button>
                    {carouselLeftFarIndex !== null && <PersonCard key={"carouselLeftFarElement"} cardPerson={carouselPeopleArray[carouselLeftFarIndex]} cardDimension="100px" />}
                    {carouselLeftNearIndex !== null && <PersonCard key={"carouselLeftNearElement"} cardPerson={carouselPeopleArray[carouselLeftNearIndex]} cardDimension="150px" />}
                    {carouselCenterIndex !== null && <PersonCard key={"carouselCenterElement"} cardPerson={carouselPeopleArray[carouselCenterIndex]} cardDimension="300px" />}
                    {carouselRightNearIndex !== null && <PersonCard key={"carouselRightNearElement"} cardPerson={carouselPeopleArray[carouselRightNearIndex]} cardDimension="150px" />}
                    {carouselRightFarIndex !== null && <PersonCard key={"carouselRightFarElement"} cardPerson={carouselPeopleArray[carouselRightFarIndex]} cardDimension="100px" />}
                    <button onClick={carouselSwipeRight}>
                        <IconRight />
                    </button>
                </div>
            }
            <div className="relative flex flex-col min-w-[40%] items-center justify-center gap-4">
                <button
                    className="flex px-3 min-w-full border border-gray-500 bg-gray-300 rounded-lg justify-center" 
                    onClick={() => setIsCarouselFiltresOpen((prev) => !prev)}>
                        <svg 
                            className="w-[33px] h-[15px] text-gray-800 dark:text-white" 
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            fill="none" 
                            viewBox="0 0 24 24">
                                <path 
                                    stroke="currentColor" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="m19 9-7 7-7-7"/>
                        </svg>

                </button>
                {isCarouselFiltresOpen && 
                    <div className={`${
                        isCarouselFiltresOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    } flex items-center justify-center gap-4 transition-all duration-1000 ease-in-out transform`}
                    style={{
                        visibility: isCarouselFiltresOpen ? 'visible' : 'hidden',
                    }}>
                        <button 
                            onClick={() => setCarouselSearchingJob(SEARCHING_JOB_OPTIONS.DEFAULT_EMPTY)}
                            className={`px-3 h-8 min-w-[42px] text-sm font-medium text-gray-500 ${carouselSearchingJob === SEARCHING_JOB_OPTIONS.DEFAULT_EMPTY ? 'bg-gray-200' : 'bg-white'} border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            All
                        </button>
                        <button 
                            onClick={() => setCarouselSearchingJob(SEARCHING_JOB_OPTIONS.ACTOR)}
                            className={`px-3 h-8 min-w-[42px] text-sm font-medium text-gray-500 ${carouselSearchingJob === SEARCHING_JOB_OPTIONS.ACTOR ? 'bg-gray-200' : 'bg-white'} border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            Actors
                        </button>
                        <button 
                            onClick={() => setCarouselSearchingJob(SEARCHING_JOB_OPTIONS.WRITER)}
                            className={`px-3 h-8 min-w-[42px] text-sm font-medium text-gray-500 ${carouselSearchingJob === SEARCHING_JOB_OPTIONS.WRITER ? 'bg-gray-200' : 'bg-white'} border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            Directors
                        </button>
                        <button 
                            onClick={() => setCarouselSearchingJob(SEARCHING_JOB_OPTIONS.DIRECTOR)}
                            className={`px-3 h-8 min-w-[42px] text-sm font-medium text-gray-500 ${carouselSearchingJob === SEARCHING_JOB_OPTIONS.DIRECTOR ? 'bg-gray-200' : 'bg-white'} border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            Writters
                        </button>
                    </div>
                }

                

            </div>
            <div className="">
                <button 
                    className="px-3 h-8 min-w-[78px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={() => queryClient.invalidateQueries({queryKey: ["randomPersons"]})}>
                        I'm lucky !
                </button>
            </div>
        </div>

    )
}
export default PeopleCarousel