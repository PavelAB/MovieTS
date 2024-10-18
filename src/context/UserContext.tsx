import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import ReactDOM from "react-dom";
import IconX from "../components/icons/IconX";


//TODO !!! Actually, I don't like the way the documentation and context were created. I really need to review how to do this more properly.


/**
 * Interface representing the properties and functions available in the User context.
 *
 * @interface UserContextProps
 * 
 * @property {Partial<User> | null} user - The current user data, which may be partially defined or null if no user is logged in.
 * @property {(user: User) => void} updateUser - Function to update the user state with a new User object.
 * @property {() => void} logOut - Function to log the user out by clearing the user state.
 * @property {(arg: NotificationProps) => void} showNotification - Function to display a notification, which accepts a `NotificationProps` object containing the message, duration, and color of the notification.
 */
export interface UserContextProps {
  user: Partial<User> | null
  updateUser: (user: User) => void
  logOut: () => void
  showNotification: (arg: NotificationProps) => void
}

const UserContext = createContext<UserContextProps | undefined>(undefined)


type UserProviderProps = {
    children: ReactNode
}



/**
 * Props for notifications, including message, display time, and color.
 * 
 * @type {Object} NotificationProps
 * @property {string} message - The notification message to display.
 * @property {number} [time] - The time (in milliseconds) for which the notification is displayed. Optional.
 * @property {string} [color] - The color of the notification. Optional.
 */
export type NotificationProps = {
    message: string,
    time?: number,
    color?: string
}


/**
 * Colors for different notification messages.
 * 
 * @type {Object} ColorTypeForMessage
 * @property {string} green - The green color for success notifications.
 * @property {string} red - The red color for error notifications.
 * @property {string} yellow - The yellow color for warning notifications.
 */
export type ColorTypeForMessage = {
    green: string,
    red: string,
    yellow: string,
}


/**
 * Available colors for notification messages.
 */
export const colorOfNotificationMessage: ColorTypeForMessage = {
    green: "bg-green-400",
    red: "bg-red-400",
    yellow: "bg-yellow-600"
}

export const UserProvider: React.FC<UserProviderProps> = ( {children} ) => {

    const [user, setUser] = useState<Partial<User> | null>(() => {
        const token: string | null = localStorage.getItem("token")
        const ID_User: string | null = localStorage.getItem("ID_User")
        const role: string | null = localStorage.getItem("role")
        return token && ID_User && role ? {token, ID_User, role} : null
    })
    const [message, setMessage] = useState<string | null>(null)
    const [color, setColor] = useState<string>(colorOfNotificationMessage.green)


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


    /**
     * Function to display a notification with a message. Can be used to notify the user about something.
     * 
     * @param {NotificationProps} - Object NotificationProps containing information about the notification to be displayed.
     */
    const showNotification = ({message, time = 2000, color = colorOfNotificationMessage.green}: NotificationProps): void => {
        setMessage(message)
        setColor(color)
        setTimeout(() => {
            setMessage(null)
        }, time)
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
      <UserContext.Provider value={{ user, updateUser, logOut, showNotification }}>
        {children}
        {message &&
          ReactDOM.createPortal(
            <div
              className={`fixed top-4 right-4 ${color} text-white p-4 rounded shadow-lg z-50`}
            >
              <button
                onClick={() => setMessage(null)}
                className="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1"
              >
                <IconX />
              </button>
              {message}
            </div>,
            document.body
          )}
      </UserContext.Provider>
    );
}


/**
 * Custom hook to access the `UserContext`.
 *
 * Provides access to the user-related state and actions:
 * - `user`: The current user data.
 * - `updateUser`: Function to update the user.
 * - `logOut`: Function to log the user out.
 * - `showNotification`: Function to display a notification.
 * 
 * @returns {UserContextProps} The user context object.
 * 
 * @throws {Error} If used outside of a `UserProvider`.
 */
export const useUser = (): UserContextProps => {
    const context = useContext(UserContext)
    if(!context){
        throw new Error('useUser must be used within a UserProvider');
    }
    return context
}