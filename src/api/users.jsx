import { instance } from "../utils"

export function getUserDetails(email) {
    return instance.get(`/get-user/${email}`)
}