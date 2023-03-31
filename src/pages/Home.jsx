import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getPostsByFriends } from '../api/posts'
import Navbar from './components/navbar/navbar'
import PostCardGenerator from './components/post-card/post-card-generator'

export default function Home() {
    if (!localStorage.getItem('sessionInfo')) {
        return <Navigate to='/' />
    }

    const [noPosts, setNoPosts] = useState(false)
    const [compToShow, setCompToShow] = useState(<></>)
    const [areFriends, setAreFriends] = useState(false)

    const id = JSON.parse(localStorage.getItem('sessionInfo')).id
    const domain = JSON.parse(localStorage.getItem('sessionInfo')).domain
    const email = id + '@' + domain

    const { data, fetchNextPage, hasNextPage, isLoading, isSuccess } =
        useInfiniteQuery({
            queryKey: ['friends-posts', email],
            queryFn: ({ pageParam = Date.now() }) => {
                return getPostsByFriends(email, pageParam, 5)
            },
            getNextPageParam: (lastPage, pages) => {
                console.log(lastPage)
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
        <div className='naved-page home tripple-grid'>
            <Navbar />
            <div className='post-col'>
                <div className='post-card-container'>{compToShow}</div>
            </div>
        </div>
    )
}
