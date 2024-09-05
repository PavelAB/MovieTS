import React from "react"


interface CustomInputProp {
    inputValue: string,
    updateInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void
    inputPlaceHolder?: string,
    labelText: string,
    inputType?: React.HTMLInputTypeAttribute

}

const CustomInput: React.FC<CustomInputProp> = ({inputValue, updateInputValue, inputPlaceHolder, labelText, inputType }) => {
    return (
        <div className="mt-5 relative">
            <input
                type={inputType ? inputType : "type"}
                value={inputValue}
                onChange={updateInputValue}
                placeholder={inputPlaceHolder ? inputPlaceHolder : ''}
                className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
            <label
                htmlFor=""
                className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                {labelText}
            </label>
        </div>
    )
}
export default CustomInput