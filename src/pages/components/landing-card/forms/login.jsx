export default function Login() {
    return (
        <div className="landing-form">
            <h1>Sign In</h1>
            <form>
                <hr />
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <button type="submit">Log In</button>
                <p>Don't have an account? <a href="#">Sign Up</a></p>
            </form>
        </div>
    )
}