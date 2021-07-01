import React from 'react'
import { Link } from "react-router-dom";
import '../style/header.css'

const Header = () => {
    return (
        <header className="Header">
            <a><Link to="/">
                <h1 id="title">Title</h1>
            </Link></a>

            <div className="flex-spacer"></div>

            <nav>
                <li>
                    <a><Link to="/">Link 1</Link></a>
                </li>
                <li>
                    <a><Link to="/">Link 2</Link></a>
                </li>
                <li>
                    <a><Link to="/">Link 3</Link></a>
                </li>
            </nav>
        </header>
    )
}

export default Header