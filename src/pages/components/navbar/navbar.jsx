import { BiSearchAlt, BiMessageAlt } from "react-icons/bi"
import { HiChevronDown } from "react-icons/hi"

import UWinLogo from "../../../assets/images/UW Logo.svg"
import TestImage from "../../../assets/images/cafe.png"

import "./navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="left">
            <div className="navbar__logo test">
                <img src={UWinLogo} alt="UWin Logo" />
                <h1>UWin Connect</h1>
            </div>
        </div>
        <div className="center">
            <div className="navbar__search">
                <div className="search-container">
                    <input type="text" placeholder="Search here..." />
                    <BiSearchAlt className="search-icon" />
                </div>
            </div>
        </div>
        <div className="right">
            <BiMessageAlt className="message-icon" size={"1.25em"} />
            <div className="navbar__profile">
                <img src={TestImage} alt="Profile" />
                <div className="name-container">
                    <div className="name">John Doe</div>
                    <div className="email">john@uwindsor.ca</div>
                </div>
                <HiChevronDown className="dropdown-icon" />
            </div>
        </div>
    </nav>
  )
}