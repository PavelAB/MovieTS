

// TODO For small displays, rearrange the list with the links.

const Header = () => {



    return (
        <div className="m-0 col-span-12 flex justify-between items-center border border-red-500">
            <div className="flex items-center">
                <div className="ml-9 mr-9 border border-blue-500 h-10 w-10 flex items-center justify-center">
                    <p className="border border-black">
                        LOGO
                    </p>
                </div>
                <div >
                    <ul className="w-auto flex flex-col sm:flex-row space-x-0 sm:space-x-4">
                        <li>
                            <p>Home</p>
                        </li>
                        <li>
                            <p>About</p>
                        </li>
                        <li>
                            <p>Movies</p>
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
            
            <div>
                SEARCH BAR
            </div>
        </div>
    )
}
export default Header