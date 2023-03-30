import UserAvatar from './user-avatar'
import UserInformation from './user-information'

import './user-card.css'

export default function UserCard({ user, editable, areFriends }) {
    return (
        <div className='user-details'>
            <UserAvatar
                imageID={user.image}
                email={user.email}
                editable={editable}
            />
            <UserInformation
                user={user}
                editable={editable}
                areFriends={areFriends}
            />
        </div>
    )
}
