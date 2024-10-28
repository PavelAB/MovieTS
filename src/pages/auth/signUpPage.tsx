import React, { useState } from "react"
import CustomInput from "../../components/uiElements/Inputs/CustomInput"
import { NavLink, useNavigate } from "react-router-dom"
import { User } from "../../types/User"
import { ErrorValidator } from "../../types/Error"
import { validateSignUpFormData } from "../../validators/userFormValidators"
import { useSignUp } from "../../hooks/useAuth"
import { colorOfNotificationMessage, ColorTypeForMessage, useUser } from "../../context/UserContext"

const colors: ColorTypeForMessage = colorOfNotificationMessage

const SignUpPage: React.FC = () => {

    const [formState, setFormState] = useState<Partial<User>>({
        first_name: "",
        last_name: "",
        birth_date: "",
        login: "",
        email: "",
        password: ""
    })
    const { mutate } = useSignUp()
    const navigate = useNavigate()
    const { updateUser, showNotification } = useUser()


    // resetFormFields clears the form fields
    const resetFormFields = (): void => {
        setFormState({
            first_name: "",
            last_name: "",
            birth_date: "",
            login: "",
            email: "",
            password: ""
        })
    }




    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
                
        const formData: Partial<User> = {
            first_name: (event.currentTarget.elements.namedItem('first_name') as HTMLInputElement).value,
            last_name: (event.currentTarget.elements.namedItem('last_name') as HTMLInputElement).value,
            birth_date: (event.currentTarget.elements.namedItem('birth_date') as HTMLInputElement).value,
            login: (event.currentTarget.elements.namedItem('login') as HTMLInputElement).value,
            email: (event.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
            password: (event.currentTarget.elements.namedItem('password') as HTMLInputElement).value
        }

        const validation: ErrorValidator = validateSignUpFormData(formData)

        if(!validation.state)
            throw new Error("Validation not passed: " + validation.msg)


        mutate(
            formData,
            {
                onSuccess: (data: User):void => {

                    resetFormFields()
                    updateUser(data)

                    showNotification({message: "Sign up successful"})

                    navigate("/")
                },
                onError: (err: Error):void => {
                    console.log('Error during sign up:', err)
                    showNotification({message: `Error during sign up: ${err}`, color: colors.red})
                }

            }
        )

    }
    
    // TODO With each symbol entered, the page reloads. This is quite disturbing. I need to find a way to change this.
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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