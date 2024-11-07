import React, { useEffect, useState } from "react";
import { Person } from "../../types/Person";
import IconRight from "../../components/uiElements/icons/IconRight";
import IconLeft from "../../components/uiElements/icons/IconLeft";
import { useRandomPersons } from "../../hooks/usePerson";
import { useUser } from "../../context/UserContext";
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement";



const PersonnesPage: React.FC = () => {


    const [limit, setLimit] = useState<number>(8)
    const [job, setJob] = useState<string>("")
    const [persones, setPersons] = useState<Person[]>([])
    const { user } = useUser()
    const shouldFetch: boolean = user?.token ? true : false

    const [middleElement, setMiddleElement] = useState<number>(0)
    const [leftFirstElemet, setLeftFirstElemet] = useState<number | null>(null)
    const [leftSecondElemet, setLeftSecondElemet] = useState<number | null>(null)
    const [rightFirstElemet, setRightFirstElemet] = useState<number | null>(null)
    const [rightSecondElemet, setRightSecondElemet] = useState<number | null>(null)

    const {data: randomPersons, isLoading: isLoadingRandomPersons} = useRandomPersons(job, limit, user?.token as string, shouldFetch)


    useEffect(()=>{        
        if(!middleElement) setMiddleElement(Math.floor(persones.length / 2))
    }, [])

    useEffect(()=>{
        if(randomPersons) setPersons(randomPersons?.data)
    }, [randomPersons])

    useEffect(()=>{

        if(persones.length >= 5){
            middleElement + 1 < persones.length ? setRightFirstElemet(middleElement + 1) : setRightFirstElemet((middleElement + 1) - persones.length)
            middleElement - 1 < 0 ? setLeftFirstElemet((middleElement - 1) + persones.length) : setLeftFirstElemet(middleElement - 1)
            middleElement - 2 < 0 ? setLeftSecondElemet((middleElement - 2) + persones.length) : setLeftSecondElemet(middleElement - 2)  
            middleElement + 2 < persones.length ? setRightSecondElemet(middleElement + 2) : setRightSecondElemet((middleElement + 2) - persones.length)
        }
        else if(persones.length >= 3){            
            middleElement + 1 < persones.length ? setRightFirstElemet(middleElement + 1) : setRightFirstElemet((middleElement + 1) - persones.length)
            middleElement - 1 < 0 ? setLeftFirstElemet((middleElement - 1) + persones.length) : setLeftFirstElemet(middleElement - 1)
        }
    }, [middleElement, randomPersons])

    if(isLoadingRandomPersons && persones.length < 0) return <LoaderElement />

    console.log("test", persones)

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

    const handleRight = (): void => {
        setMiddleElement((prev) => (prev + 1) > persones.length - 1 ? 0 : prev + 1 )        
    }
    const handleLeft = (): void => {
        setMiddleElement((prev) => (prev - 1) >= 0 ? prev - 1 : persones.length - 1)
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
            { persones.length > 0 && 
                <div className="flex gap-8 min-w-[80%] items-center justify-center">
                {/* Carousel for stars */}
                <button onClick={handleLeft}>
                    <IconLeft />
                </button>
                    {leftSecondElemet !== null && <StarRow key={"1"} element={persones[leftSecondElemet]} maxWText="100px" minHImage="100px" />}
                    {leftFirstElemet !== null && <StarRow key={"2"} element={persones[leftFirstElemet]} maxWText="150px" minHImage="150px" />}
                    {middleElement !== null && <StarRow key={"3"} element={persones[middleElement]} maxWText="300px" minHImage="300px" />}
                    {rightFirstElemet !== null && <StarRow key={"4"} element={persones[rightFirstElemet]} maxWText="150px" minHImage="150px" />}
                    {rightSecondElemet !== null && <StarRow key={"5"} element={persones[rightSecondElemet]} maxWText="100px" minHImage="100px" />}
                <button onClick={handleRight}>
                    <IconRight />
                </button>
                
            </div>}
            <div>
                {/* Carouser for films */}
            </div>
        </div>
    )
}
export default PersonnesPage