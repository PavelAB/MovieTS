import React from "react"
import CustomNavLinks from "../Link/CustomNavLink"
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
                            <p>Stars</p>
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
                                className="bg-white hover:bg-gray-100 text-gray-800 px-1 border border-gray-400 rounded shadow" 
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