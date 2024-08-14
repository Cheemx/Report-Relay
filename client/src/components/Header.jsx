import React from "react";
import Container from "./Container.jsx"
import {Link, useNavigate} from "react-router-dom"

function Header() {
    const authStatus = false// check authentication status of the user using useSelector
    const navigate = useNavigate()
    
    // add all the nav items in this list
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        }
    ]

    return (
        <>
            <header className="py-3 w-full shadow bg-[#2E2E2E]">
                <div className="container mx-auto">
                    <nav className="flex items-center">
                        <div className="mr-4">
                            <a href="/">
                                <img src="path_to_logo.png" alt="Logo" className="w-[70px]" />
                            </a>
                        </div>
                        <ul className="flex ml-auto">
                            {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                    onClick={() => navigate(item.slug)}
                                    className="inline-block px-6 py-2 duration-200 hover:bg-[#00FFFF] text-[#000000] rounded-full"
                                    >{item.name}</button>
                                </li>
                            ) : null
                            )}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>

        </>
    )
}

export default Header