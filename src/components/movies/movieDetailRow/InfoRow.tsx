

/**
 * A reusable row component used to display specific information about the movie.
 *
 * @template T - The type of the data being displayed in the row. Typically, this could be a string, Person, Genre, Company, AwardMovie.
 * 
 * 
 * @interface InfoRowProps<T>
 * @property {string} title - The title of the row.
 * @property {T | T[]} data - The data to be displayed in the row, which can either be a single item of type `T` or an array of `T`.
 * @property {(item: T) => React.ReactNode} renderItem - A function that specifies how each item of type `T` should be rendered in the row.
 * @property {boolean} [isList] - A boolean indicating if the data is an array (default is false).
 * @property {number} [visibleElementCount] - The number of elements to render in the row depending on the screen size (default is 2).
 * 
 * @example
 * // Example usage with a string type for T:
 * <InfoRow<string>
 *   title="Genres"
 *   data={["Action", "Adventure"]}
 *   renderItem={(genre) => <span>{genre}</span>}
 * />
 *
 * // Example usage with an object type for T:
 * <InfoRow<{ name: string, age: number }>
 *   title="Actors"
 *   data={[{ name: "John Doe", age: 35 }, { name: "Jane Doe", age: 28 }]}
 *   renderItem={(actor) => <span>{actor.name} - {actor.age}</span>}
 * />
 * 
 */

interface InfoRowProps<T> {
    title: string,
    data?: T | T[],
    renderItem: (item: T) => React.ReactNode,
    isList?: boolean,
    visibleElementCount?: number

}


/**
 * InfoRow component that renders a row to display specific movie information. 
 * Primarily used in the MovieDetailsPage.
 * 
 * @template T - The type of the data being displayed in the row.
 * @param {InfoRowProps<T>} props - Props for the InfoRow component.
 * @returns {JSX.Element} A styled div element containing a row with specifique information about a movie.
 */

const InfoRow = <T,>({
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

export default InfoRow