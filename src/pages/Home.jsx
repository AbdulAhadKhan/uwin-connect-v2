import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.removeItem("sessionInfo")
        navigate("/")
    }
    
    return (
        <div className="home">
            <h1>home</h1>
            <button onClick={logout}>Logout</button>
        </div>
    )
}