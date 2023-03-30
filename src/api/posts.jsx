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
