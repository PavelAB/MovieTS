import React, { useState } from "react";
import CustomInput from "../../components/Inputs/CustomInput";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../../types/typeUser";

const LoginPage: React.FC = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate() // TODO Check for a better implementation

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData: Partial<User> = {
            login: (event.currentTarget.elements[0] as HTMLInputElement).value,
            password: (event.currentTarget.elements[1] as HTMLInputElement).value
        }

        if(formData.login?.trim() === "")
            throw new Error("Error: No login, please try again.")

        if(formData.password?.trim() === "")
            throw new Error("Error: No password, please try again.")
        
        setLogin('')
        setPassword('')

        console.log("return --> ", formData)
        navigate("/")
    }


    return (
        <div className="col-span-12 grid place-items-center">
            <div className="mx-auto max-w-md bg-white px-10 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-700">
                        Sign in :
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Sign in below to access your account
                    </p>
                </div>
                <div className="mt-5">
                    <form onSubmit={handleSubmit}>
                        <CustomInput
                            inputValue={login}
                            labelText={"Login"}
                            updateInputValue={(e) => setLogin(e.target.value)} />
                        <CustomInput
                            inputValue={password}
                            inputType="password"
                            labelText="Password"
                            updateInputValue={(e) => setPassword(e.target.value)} />
                        <div className="mt-5 flex justify-center">
                            <button
                                type="submit"
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Submit
                            </button>
                        </div>
                        <div className="mt-1">
                            <p className="text-center">
                                Don't have an account yet?
                                <NavLink
                                    to={"/"} 
                                    className={"font-semibold ml-2 text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"}>
                                        Sign up        
                                </NavLink>
                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginPage