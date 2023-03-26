import { useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

import Navbar from "./components/navbar/navbar"
import UserDetails from "./components/user-details/user-details"
import { getUserDetails } from "../api/users"

export default function Profile() {
    if (!localStorage.getItem("sessionInfo")) 
        return <Navigate to="/" />

    const [page, setPage] = useState()
    const { id } = useParams()
    const { domain } = JSON.parse(localStorage.getItem("sessionInfo"))
    const email = `${id}@${domain}`

    useQuery({
        queryKey: ["user", email],
        queryFn: () => getUserDetails(email),
        onSuccess: (response) => setPage(<UserDetails user={response.data} id={id} />),
        onError: () => setPage(<Navigate to="/404" />),
        retry: (failureCount, error) => error.response.status !== 404,
    })
    
    return (
        <div className="profile naved-page">
            <Navbar />
            {page}
        </div>
    )
}