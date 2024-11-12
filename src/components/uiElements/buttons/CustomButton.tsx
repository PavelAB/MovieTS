

interface CustomButtonProps {
    onClick: () => void,
    buttonName: string,
    buttonMinWidth?: string,
}



const CustomButton: React.FC<CustomButtonProps> = ({onClick, buttonName, buttonMinWidth = "85px"}) => {
    return (
        <button
            className={`px-3 h-8 min-w-[${buttonMinWidth}] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            onClick={onClick}>
                {buttonName}
        </button>
    )
}
export default CustomButton