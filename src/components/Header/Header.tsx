const Header = () => {
    return (
        <div className="m-0 col-span-12 pt-6 flex justify-between items-center border border-red-500">
            <div>
                LOGO
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
            <div>
                SEARCH BAR
            </div>
        </div>
    )
}
export default Header