import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Formik, Form, Field } from "formik"

function onSubmit(values) {
    console.log(values)
}

export default function Login() {
    const [emailErrorClass, setEmailErrorClass] = useState("")
    const [passwordErrorClass, setPasswordErrorClass] = useState("")
    
    const validateEmail = (email) => {
        let error = ""
        if (!email.endsWith("@uwindsor.ca") || email.length < 13) {
            error = "UWindsor email is required"
            setEmailErrorClass(" error")
        }
        else setEmailErrorClass("")
        return error
    }

    const validatePassword = (password) => {
        let error = ""
        if (!password)
            error = "Password is required"
        else setPasswordErrorClass("")
        return error
    }

    const fields = [
        {name: "email", type: "email", placeholder: "Email", validation: validateEmail},
        {name: "password", type: "password", placeholder: "Password", validation: validatePassword}
    ]
    
    return (
        <div className="landing-form">
            <h1>Login</h1>
            <hr />
            <Formik initialValues={{ email: "", password: "" }} onSubmit={onSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <Field name="email" type="email" placeholder="Email" validate={validateEmail} />
                        {errors.email && touched.email && <p className="hint">{errors.email}</p>}
                        <Field name="password" type="password" placeholder="Password" validate={validatePassword} />
                        {errors.password && touched.password && <p className="hint">{errors.password}</p>}
                        <button type="submit">Login</button>
                    </Form>
                )}
            </Formik>
            <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
    )
}