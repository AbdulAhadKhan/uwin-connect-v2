import { NavLink } from "react-router-dom"

import ValidatedInput from "../validated-fields/input"

function onSubmit(event) {
    event.preventDefault()
    const form = FormData(event.target)
}

export default function Login() {
    return (
        <div className="landing-form">
            <h1>Login</h1>
            <form onSubmit={(event) => onSubmit(event)} >
                <hr />
                <ValidatedInput type="text" id="email" placeholder="UWindsor Email" blank={false} />
                <ValidatedInput type="password" id="password" placeholder="Password" blank={false} />
                <button type="submit">Log In</button>
                <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
            </form>
        </div>
    )
}