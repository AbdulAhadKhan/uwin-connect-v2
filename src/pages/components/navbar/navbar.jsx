import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { BiSearchAlt, BiMessageAlt } from "react-icons/bi"
import { HiOutlineLogout } from "react-icons/hi"
import { useNavigate, createSearchParams } from "react-router-dom"
import  Avatar from "boring-avatars"

import { getUserDetails } from "../../../api/users"
import UWinLogo from "../../../assets/images/UW Logo.svg"

import "./navbar.css"


function CreatePostButton() {
    return (
        <button className="create-post-button">
            <span className="add-post"> New Post</span>
        </button>
    )
}

function Left({ hideCreate }) {
    const navigate = useNavigate()
    
    return (
        <div className="left">
            <div className="navbar__logo test" onClick={() => navigate("/home")} >
                <img src={UWinLogo} alt="UWin Logo" />
                <h1>UWin Connect</h1>
            </div>
            { !hideCreate && <CreatePostButton /> }
        </div>
    )
}

function Center({ value }) {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState(value || "")

    useEffect(() => {
        setSearchValue(value)
    }, [])

    function onEnter(event) {
        if (event.key === "Enter") {
            const params = createSearchParams({ query: event.target.value })
            event.target.blur()
            navigate({ pathname: "/search", search: params.toString() })
        }
    }
    
    return (
        <div className="center">
            <div className="navbar__search">
                <div className="search-container">
                    <input type="text" placeholder="Search here..." 
                        onKeyDown={onEnter} value={searchValue} 
                        onChange={(event) => setSearchValue(event.target.value)} />
                    <BiSearchAlt className="search-icon" />
                </div>
            </div>
        </div>
    )
}

function ProfileImage({ image_id, user_name }) {
    return (image_id ? <img src={`http://localhost:8000/get-image/${image_id}`} 
                className="profile-image" /> 
        : <Avatar size={40} name={user_name} variant="beam" 
            colors={[ "#5F545C", "#EB7072", "#F5BA90", "#F5E2B8", "#A2CAA5" ]} />)
}

function Right() {
    const navigate = useNavigate()
    const { id, domain } = JSON.parse(localStorage.getItem("sessionInfo"))
    const [user, setUser] = useState({firstname: "John", lastname: "Doe"})
    const email = id + "@" + domain

    const logout = () => {
        localStorage.removeItem("sessionInfo")
        navigate("/")
    }
    
    const toProfile = () => {
        const params = createSearchParams({ id: id })
        navigate(`/profile/${id}`)
    }

    useQuery({
        queryKey: ["user", email],
        queryFn: () => getUserDetails(email),
        onSuccess: (response) => setUser(response.data),
    })

    return (
        <div className="right">
            <HiOutlineLogout className="logout-icon" size={"1.25em"} onClick={logout} />
            <BiMessageAlt className="message-icon" size={"1.25em"} onClick={() => navigate("/chat")} />
            <div className="navbar__profile" onClick={toProfile} >
                <ProfileImage user_name={user?.firstname + " " + user?.lastname} 
                    className="profile-image" image_id={user?.image} />
                <div className="name-container">
                    <div className="name">{user?.firstname + " " + user?.lastname}</div>
                    <div className="email">{user?.email}</div>
                </div>
            </div>
        </div>
    )
}

export default function Navbar({ hideCreate, value }) {
    return (
        <nav className="navbar">
            <Left hideCreate={hideCreate} />
            <Center value={value} />
            <Right />
        </nav>
    )
}