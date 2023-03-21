import axios from 'axios'

import config from './config.json'

const CONFIGS = config
export const instance = axios.create({
    baseURL: `http://${CONFIGS.host}:${CONFIGS.port}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

export async function getSHA256Hash(input) {
    const textAsBuffer = new TextEncoder().encode(input)
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", textAsBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray
      .map((item) => item.toString(16).padStart(2, "0"))
      .join("")
    return hash
}