import { ErrorValidator } from "../types/typeError";
import { User } from "../types/typeUser";

/**
 * Function to validate form data.
 *
 * @param {Partial<User>} formData - The object containing the form data.
 * @returns {ErrorValidator} - An object containing a boolean indicating if validation was successful and an error message.
 */
export const validateLoginFormData = (formData: Partial<User>): ErrorValidator => {


    if(formData.login?.trim() === ""){
        const message: string = "No login, please try again."
        return { msg: message, state: false }
    }

    if(formData.password?.trim() === ""){
        const message: string = "No password, please try again."
        return { msg: message, state: false }
    }
    
    const message: string = "Validation has been successful."
    return {msg: message, state: true}
}