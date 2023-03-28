import { instance } from '../utils'

export function getUserDetails(email) {
    return instance.get(`/get-user/${email}`)
}

export function putUserDetails(email, data) {
    return instance.put(`/update-user/${email}`, data)
}
