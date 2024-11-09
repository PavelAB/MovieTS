import React from "react";
import PeopleCarousel from "../../components/people/carousel/PeopleCarousel";





const PeoplePage: React.FC = () => {      

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
            <PeopleCarousel />
            <div>
                {/* Carouser for films */}
            </div>
        </div>
    )
}
export default PeoplePage