import React from "react"

/**
 * A reusable range input component used for give a rank for a movie.
 *
 * @interface RangeInputProps
 * @property {number} value - The current value of input field.
 * @property {(event: React.ChangeEvent<HTMLInputElement> => void)} updateValue - Function to update the input value.
 * @property {string} title - A title for the input
 * @property {string} name - Input name to improve form referencing.
 */

interface RangeInputProps {
    value: number,
    updateValue: (event: React.ChangeEvent<HTMLInputElement>) => void,
    title: string, 
    name: string 
}

/**
 * RangeInput component that renders an input for forms, typically used in MovieDetailsPage.
 *
 * @param {RangeInputProps} props - Props for the RangeInput component.
 * @returns {JSX.Element} A styled div element containing an input and a label.
 */



export const RangeInput: React.FC<RangeInputProps> = ({value, updateValue, title, name}) => {


    return (
        <div className="mt-5 relative">
            <input
                type={"range"}
                min="1"
                max="10"
                step="0.5"
                value={value}
                onChange={updateValue}
                name={name}
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
            <label
                htmlFor=""
                className="flex gap-1 pointer-events-none whitespace-nowrap absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                {title} {value}
            </label>
        </div>
    )
}