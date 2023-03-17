import { Outlet } from 'react-router-dom'

import cafe from '../../../assets/images/cafe.png'
import UW_logo from '../../../assets/images/UW Logo.svg'

import './landing-card.css'

function PrettyCard() {
    return (
        <div className="image-container">
            <img src={cafe} alt="cafe" className="cafe-image" />
            <div className="logo-type">
                <img src={UW_logo} alt="UW logo" />
                <h1>UWin Connect</h1>
                <h2><i>powerd by</i> Quantum Leap</h2>
            </div>
        </div>
    )
}

function LoginCard() {
    return (
        <div className="landing-container">
            <Outlet />
        </div>
    )
}

export default function LandingCard() {
    return (
        <div className="landing-card">
            <PrettyCard />
            <LoginCard />
        </div>
    )
}