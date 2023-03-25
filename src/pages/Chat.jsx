import { Navigate } from "react-router-dom"

import Navbar from "./components/navbar/navbar"

export default function Chat() {
    if (!localStorage.getItem("sessionInfo")) {
        return <Navigate to="/" />
    }
    
    return (
        <div className="chat naved-page">
            <Navbar hideCreate />
        </div>
    )
}