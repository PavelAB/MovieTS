import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/User";

const UserContext = createContext<{
    user: Partial<User> | null
    updateUser: (user: User) => void
    logOut: () => void
} | undefined>(undefined)

type UserProviderProps = {
    children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ( {children} ) => {

    const [user, setUser] = useState<Partial<User> | null>(() => {
        const token: string | null = localStorage.getItem("token")
        const ID_User: string | null = localStorage.getItem("ID_User")
        const role: string | null = localStorage.getItem("role")
        return token && ID_User && role ? {token, ID_User, role} : null
    })


    const updateUser = (newUser: Partial<User> | null): void => {
        if(newUser){
            localStorage.setItem("token", newUser.token as string)
            localStorage.setItem("ID_User", newUser.ID_User as string)
            localStorage.setItem("role", newUser.role as string)
        }
        else{
            localStorage.removeItem("token")
            localStorage.removeItem("ID_User")
            localStorage.removeItem("role")
        }

        setUser(newUser)
    }


    const logOut = (): void => {
        updateUser(null)
    }

    useEffect(() => {

        const handleStorageChange = (): void => {
            const token: string | null = localStorage.getItem("token")
            const ID_User: string | null = localStorage.getItem("ID_User")
            const role: string | null = localStorage.getItem("role")
            setUser(token && ID_User && role ? {token, ID_User, role} : null)
        }
      
    
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])
    

    return (
        <UserContext.Provider value={{ user, updateUser, logOut }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if(!context){
        throw new Error('useUser must be used within a UserProvider');
    }
    return context
}