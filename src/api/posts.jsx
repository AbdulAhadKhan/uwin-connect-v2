import { instance } from '../utils'

export function createNewPost(data) {
    return instance.post('/create-post', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}

export function getUserPostsByTimestamp(email, nextTimestamp, pageSize) {
    return instance.get(
        `/get-posts/${email}?next_timestamp=${nextTimestamp}&page_size=${pageSize}`
    )
}

export function getPostsByFriends(email, nextTimestamp, pageSize) {
    return instance.get(
        `/get-friends-posts/${email}?next_timestamp=${nextTimestamp}&page_size=${pageSize}`
    )
}

export function likePost(postID, email) {
    return instance.put(`/like-post/${postID}?email=${email}`)
}

export function unlikePost(postID, email) {
    return instance.put(`/unlike-post/${postID}?email=${email}`)
}

export function addComment(postID, data) {
    return instance.put(`/comment-post/${postID}`, data)
}
