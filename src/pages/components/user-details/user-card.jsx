import UserAvatar from './user-avatar'
import UserInformation from './user-information'

import './user-card.css'

export default function UserCard({ user, id }) {
    const currentUser = JSON.parse(localStorage.getItem('sessionInfo')).id

    return (
        <div className='user-details'>
            <UserAvatar
                imageID={user.image}
                email={user.email}
                editable={id === currentUser}
            />
            <UserInformation user={user} editable={id === currentUser} />
        </div>
    )
}
