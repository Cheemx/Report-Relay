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
        },
        {
            name: 'Create Performance Form',
            slug: '/create-form',
            active: authStatus
        }
    ]

    return (
        <Container>
            <header className="py-3 w-full shadow bg-neutral-900">
                <div className="container mx-auto px-1">
                    <nav className="flex flex-wrap items-center justify-between">
                        <div className="flex-shrink-0">
                            <Link to='/'>
                                <Logo width="100px" />
                            </Link>
                        </div>
                        <ul className="flex items-center ml-auto space-x-1">
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