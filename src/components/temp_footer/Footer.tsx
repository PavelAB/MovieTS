import React from "react"
import IconGitHub from "../icons/IconGitHub"

const Footer: React.FC = () => {
    return (
        <footer className="m-0 col-span-12 p-5 flex justify-between items-center border border-blue-700" >
                <p>
                    Copyright © 2024 Pavel Bezukladnikov
                </p>
                <div className="flex space-x-10 text-slate-400 dark:text-slate-500">
                    <a href="https://github.com/PavelAB"
                        className="hover:text-slate-500 dark:hover:text-slate-400">
                        <span className="sr-only">GitHub</span>
                        <IconGitHub />
                    </a>
                </div>
            
        </footer>

    )
}
export default Footer   