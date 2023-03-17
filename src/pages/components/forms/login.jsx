import ValidatedInput from "../validated-fields/input"

export default function Login() {
    return (
        <div className="landing-form">
            <h1>Login</h1>
            <form>
                <hr />
                <ValidatedInput type="text" id="email" placeholder="UWindsor Email" blank={false} />
                <ValidatedInput type="password" id="password" placeholder="Password" blank={false} />
                <button type="submit">Log In</button>
                <p>Don't have an account? <a href="#">Sign Up</a></p>
            </form>
        </div>
    )
}