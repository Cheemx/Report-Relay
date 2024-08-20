import React from "react";
import Container from "./Container.jsx"
import {Link, useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn.jsx";
import Button from "./Button.jsx";
import Logo from "./Logo.jsx"

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    
    // add all the nav items in this list
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: 'Signup',
            slug: '/register',
            active: !authStatus
        },
        {
            name: 'Login',
            slug: '/login',
            active: !authStatus
        }
    ]

    return (
        <Container>
            <header className="py-3 w-full shadow bg-[#2E2E2E]">
                <div className="container mx-auto">
                    <nav className="flex items-center">
                        <div className="mr-4">
                            <Link to='/'>
                                <Logo width="70px" />
                            </Link>
                        </div>
                        <ul className="flex ml-auto">
                            {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
                                    <Button onClick={() => navigate(item.slug)}>
                                        {item.name}
                                    </Button>
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
            </Container>        
    )
}

export default Header