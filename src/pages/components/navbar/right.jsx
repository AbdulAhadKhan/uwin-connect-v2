import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BiMessageAlt } from 'react-icons/bi'
import { HiOutlineLogout } from 'react-icons/hi'
import { FiAlertCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

import FallbackAvatar from '../FallbackAvatar'

import { getUserDetails } from '../../../api/users'

function ProfileImage({ image_id, email }) {
    return image_id ? (
        <img
            src={`http://localhost:8000/get-image/${image_id}`}
            className='profile-image'
        />
    ) : (
        <FallbackAvatar id={email} className='fallback-avatar' size='40' />
    )
}

export function NameTag({ email }) {
    const navigate = useNavigate()
    const id = email.split('@')[0]
    const [user, setUser] = useState({ firstname: 'John', lastname: 'Doe' })
    const toProfile = () => navigate(`/profile/${id}`)

    useQuery({
        queryKey: ['user', email],
        queryFn: () => getUserDetails(email),
        onSuccess: (response) => setUser(response.data),
    })

    return (
        <div className='navbar__profile' onClick={toProfile}>
            <ProfileImage
                email={email}
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
    )
}

export default function Right() {
    const navigate = useNavigate()
    const { id, domain } = JSON.parse(localStorage.getItem('sessionInfo'))
    const email = id + '@' + domain

    const logout = () => {
        localStorage.removeItem('sessionInfo')
        navigate('/')
    }

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
            <FiAlertCircle
                className='message-icon'
                size={'1.25em'}
                onClick={() =>
                    (window.location.href =
                        'https://www.uwindsor.ca/itservices/support')
                }
            />
            <NameTag email={email} id={id} />
        </div>
    )
}
