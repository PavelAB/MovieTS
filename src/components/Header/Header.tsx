import React from "react"
import CustomNavLinks from "../Link/CustomNavLink"


// TODO For small displays, rearrange the list with the links.


const Header: React.FC = () => {

    const userOk: boolean = true  // TODO delete temp variable



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
                            <p>About</p>
                        </li>
                        <li>
                            <CustomNavLinks to="/movie" text="Movie" />
                        </li>
                        <li>
                            <p>Stars</p>
                        </li>
                        <li>
                            <p>Awards</p>
                        </li>
                    </ul>
                </div> 
            </div>
            
            <div className="flex justify-between items-center border border-gray-700 mr-10">
                <div className="mr-10 ml-5">
                    SEARCH BAR
                </div>
                {
                    userOk ?
                        <div className="flex justify-center items-center mr-5">
                            <p className="mr-5">Sign in</p>
                            <p>Sign up</p>
                        </div>
                        :
                        <div className="flex justify-center items-center mr-5">
                            <p>Sign out</p>
                        </div> 
                }
            </div>
        </div>
    )
}
export default Header