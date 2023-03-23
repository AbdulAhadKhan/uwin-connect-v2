import { useState } from "react"
import { NavLink, useNavigate, Navigate } from "react-router-dom"
import { Formik, Form, Field } from "formik"

import { getSHA256Hash, instance } from "../../../utils"

export default function Login() {
    const navigate = useNavigate()
    const [loginError, setLoginError] = useState(false)
    
    const validateEmail = (email) => {
        let error = ""
        if (!email.endsWith("@uwindsor.ca") || email.length < 13)
            error = "UWindsor email is required"
        return error
    }

    const validatePassword = (password) => {
        let error = ""
        if (!password)
            error = "Password is required"
        return error
    }

    async function onSubmit(values) {
        const data = {
            ...values,
            password: await getSHA256Hash(values.password),
            meta: {
                machine_id: await getSHA256Hash(navigator.userAgent),
                login_time: Date.now()
            }
        }

        await instance.post("/login", data).then((login_response) => {
            instance.get(`/get-user/${values.email}`).then((user_response) => {
                localStorage.setItem("sessionInfo", JSON.stringify({
                    sessionID: login_response.data.session_id,
                    user: user_response.data,
                }))
            })
            navigate("/home")
        }).catch(() => setLoginError(true))
    }

    return (
        <div className="landing-form">
            {localStorage.getItem("sessionInfo") && <Navigate to="/home" />}
            <h1>Login</h1>
            <hr />
            {loginError && <p className="prompt">Invalid email or password</p>}
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