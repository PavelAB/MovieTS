import React from "react"

/**
 * A reusable button component that sets a page limit for a list or pagination.
 *
 * @interface CustomLimitButton
 * @property {function} setPage - The function to be called when the button is clicked. It takes a React.MouseEvent<HTMLButtonElement> as its argument.
 * @property {number} isLimit - The current limit to compare with. Used to determine the button's styling active or not.
 * @property {number} limit - The numerical value displayed on the button and used to set the limit.
 */

interface CustomLimitButton {
    setPage: (event: React.MouseEvent<HTMLButtonElement>) => void,
    isLimit: number,
    limit: number,
}

/**
 * LimitButton component that renders a button to change the limit of items displayed.
 *
 * @param {CustomLimitButton} props - Props for the LimitButton component.
 * @returns {JSX.Element} A styled button element.
 */

const LimitButton: React.FC<CustomLimitButton> = ({
    setPage,
    isLimit,
    limit
    }) => {

    return (
        <button
            className={`px-3 h-8 min-w-[42px] text-sm font-medium text-gray-500 ${limit === isLimit ? 'bg-gray-200' : 'bg-white'} border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={setPage}>
            {limit}
        </button>
    )
}
export default LimitButton