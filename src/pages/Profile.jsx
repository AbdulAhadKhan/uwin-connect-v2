import { Navigate } from "react-router-dom"

import Navbar from "./components/navbar/navbar"
import UserDetails from "./components/user-details/user-details"

export default function Profile() {
    if (!localStorage.getItem("sessionInfo")) {
        return <Navigate to="/" />
    }
    
    return (
        <div className="profile naved-page">
            <Navbar />
            <UserDetails />
        </div>
    )
}