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
    const locale = Intl.DateTimeFormat().resolvedOptions().locale
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        hour12: true,
        minute: 'numeric',
        timeZone: timezone,
        locale: locale,
    }
    const date = Intl.DateTimeFormat(locale, options).formatToParts(
        new Date(unixTime)
    )
    const dateFull = `${date[0].value}, ${date[4].value}, ${date[6].value}`
    const timeFull = `${date[8].value}:${date[10].value} ${date[12].value}`

    return {
        date,
        dateFull,
        timeFull,
    }
}
