import axios from 'axios'

import config from './config.json'

const CONFIGS = config
export const instance = axios.create({
    baseURL: `http://${CONFIGS.host}:${CONFIGS.port}`,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export async function getSHA256Hash(input) {
    const textAsBuffer = new TextEncoder().encode(input)
    const hashBuffer = await window.crypto.subtle.digest(
        'SHA-256',
        textAsBuffer
    )
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray
        .map((item) => item.toString(16).padStart(2, '0'))
        .join('')
    return hash
}

export function unixTimeToDateTime(unixTime) {
    const date = new Date(1680073326723)
    const months = [
        'Janurary',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]
    const weekDays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ]

    const weekDay = weekDays[date.getDay()]
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    const monthDay = date.getDate()
    const hours = date.getHours() % 12
    const minutes = date.getMinutes()
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM'
    const dateFull = `${month}, ${monthDay}, ${year}`
    const timeFull = `${hours}:${minutes.toString().padStart(2, 0)} ${ampm}`

    return {
        weekDay,
        monthDay,
        month,
        year,
        hours,
        minutes,
        ampm,
        dateFull,
        timeFull,
    }
}
