import { User } from "../types/User"


/**
 * Saves the logged-in user's data to local storage
 * 
 * @param {User} data - An object containing information about the logged user. 
 */
export const saveUserDataToLocalStorage = (data: User): void => {        
    localStorage.setItem("token", data.token as string)
    localStorage.setItem("ID_User", data.ID_User)
    localStorage.setItem("role", data.role as string)
}