import { instance } from '../utils'

export function getUserDetails(email) {
    return instance.get(`/get-user/${email}`)
}

export function putUserDetails(email, data) {
    return instance.put(`/update-user/${email}`, data)
}

export function findUser(query) {
    return instance.get(`/query-users/${query}`)
}

export function friendshipStatus(email, friendsEmail) {
    return instance.get('/friendship-status', {
        params: { email: email, friends_email: friendsEmail },
    })
}
