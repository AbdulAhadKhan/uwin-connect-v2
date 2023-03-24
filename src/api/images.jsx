import { instance } from "../utils"

export function getImage(image) {
    return instance.get(`/get-image/${image}`, {headers: {
        'Content-Type': 'image/*',
    }})
}