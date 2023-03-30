import { useInfiniteQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import PostCardGenerator from './components/post-card/post-card-generator'
import Navbar from './components/navbar/navbar'
import UserCard from './components/user-details/user-card'
import { getUserDetails } from '../api/users'
import { getUserPostsByTimestamp } from '../api/posts'

import './Profile.css'
function ProfilePage({ user, id }) {
    const [noPosts, setNoPosts] = useState(false)
    const [compToShow, setCompToShow] = useState(<></>)

    const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } =
        useInfiniteQuery({
            queryKey: ['user-posts', user.email],
            queryFn: ({ pageParam = Date.now() }) => {
                return getUserPostsByTimestamp(user.email, pageParam, 2)
            },
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.data.next === null) return undefined
                return lastPage.data.next.page
            },
            onSuccess: (response) => {
                if (response?.pages[0]?.data?.posts.length === 0)
                    setNoPosts(true)
                else setNoPosts(false)
            },
        })

    useEffect(() => {
        if (isLoading) setCompToShow(<h1>Loading...</h1>)
        else if (isSuccess && !noPosts)
            setCompToShow(
                <PostCardGenerator
                    data={data}
                    fetchNextPage={fetchNextPage}
                    hasNextPage={hasNextPage}
                />
            )
        else if (isSuccess && noPosts)
            setCompToShow(<h1>No posts here yet... 🧐</h1>)
    }, [isLoading, isSuccess, noPosts, data])

    return (
        <div className='naved-page profile-page tripple-grid'>
            <Navbar />
            <div className='profile-card-col'>
                <UserCard user={user} id={id} />
            </div>
            <div className='post-col'>
                <div className='post-card-container'>{compToShow}</div>
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

    const { refetch } = useQuery({
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
