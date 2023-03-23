import { useNavigate } from "react-router-dom"

import Navbar from "./components/navbar/navbar"

export default function Home() {
    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.removeItem("sessionInfo")
        navigate("/")
    }
    
    return (
        <div className="home">
            <Navbar />
            <button onClick={logout}>Logout</button>
        </div>
    )
}