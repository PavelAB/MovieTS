import React, { useState } from "react";
import PeopleCarousel from "../../components/people/carousel/PeopleCarousel";
import MovieCarousel from "../../components/movies/carousel/MovieCarousel";
import LoaderElement from "../../components/uiElements/loaderSpin/LoaderElement";





const PeoplePage: React.FC = () => {    
    
    const [carouselCenterPersonId, setCarouselCenterPersonId] = useState<number>()


    const handleCenterPersonIdChange = (id: number) => {
        setCarouselCenterPersonId(id)
    }

    console.log("CenterID ---> ", carouselCenterPersonId)

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
            <PeopleCarousel onCenterPersonIdChange={handleCenterPersonIdChange} />
            { carouselCenterPersonId ?
                <MovieCarousel ID_Person={carouselCenterPersonId}/> :
                <LoaderElement />
            }
        </div>
    )
}
export default PeoplePage