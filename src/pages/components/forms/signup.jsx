import { useState } from "react"
import { Formik, Field, Form } from "formik"
import { NavLink, useNavigate } from "react-router-dom"

import { instance, getSHA256Hash } from "../../../utils"

export default function Signup() {
    const navigate = useNavigate()
    const [signupError, setSignupError] = useState("")
    
    const validateEmail = (email) => {
        let error = ""
        if (!email.endsWith("@uwindsor.ca") || email.length < 13)
            error = "You need a UWindsor email to sign up 🥺"
        return error
    }

    const validatePassword = (password) => {
        let error = ""
        if (!password || password.length < 8)
            error = "Password must be at least 8 characters"
        return error
    }

    const validateConfirmPassword = (confirmPassword, password) => {
        let error = ""
        if (confirmPassword !== password)
            error = "Passwords do not match"
        return error
    }

    const validateGender = (role) => {
        let error = ""
        if (role === "default")
            error = "Gender is required"
        return error
    }

    const validateRole = (role) => {
        let error = ""
        if (role === "default")
            error = "Role is required"
        return error
    }

    const validateRequired = (value, name) => {
        let error = ""
        if (!value)
            error = `${name} is required`    
        return error
    }

    async function onSubmit(values) {
        const {designation, department, role, 
            confirmPassword, password, ...rest} = values
        const data = {
            ...rest,
            password: await getSHA256Hash(password),
            role: {
                title: role,
                department: department,
                designation: designation
            }
        }

        await instance.post("/signup", data).then(() => navigate("/"))
            .catch((error) => {
            if (error.response.status === 409)
                setSignupError("Email already exists")
            else
                setSignupError("Something went wrong")
        })
    }

    return (
        <div className="landing-form">
            <h1>Signup</h1>
            <hr />
            {signupError && <p className="prompt">{signupError}</p>}
            <Formik initialValues={{ email: "", password: "", confirmPassword: "",
                firstname: "", lastname: "", gender: "default", role: "default", 
                department: "", designation: "" }} onSubmit={onSubmit}>
                    {({ errors, touched, values }) => (
                        <Form>
                            <div className="scrollable">
                                <Field name="email" type="email" placeholder="Email" validate={validateEmail} />
                                {errors.email && touched.email && <p className="hint">{errors.email}</p>}
                                <Field name="password" type="password" placeholder="Password" validate={validatePassword} />
                                {errors.password && touched.password && <p className="hint">{errors.password}</p>}
                                <Field name="confirmPassword" type="password" placeholder="Confirm Password"
                                    validate={(confirmPassword) => validateConfirmPassword(confirmPassword, values.password)} />
                                {errors.confirmPassword && touched.confirmPassword && <p className="hint">{errors.confirmPassword}</p>}
                                <Field name="firstname" type="text" placeholder="First Name"
                                    validate={(firstname) => validateRequired(firstname, "First Name")} />
                                {errors.firstname && touched.firstname && <p className="hint">{errors.firstname}</p>}
                                <Field name="lastname" type="text" placeholder="Last Name"
                                    validate={(lastname) => validateRequired(lastname, "Last Name")} />
                                {errors.lastname && touched.lastname && <p className="hint">{errors.lastname}</p>}
                                <Field name="gender" as="select" validate={validateGender}>
                                    <option value="default" disabled hidden>Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Field>
                                {errors.gender && touched.gender && <p className="hint">{errors.gender}</p>}
                                <Field name="role" as="select" validate={validateRole}>
                                    <option value="default" disabled hidden>Your role in UWindsor...</option>
                                    <option value="student">Student</option>
                                    <option value="faculty">Faculty</option>
                                    <option value="staff">Staff</option>
                                </Field>
                                {errors.role && touched.role && <p className="hint">{errors.role}</p>}
                                <Field name="department" type="text" placeholder="Department" 
                                    validate={(department) => validateRequired(department, "Department")} />
                                {errors.department && touched.department && <p className="hint">{errors.department}</p>}
                                {values.role === "staff" && (
                                    <>
                                        <Field name="designation" type="text" placeholder="Designation"
                                            validate={(designation) => validateRequired(designation, "Designation")} />
                                        {errors.designation && touched.designation && <p className="hint">{errors.designation}</p>}
                                    </>
                                )}
                            </div>
                            <button type="submit">Sign Up</button>
                        </Form>
                    )}
            </Formik>
            <p>Already have an account? <NavLink to="/">Login</NavLink></p>
        </div>
    )
}