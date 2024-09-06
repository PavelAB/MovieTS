import { useMutation, UseMutationResult} from "@tanstack/react-query"
import { login } from "../api/User/ApiUser"
import { User } from "../types/typeUser"


/**
 * Custom React hook to handle user login in the Movie application.
 * 
 * @returns {UseMutationResult<User, Error, Partial<User>, unknown>} - A mutation result object that includes the mutate function to trigger the login request and various states (loading, error, success).
 */

export const useLogin = ():UseMutationResult<User, Error, Partial<User>, unknown> => {
    const mutation = useMutation({
        mutationFn: login
    })

    return mutation
}