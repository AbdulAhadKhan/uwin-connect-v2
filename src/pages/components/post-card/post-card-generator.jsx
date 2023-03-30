import { useRef, useEffect } from 'react'

import PostCard from './post-card'
import { useIsVisible } from '../visibility-observer/visibility-observer'

export default function PostCardGenerator({
    data,
    fetchNextPage,
    hasNextPage,
}) {
    const ref = useRef()
    const isVisible = useIsVisible(ref)

    console.log('isVisible ', isVisible)

    useEffect(() => {
        if (isVisible) {
            fetchNextPage()
        }
    }, [isVisible])

    return (
        <>
            {data.pages &&
                data.pages
                    .flatMap((page) => page.data.posts)
                    .map((post) => <PostCard key={post._id} post={post} />)}
            {hasNextPage && <div ref={ref} className='load-more' />}
        </>
    )
}
