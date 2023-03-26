import { instance } from "../utils"

export function getImage(image) {
    return instance.get(`/get-image/${image}`, {headers: {
        'Content-Type': 'image/*',
    }})
}

export function uploadProfileImage(formData, email) {
    return instance.put(`/upload-profile-picture/${email}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
}