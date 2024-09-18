import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieByID } from "../../../hooks/useMovie";
import LoaderElement from "../../../components/LoaderSpin/LoaderElement";
import { Person } from "../../../types/Person";
import { Genre } from "../../../types/Genre";
import { Company } from "../../../types/Company";
import { AwardMovie } from "../../../types/AwardMovie";


interface InfoRowProps<T> {
    title: string,
    data?: T | T[],
    renderItem: (item: T) => React.ReactNode,
    isList?: boolean,
    visibleElementCount?: number

}

export const InfoRow = <T,>({
    title,
    data,
    renderItem,
    isList = false,
    visibleElementCount = 2,
    }: InfoRowProps<T>) => {

    const hasData = isList ? Array.isArray(data) && data.length > 0 : data !== undefined && data !== null

    return (
        <div className="px-4 py-6 flex items-center gap-4">
            <div className="text-sm font-medium leading-6 text-gray-900 whitespace-nowrap">
                {title}
            </div>
            <div className="text-sm leading-6 text-gray-700 flex justify-start gap-1 whitespace-nowrap">
                { hasData ? (
                    isList && Array.isArray(data) ? (
                        <>
                            {
                                data.slice(0, visibleElementCount).map((item, index) => {
                                    return <span key={`${item}-${index}`}>{renderItem(item)}</span>
                                })
                            }
                            {data.length > visibleElementCount && <span>...</span>}
                        </>
                    ) : (
                        <span>{renderItem(data as T)}</span>
                    )
                ) : (
                    <span>No information</span>
                )}
            </div>
        </div>
    )
}



const MovieDetailsPage: React.FC = () => {

    const { ID_Movie } = useParams()
    const shouldFetch: boolean = ID_Movie ? true : false

    // Used to dynamically display the number of elements based on the screen size.
    const [visibleElementsCount, setVisibleElementsCount] = useState<number>(1)


    const { data: movie, isLoading: isLoadingMovie } = useMovieByID(ID_Movie, shouldFetch)


    useEffect(() => {
        // Returns the number of elements to display based on the screen size.
        const updateNomberOfElementDisplayed = (): void => {
            if(window.innerWidth > 1024) setVisibleElementsCount(3)
            else if(window.innerWidth < 1024 && window.innerWidth > 768 ) setVisibleElementsCount(2)
            else setVisibleElementsCount(1)
        }

        updateNomberOfElementDisplayed()
        window.addEventListener('resize', updateNomberOfElementDisplayed)

        return () => window.removeEventListener('resize', updateNomberOfElementDisplayed)
    })

    if (isLoadingMovie) {
        return <LoaderElement />
    }

    // TODO Create a reusable component that will display a general error for missing data.
    if (!movie) {
        return <h1>No movie</h1>
    }


    console.log("movie", movie)

    return (
        <div className="col-span-12 flex flex-col min-h-screen border border-red-500 justify-center items-center">
            <div className="text-center">
                <h1 className="text-base font-semibold leading-7 text-gray-900">
                    {movie.title}
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                    Movie description.
                </p>
            </div>
            <div className="mt-6 max-w-[80%] border border-black flex flex-col gap-4 items-center justify-center sm:flex-row">
                <img
                    src={`http://localhost:8080${movie.cover}`}
                    className="h-96 w-72 object-contain"
                />
                <div className="divide-y divide-gray-100 flex flex-col border border-blue-600 justify-between ">
                    <InfoRow<Person>
                        title="Director :"
                        data={movie.Director}
                        renderItem={(director: Person) => `${director.first_name} ${director.last_name}`}                           
                    />
                    <InfoRow<Person>
                        title="Actors :"
                        data={movie.Actors}
                        renderItem={(actor: Person) => `${actor.first_name} ${actor.last_name}`}
                        isList={true}
                        visibleElementCount={visibleElementsCount}
                    />
                    <InfoRow<Genre>
                        title="Genres :"
                        data={movie.Genres}
                        renderItem={(genre: Genre) => genre.name_genre}
                        isList={true}
                        visibleElementCount={visibleElementsCount}
                    />
                    <InfoRow<Company> 
                        title="Companies :"
                        data={movie.Companies}
                        renderItem={(company: Company) => company.name_company}
                        isList={true}
                        visibleElementCount={visibleElementsCount}
                    />
                    <InfoRow<AwardMovie>
                        title="Awards :"
                        data={movie.Awards_Movies}
                        renderItem={(award: AwardMovie) => award.name_award}
                        isList={true}
                        visibleElementCount={visibleElementsCount}
                    />
                    <InfoRow<string> 
                        title="Release Date :"
                        data={movie.release_date as string}
                        renderItem={(date) => new Date(date).toLocaleDateString('fr-BE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        isList={false}
                    />
                </div>

            </div>
        </div>
    )
}
export default MovieDetailsPage