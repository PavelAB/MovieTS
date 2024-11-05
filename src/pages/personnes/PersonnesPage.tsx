import React, { useEffect, useState } from "react";
import { Person } from "../../types/Person";
import IconRight from "../../components/uiElements/icons/IconRight";
import IconLeft from "../../components/uiElements/icons/IconLeft";


let tempData: Partial<Person>[] = [
    {
        ID_Personne: 1,
        first_name: "Leonardo",
        last_name: "DiCaprio",
        picture: "/not_implemented"
    },
    {
        ID_Personne: 2,
        first_name: "Scarlett",
        last_name: "Johansson",
        picture: "/not_implemented"
    },
    {
        ID_Personne: 3,
        first_name: "Morgan",
        last_name: "Freeman",
        picture: "/not_implemented"
    },
    {
        ID_Personne: 4,
        first_name: "Jennifer",
        last_name: "Lawrence",
        picture: "/not_implemented"
    },
    {
        ID_Personne: 5,
        first_name: "Robert",
        last_name: "Downey Jr.",
        picture: "/not_implemented"
    },
    {
        ID_Personne: 6,
        first_name: "Emma",
        last_name: "Stone",
        picture: "/not_implemented"
    },
    {
        ID_Personne: 7,
        first_name: "Tom",
        last_name: "Hanks",
        picture: "/not_implemented"
    },
    {
        ID_Personne: 8,
        first_name: "Natalie",
        last_name: "Portman",
        picture: "/not_implemented"
    }
]

const StarRow: React.FC<{ element: number, minHImage: string, maxWText: string }> = ({ element, minHImage, maxWText }) => {
    return (
        <div className={`min-h-[350px] flex flex-col gap-2 items-center justify-center`}>
            <img
                src={`http://localhost:8080${tempData[element].picture! as string}`}
                className={`min-h-[${minHImage}] border border-red-500`}
            />
            <div className={`max-w-[${maxWText}] min-h-[50px] overflow-hidden text-center text-ellipsis`}>
                {tempData[element].ID_Personne}: {tempData[element].first_name} {tempData[element].last_name}
            </div>
        </div>
    )
}


const PersonnesPage: React.FC = () => {



    const [middleElement, setMiddleElement] = useState<number | null>(0)
    const [leftFirstElemet, setLeftFirstElemet] = useState<number | null>(null)
    const [leftSecondElemet, setLeftSecondElemet] = useState<number | null>(null)
    const [rightFirstElemet, setRightFirstElemet] = useState<number | null>(null)
    const [rightSecondElemet, setRightSecondElemet] = useState<number | null>(null)


    useEffect(()=>{        
        if(!middleElement) setMiddleElement(Math.floor(tempData.length / 2))
    }, [])

    useEffect(()=>{

        if(tempData.length >= 5 && middleElement !== null){
            middleElement + 1 < tempData.length ? setRightFirstElemet(middleElement + 1) : setRightFirstElemet((middleElement + 1) - tempData.length)
            middleElement - 1 < 0 ? setLeftFirstElemet((middleElement - 1) + tempData.length) : setLeftFirstElemet(middleElement - 1)
            middleElement - 2 < 0 ? setLeftSecondElemet((middleElement - 2) + tempData.length) : setLeftSecondElemet(middleElement - 2)  
            middleElement + 2 < tempData.length ? setRightSecondElemet(middleElement + 2) : setRightSecondElemet((middleElement + 2) - tempData.length)
        }
        else if(tempData.length >= 3 && middleElement !== null){            
            middleElement + 1 < tempData.length ? setRightFirstElemet(middleElement + 1) : setRightFirstElemet((middleElement + 1) - tempData.length)
            middleElement - 1 < 0 ? setLeftFirstElemet((middleElement - 1) + tempData.length) : setLeftFirstElemet(middleElement - 1)
        }
    }, [middleElement])

    const handleRight = (): void => {
        setMiddleElement((prev) => (prev! + 1) > tempData.length - 1 ? 0 : prev! + 1 )        
    }
    const handleLeft = (): void => {
        setMiddleElement((prev) => (prev! - 1) >= 0 ? prev! - 1 : tempData.length - 1)
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
            <div className="flex gap-8 min-w-[80%] items-center justify-center">
                {/* Carousel for stars */}
                <button onClick={handleLeft}>
                    <IconLeft />
                </button>
                    {leftSecondElemet !== null && <StarRow element={leftSecondElemet} maxWText="100px" minHImage="100px" />}
                    {leftFirstElemet !== null && <StarRow element={leftFirstElemet} maxWText="150px" minHImage="150px" />}
                    {middleElement !== null && <StarRow element={middleElement} maxWText="300px" minHImage="300px" />}
                    {rightFirstElemet !== null && <StarRow element={rightFirstElemet} maxWText="150px" minHImage="150px" />}
                    {rightSecondElemet !== null && <StarRow element={rightSecondElemet} maxWText="100px" minHImage="100px" />}
                <button onClick={handleRight}>
                    <IconRight />
                </button>
                
            </div>
            <div>
                {/* Carouser for films */}
            </div>
        </div>
    )
}
export default PersonnesPage