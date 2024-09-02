import React from "react"
import { NavLink } from "react-router-dom"

interface CustomNavLinksProps {
    to: string,
    text: string
}

const CustomNavLinks: React.FC<CustomNavLinksProps> = ({to, text}) => {
    return (
        <NavLink  
            to={to}
            className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
            {text}
        </NavLink>
    )
}

export default CustomNavLinks