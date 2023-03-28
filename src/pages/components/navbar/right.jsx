import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BiMessageAlt } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import FallbackAvatar from '../FallbackAvatar'

import { getUserDetails } from '../../../api/users'

function ProfileImage({ image_id }) {
    const { id } = JSON.parse(localStorage.getItem('sessionInfo'))

    return image_id ? (
        <img
            src={`http://localhost:8000/get-image/${image_id}`}
            className='profile-image'
        />
    ) : (
        <FallbackAvatar id={id} className='fallback-avatar' size='40' />
    )
}

export default function Right() {
    const navigate = useNavigate()
    const { id, domain } = JSON.parse(localStorage.getItem('sessionInfo'))
    const [user, setUser] = useState({ firstname: 'John', lastname: 'Doe' })
    const email = id + '@' + domain

    const logout = () => {
        localStorage.removeItem('sessionInfo')
        navigate('/')
    }

    const toProfile = () => {
        navigate(`/profile/${id}`)
        window.location.reload()
    }

    useQuery({
        queryKey: ['user', email],
        queryFn: () => getUserDetails(email),
        onSuccess: (response) => setUser(response.data),
    })

    return (
        <div className='right'>
            <HiOutlineLogout
                className='logout-icon'
                size={'1.25em'}
                onClick={logout}
            />
            <BiMessageAlt
                className='message-icon'
                size={'1.25em'}
                onClick={() => navigate('/chat')}
            />
            <div className='navbar__profile' onClick={toProfile}>
                <ProfileImage
                    user_name={id}
                    className='profile-image'
                    image_id={user?.image}
                />
                <div className='name-container'>
                    <div className='name'>
                        {user?.firstname + ' ' + user?.lastname}
                    </div>
                    <div className='email'>{user?.email}</div>
                </div>
            </div>
        </div>
    )
}
