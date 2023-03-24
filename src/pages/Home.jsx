import { Navigate } from "react-router-dom"

import Navbar from "./components/navbar/navbar"

export default function Home() {
    if (!localStorage.getItem("sessionInfo")) {
        return <Navigate to="/" />
    }
    
    return (
        <div className="home">
            <Navbar />
        </div>
    )
}