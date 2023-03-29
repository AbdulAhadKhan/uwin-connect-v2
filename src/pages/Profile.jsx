import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import Navbar from './components/navbar/navbar'
import UserCard from './components/user-details/user-card'
import PostCard from './components/post-card/post-card'
import { getUserDetails } from '../api/users'

import './Profile.css'

function ProfilePage({ user, id }) {
    return (
        <div className='naved-page profile-page tripple-grid'>
            <Navbar />
            <div className='profile-card-col'>
                <UserCard user={user} id={id} />
            </div>
            <div className='post-col'>
                <div className='post-card-container'>
                    <PostCard user={user} />
                </div>
            </div>
        </div>
    )
}

export default function Profile() {
    if (!localStorage.getItem('sessionInfo')) return <Navigate to='/' />

    const [page, setPage] = useState()
    const { id } = useParams()
    const { domain } = JSON.parse(localStorage.getItem('sessionInfo'))
    const email = `${id}@${domain}`

    const { refetch, data } = useQuery({
        queryKey: ['user-profile', email],
        queryFn: () => getUserDetails(email),
        onSuccess: (response) =>
            setPage(<ProfilePage user={response.data} id={id} />),
        onError: () => setPage(<Navigate to='/404' />),
        retry: (failureCount, error) => error.response.status !== 404,
    })

    useEffect(() => {
        refetch()
    }, [id])

    return <>{page}</>
}
