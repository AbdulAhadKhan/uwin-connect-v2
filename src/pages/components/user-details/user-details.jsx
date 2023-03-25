import { IconContext } from "react-icons"
import { HiOutlinePencilSquare } from "react-icons/hi2"

import Kylie from "../../../assets/images/placeholder.png"
import './user-details.css'

export default function UserDetails() {
    return (
        <div className="user-details">
            <div className="user-details__avatar">
                <img src={Kylie} alt="avatar" />
            </div>
            <div className="user-details__info">
                <div className="user-details__edit">
                    <IconContext.Provider value={{ className: "user-details__edit-icon" }}>
                        <HiOutlinePencilSquare />
                    </IconContext.Provider>
                </div>
                <h1 className="user-details__name">Kylie Jenner</h1>
                <h2 className="user-details__email">kyliejenner@uwindsor.ca</h2>
                <hr />
                <p className="role-department" >Student | MA Economics</p>
                <div className="description">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Phasellus a molestie nunc, ultrices tristique enim. Maecenas 
                        id magna tincidunt, tristique tellus id, laoreet dui. 
                        Suspendisse egestas nisi.
                    </p>
                </div>
            </div>
        </div>
    )
}