import React, { useState } from "react";
import CustomInput from "../../components/Inputs/CustomInput";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import { useLogin } from "../../hooks/useAuth";
import { ErrorValidator } from "../../types/Error";
import { validateLoginFormData } from "../../Validators/userFormValidators";
import { saveUserDataToLocalStorage } from "../../utils/localStorageActions";

const LoginPage: React.FC = () => {

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {mutate} = useLogin()
    const navigate = useNavigate() // TODO Check for a better implementation


    // resetFormFields clears the form fields
    const resetFormFields = (): void => {
        setLogin('')
        setPassword('')
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        const formData: Partial<User> = {
            login: (event.currentTarget.elements.namedItem("login") as HTMLInputElement).value,
            password: (event.currentTarget.elements.namedItem("password") as HTMLInputElement).value
        }
        
        const validation: ErrorValidator = validateLoginFormData(formData)
        
        if(!validation.state)
            throw new Error("Validation not passed: " + validation.msg)

        mutate( 
            formData,
            {
                onSuccess: (data: User): void => {
                    console.log('Login successful')
                    
                    resetFormFields()
                    saveUserDataToLocalStorage(data)                   

                    navigate("/")
                },
                onError: (err: Error): void => {
                    console.log('Error during login:', err)
                }
            })
        
    }


    return (
        <div className="col-span-12 grid place-items-center">
            <div className="mx-auto max-w-md bg-white px-10 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-xl">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-700">
                        Sign In :
                    </h1>
                    <p className="mt-2 text-gray-500">
                        Sign in below to access your account
                    </p>
                </div>
                <div className="mt-5">
                    <form onSubmit={handleSubmit}>
                        <CustomInput
                            inputValue={login}
                            name="login"
                            labelText={"Login"}
                            updateInputValue={(e) => setLogin(e.target.value)} />
                        <CustomInput
                            inputValue={password}
                            name="password"
                            inputType="password"
                            labelText="Password"
                            updateInputValue={(e) => setPassword(e.target.value)} />
                        <div className="mt-5 flex justify-center">
                            <button
                                type="submit"
                                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                Sign In
                            </button>
                        </div>
                        <div className="mt-1">
                            <p className="text-center">
                                Don't have an account yet?
                                <NavLink
                                    to={"/signUp"} 
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