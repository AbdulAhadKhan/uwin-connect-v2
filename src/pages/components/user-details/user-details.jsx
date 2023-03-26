import { IconContext } from "react-icons"
import { HiOutlinePencilSquare } from "react-icons/hi2"

import FallbackAvatar from "../FallbackAvatar"
import './user-details.css'

function UserAvatar({ imageID, id }) {
    return (
        <div className="user-details__avatar">
            { imageID ? <img src={`http://localhost:8000/get-image/${imageID}`} alt="User Avatar" /> 
            : <FallbackAvatar id={id} square /> }
        </div>
    )
}

export default function UserDetails({user, id}) {
    const currentUser = JSON.parse(localStorage.getItem("sessionInfo")).id
    
    return (
        <div className="user-details">
            <UserAvatar id={id} imageID={user.image} />
            <div className="user-details__info">
                <div className="user-details__edit">
                    {currentUser === id &&
                        <IconContext.Provider value={{ className: "user-details__edit-icon" }}>
                            <HiOutlinePencilSquare />
                        </IconContext.Provider>
                    }
                </div>
                <h1 className="user-details__name">{user.firstname} {user.lastname}</h1>
                <h2 className="user-details__email">{user.email}</h2>
                <hr />
                <p className="role-department" >{user.role.designation || user.role.title} | {user.role.department}</p>
                <div className="description">
                    <p>{user.description || "A valued member of UWindsor."}</p>
                </div>
            </div>
        </div>
    )
}