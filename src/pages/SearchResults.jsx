import { Navigate, useSearchParams } from "react-router-dom"

import Navbar from "./components/navbar/navbar"

export default function SearchResults() {
    const [searchParams] = useSearchParams()
    
    if (!localStorage.getItem("sessionInfo")) {
        return <Navigate to="/" />
    }
    
    return (
        <div className="chat naved-page">
            <Navbar hideCreate value={searchParams.get("query")} />
        </div>
    )
}