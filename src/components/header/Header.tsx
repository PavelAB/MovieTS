import React from "react"
import CustomNavLinks from "../link/CustomNavLink"
import { useUser } from "../../context/UserContext"


// TODO For small displays, rearrange the list with the links.


const Header: React.FC = () => {

    const { user, logOut } = useUser()


    return (
        <div className="m-0 col-span-12 flex justify-between items-center border border-red-500">
            <div className="flex items-center border border-gray-700">
                <div className="ml-10 mr-10 border border-blue-500 h-10 w-10 flex items-center justify-center">
                    <p className="border border-black">
                        LOGO
                    </p>
                </div>
                <div className="border border-green-800" >
                    <ul className="w-auto flex flex-col sm:flex-row space-x-0 sm:space-x-4">
                        <li> 
                            <CustomNavLinks to="/" text="Home" />
                        </li>
                        <li>
                            <CustomNavLinks to="/about" text="About" />
                        </li>
                        <li>
                            <CustomNavLinks to="/movie" text="Movie" />
                        </li>
                        <li>
                            <CustomNavLinks to="/stars" text="Stars" />
                        </li>
                        <li>
                            <CustomNavLinks to="/awards" text="Awards" />
                        </li>
                    </ul>
                </div> 
            </div>
            
            <div className="flex justify-between items-center">
                <div className="mr-10 ml-5">
                    SEARCH BAR
                    {/* TODO This search will be used to find different entities through an associated 'Tags' system.

                        - Add relationships between various entities in addition to Movie, such as People, Companies, etc. */}
                </div>
                {
                    !user ?
                        <div className="flex justify-center items-center mr-5">
                            <div className="mr-5">
                                <CustomNavLinks to="/login" text="Sign in" />
                            </div>
                            <div >
                                <CustomNavLinks to="/signUp" text="Sign up" />
                            </div>
                        </div>
                        :
                        <div className="flex justify-center items-center mr-5">
                            <button
                                className="px-3 h-8 min-w-[42px] text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" 
                                onClick={logOut}>
                                    Sign out
                            </button>
                        </div> 
                }
            </div>
        </div>
    )
}
export default Header