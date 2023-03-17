import { Player } from '@lottiefiles/react-lottie-player'
import animation from '../assets/animations/404.json'

import './404.css'

export default function NotFound() {
    return <Player src={animation} autoplay loop className="animation" />
}