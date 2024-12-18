import { useMutation, UseMutationResult} from "@tanstack/react-query"
import { login, signUp } from "../api/user/ApiUser"
import { User } from "../types/User"


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

/**
 * Custom React hook to handle user sign-up in the Movie application.
 * 
 * @returns {UseMutationResult<User, Error, Partial<User>, unknown>} - A mutation result object that includes the mutate function to trigger the sign-up request and various states (loading, error, success).
 */

export const useSignUp = ():UseMutationResult<User, Error, Partial<User>, unknown> => {
    const mutation = useMutation({
        mutationFn: signUp
    })

    return mutation
}