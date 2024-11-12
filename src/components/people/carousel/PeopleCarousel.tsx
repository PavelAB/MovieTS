import { useEffect, useState } from "react"
import { useUser } from "../../../context/UserContext"
import { Person } from "../../../types/Person"
import { useRandomPersons } from "../../../hooks/usePerson"
import LoaderElement from "../../uiElements/loaderSpin/LoaderElement"
import IconRight from "../../uiElements/icons/IconRight"
import IconLeft from "../../uiElements/icons/IconLeft"
import { useQueryClient } from "@tanstack/react-query"
import IconDown from "../../uiElements/icons/IconDown"
import IconUp from "../../uiElements/icons/IconUp"
import CustomButton from "../../uiElements/buttons/CustomButton"




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



    const PersonCard: React.FC<{ dataPerson: Partial<Person>, cardDimension: string}> = ({ dataPerson, cardDimension}) => {
        return (
            <div className={`min-h-[350px] flex flex-col gap-2 items-center justify-center`} style={{ minWidth: cardDimension }}>
                <img
                    src={`http://localhost:8080${dataPerson.picture! as string}`}
                    className={`object-contain rounded-lg`}
                    style={{ height: cardDimension }}
                />
                <div className={`min-h-[50px] overflow-hidden text-center text-ellipsis`} style={{ maxWidth: cardDimension }}>
                    {dataPerson.first_name} {dataPerson.last_name}
                </div>
            </div>
        )
    }

    const JobFilterButton: React.FC<{buttonJobParams: string}> = ({buttonJobParams}) => {
        return (
            <button
                onClick={() => setCarouselSearchingJob(buttonJobParams)}
                className={`px-3 h-8 min-w-[85px] text-sm font-medium text-gray-500 ${carouselSearchingJob === buttonJobParams ? 'bg-gray-200' : 'bg-white'} border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                {buttonJobParams === SEARCHING_JOB_OPTIONS.DEFAULT_EMPTY ? "All" : buttonJobParams}
            </button>

        )
    }

    return (
        <div className="flex flex-col min-w-[80%] border border-red-600 gap-8 items-center justify-center">
            {carouselPeopleArray.length > 0 && 
                <div className="flex min-w-[100%] items-center justify-center">
                    <button onClick={carouselSwipeLeft}>
                        <IconLeft />
                    </button>
                    {carouselLeftFarIndex !== null && <PersonCard key={"carouselLeftFarElement"} dataPerson={carouselPeopleArray[carouselLeftFarIndex]} cardDimension="100px" />}
                    {carouselLeftNearIndex !== null && <PersonCard key={"carouselLeftNearElement"} dataPerson={carouselPeopleArray[carouselLeftNearIndex]} cardDimension="150px" />}
                    {carouselCenterIndex !== null && <PersonCard key={"carouselCenterElement"} dataPerson={carouselPeopleArray[carouselCenterIndex]} cardDimension="300px" />}
                    {carouselRightNearIndex !== null && <PersonCard key={"carouselRightNearElement"} dataPerson={carouselPeopleArray[carouselRightNearIndex]} cardDimension="150px" />}
                    {carouselRightFarIndex !== null && <PersonCard key={"carouselRightFarElement"} dataPerson={carouselPeopleArray[carouselRightFarIndex]} cardDimension="100px" />}
                    <button onClick={carouselSwipeRight}>
                        <IconRight />
                    </button>
                </div>
            }
            <div className="relative flex flex-col min-w-[40%] items-center justify-center gap-4">
                <button
                    className="flex px-3 min-w-full border border-gray-500 bg-gray-300 rounded-lg justify-center" 
                    onClick={() => setIsCarouselFiltresOpen((prev) => !prev)}>
                        {isCarouselFiltresOpen ? 
                            <IconUp /> : 
                            <IconDown /> 
                        }
                </button>
                {isCarouselFiltresOpen && 
                    <div 
                        className={`${isCarouselFiltresOpen ? 
                                "opacity-100 scale-100" : 
                                "opacity-0 scale-95"
                                } flex items-center justify-center gap-4 transition-all duration-1000 ease-in-out transform`}
                        style={{ visibility: isCarouselFiltresOpen ? "visible" : "hidden"}}>
                            <JobFilterButton buttonJobParams={SEARCHING_JOB_OPTIONS.DEFAULT_EMPTY}/>
                            <JobFilterButton buttonJobParams={SEARCHING_JOB_OPTIONS.ACTOR}/>
                            <JobFilterButton buttonJobParams={SEARCHING_JOB_OPTIONS.WRITER}/>
                            <JobFilterButton buttonJobParams={SEARCHING_JOB_OPTIONS.DIRECTOR}/>                        
                    </div>
                }
            </div>
            <CustomButton 
                onClick={() => queryClient.invalidateQueries({queryKey: ["randomPersons"]})}
                buttonName="I'm lucky !"/>    
        </div>

    )
}
export default PeopleCarousel