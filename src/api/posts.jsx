import { instance } from '../utils'

export function createNewPost(data) {
    return instance.post('/create-post', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
}
