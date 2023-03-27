import { Link } from 'react-router-dom'
import lost from './../assets/images/404.svg'

import './404.css'

export default function NotFound() {
    return (
        <div className="page-404">
            <img src={lost} alt="404" />
            <p>You seem lost 🥺. <Link to="/">Let me help you!</Link></p>
        </div>
    )
}