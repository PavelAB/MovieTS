import { ErrorValidator } from "../types/Error";
import { User } from "../types/User";

/**
 * Function to validate form data from Login.
 *
 * @param {Partial<User>} formData - The object containing the form data.
 * @returns {ErrorValidator} - An object containing a boolean indicating if validation was successful and an error message.
 */
export const validateLoginFormData = (formData: Partial<User>): ErrorValidator => {


    if(!formData.login?.trim()){
        const message: string = "No login, please try again."
        return { msg: message, state: false }
    }

    if(!formData.password?.trim()){
        const message: string = "No password, please try again."
        return { msg: message, state: false }
    }
    
    const message: string = "Validation has been successful."
    return {msg: message, state: true}
}

/**
 * Function to validate form data from Sign up.
 *
 * @param {Partial<User>} formData - The object containing the form data.
 * @returns {ErrorValidator} - An object containing a boolean indicating if validation was successful and an error message.
 */
export const validateSignUpFormData = (formData: Partial<User>): ErrorValidator => {
    
    if(!formData.first_name?.trim()){
        const message: string = "No First name, please try again."
        return { msg: message, state: false }
    }
    if(!formData.last_name?.trim()){
        const message: string = "No Last name, please try again."
        return { msg: message, state: false }
    }
    if(!formData.birth_date){
        const message: string = "No Birth date, please try again."
        return { msg: message, state: false }
    }
    if(!formData.login?.trim()){
        const message: string = "No login, please try again."
        return { msg: message, state: false }
    }
    if(!formData.email?.trim()){
        const message: string = "No email, please try again."
        return { msg: message, state: false }
    }
    if(!formData.password?.trim()){
        const message: string = "No password, please try again."
        return { msg: message, state: false }
    }
         
    
    const message: string = "Validation has been successful."
    return {msg: message, state: true}
}