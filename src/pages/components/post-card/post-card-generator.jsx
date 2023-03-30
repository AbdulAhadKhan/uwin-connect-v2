import PostCard from './post-card'

export default function PostCardGenerator({
    data,
    fetchNextPage,
    hasNextPage,
}) {
    return (
        <>
            {data.pages &&
                data.pages
                    .flatMap((page) => page.data.posts)
                    .map((post) => <PostCard key={post._id} post={post} />)}
            {hasNextPage && (
                <button onClick={() => fetchNextPage()}>Load More</button>
            )}
        </>
    )
}
