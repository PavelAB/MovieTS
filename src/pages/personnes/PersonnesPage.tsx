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

const StarRow : React.FC<{data: Partial<Person>}> = ({data}) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <img
                src={`http://localhost:8080${data.picture! as string}`}
                className="min-h-[200px] border border-red-500"
            />
            <div>
                {data.first_name} {data.last_name}
            </div>
        </div>
    )
}


const PersonnesPage: React.FC = () => {



    const [middleElement, setMiddleElement] = useState<number | null>(null)
    const [leftFirstElemet, setLeftFirstElemet] = useState<number | null>(null)
    const [leftSecondElemet, setLeftSecondElemet] = useState<number | null>(null)
    const [rightFirstElemet, setRightFirstElemet] = useState<number | null>(null)
    const [rightSecondElemet, setRightSecondElemet] = useState<number | null>(null)


    useEffect(()=>{        
        if(!middleElement) setMiddleElement(Math.floor(tempData.length / 2))
    }, [])

    useEffect(()=>{
        if(tempData.length >= 5){
            middleElement as number + 1 < tempData.length ? setRightFirstElemet(middleElement! + 1) : setRightFirstElemet(0)
            middleElement as number - 1 < 0 ? setLeftFirstElemet(tempData.length - 1) : setLeftFirstElemet(middleElement! - 1)
            middleElement as number - 2 < 0 ? setLeftSecondElemet(tempData.length - 2) : setLeftSecondElemet(middleElement! - 2)  
            middleElement as number + 2 < tempData.length ? setRightSecondElemet(middleElement! + 2) : setRightSecondElemet(0)
        }
        else if(tempData.length >= 3){            
            setLeftFirstElemet(middleElement! - 1)
            setRightFirstElemet(middleElement! + 1)
        }
    }, [middleElement])

    const handleRight = (): void => {
        setMiddleElement((prev) => (prev! + 1) > tempData.length - 1 ? 0 : prev! + 1 ) 
        
    }

    console.log("middle", middleElement)

    console.log(" --> ", leftSecondElemet, leftFirstElemet, middleElement, rightFirstElemet, rightSecondElemet, tempData[rightSecondElemet!])

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
            <div className="flex gap-4 items-center">
                {/* Carousel for stars */}
                <button >
                    <IconLeft />
                </button>                
                <div className="flex gap-4 items-center">
                    {/* {tempData && tempData.map((person: Partial<Person>,index: number) => index < 5 && <StarRow key={person.ID_Personne} data={person} />)} */}
                    {leftSecondElemet !== null && <div className="flex flex-col gap-2 items-center">
                        <img
                            src={`http://localhost:8080${tempData[leftSecondElemet].picture! as string}`}
                            className="min-h-[100px] border border-red-500"
                        />
                        <div>
                            {tempData[leftSecondElemet].ID_Personne} : {tempData[leftSecondElemet].first_name} {tempData[leftSecondElemet].last_name}
                        </div>
                    </div>}
                    {leftFirstElemet !== null && <div className="flex flex-col gap-2 items-center">
                        <img
                            src={`http://localhost:8080${tempData[leftFirstElemet].picture! as string}`}
                            className="min-h-[150px] border border-red-500"
                        />
                        <div>
                            {tempData[leftFirstElemet].ID_Personne} : {tempData[leftFirstElemet].first_name} {tempData[leftFirstElemet].last_name}
                        </div>
                    </div>}
                    {middleElement !== null && <div className="flex flex-col gap-2 items-center">
                        <img
                            src={`http://localhost:8080${tempData[middleElement!].picture! as string}`}
                            className="min-h-[300px] border border-red-500"
                        />
                        <div>
                            {tempData[middleElement!].ID_Personne} : {tempData[middleElement!].first_name} {tempData[middleElement!].last_name}
                        </div>
                    </div>}
                    {rightFirstElemet !== null && <div className="flex flex-col gap-2 items-center">
                        <img
                            src={`http://localhost:8080${tempData[rightFirstElemet].picture! as string}`}
                            className="min-h-[150px] border border-red-500"
                        />
                        <div>
                            {tempData[rightFirstElemet].ID_Personne} : {tempData[rightFirstElemet].first_name} {tempData[rightFirstElemet].last_name}
                        </div>
                    </div>}
                    {rightSecondElemet !== null && <div className="flex flex-col gap-2 items-center">
                        <img
                            src={`http://localhost:8080${tempData[rightSecondElemet].picture! as string}`}
                            className="min-h-[100px] border border-red-500"
                        />
                        <div>
                            {tempData[rightSecondElemet].ID_Personne} : {tempData[rightSecondElemet].first_name} {tempData[rightSecondElemet].last_name}
                        </div>
                    </div>}
                </div>
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