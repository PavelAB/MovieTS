import React, { useState } from "react"
import CustomInput from "../../components/Inputs/CustomInput"
import { NavLink } from "react-router-dom"
import { User } from "../../types/typeUser"

const SignUpPage: React.FC = () => {

    const [formState, setFormState] = useState<Partial<User>>({
        first_name: "",
        last_name: "",
        birth_date: "",
        login: "",
        email: "",
        password: ""
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }
    
    // TODO With each symbol entered, the page reloads. This is quite disturbing. I need to find a way to change this.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormState({
            ...formState,
            [name]: value
        })
    }
    


    return (
        <div className="col-span-12 grid place-items-center">
            <div className="mx-auto max-w-md bg-white px-10 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-700">
                        Sign up :
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Sign up below to access your account
                    </p>
                </div>
                 <div> {/*TODO check birth_date */}
                    <form onSubmit={handleSubmit}>
                        <CustomInput
                            inputValue={formState?.first_name as string}
                            name="first_name"
                            labelText="First name: "
                            updateInputValue={handleInputChange} />
                        <CustomInput
                            inputValue={formState?.last_name as string}
                            name="last_name"
                            labelText="Last name: "
                            updateInputValue={handleInputChange} />
                        <CustomInput
                            inputType="date"
                            inputValue={formState?.birth_date as string}
                            name="birth_date"
                            labelText="Birth date: "
                            updateInputValue={handleInputChange} />
                        <CustomInput
                            inputValue={formState?.login as string}
                            name="login"
                            labelText="login: "
                            updateInputValue={handleInputChange} />
                        <CustomInput
                            inputValue={formState?.email as string}
                            name="email"
                            labelText="Email: "
                            updateInputValue={handleInputChange} />
                        <CustomInput
                            inputValue={formState?.password as string}
                            name="password"
                            labelText="Password: "
                            updateInputValue={handleInputChange} />
                        <div className="mt-5 flex justify-center">
                            <button
                                type="submit"
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                    Sign Up
                            </button>
                        </div>
                        <div className="mt-1">
                            <p className="text-center">
                                Do you already have an account?
                                <NavLink
                                    to={"/login"}
                                    className={"font-semibold ml-2 text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"}>
                                        Sign In
                                </NavLink>                                    
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
export default SignUpPage