import { Formik, Field, Form } from "formik"
import { NavLink } from "react-router-dom"

function onSubmit(values) {
    console.log("Signup form submitted")
}

export default function Signup() {
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

    return (
        <div className="landing-form">
            <h1>Signup</h1>
            <hr />
            <Formik initialValues={{ email: "", password: "", confirmPassword: "",
                firstName: "", lastName: "", role: "default", department: "",
                designation: "" }} onSubmit={onSubmit}>
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
                                <Field name="firstName" type="text" placeholder="First Name"
                                    validate={(firstName) => validateRequired(firstName, "First Name")} />
                                {errors.firstName && touched.firstName && <p className="hint">{errors.firstName}</p>}
                                <Field name="lastName" type="text" placeholder="Last Name"
                                    validate={(lastName) => validateRequired(lastName, "Last Name")} />
                                {errors.lastName && touched.lastName && <p className="hint">{errors.lastName}</p>}
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
                                {values.role === "faculty" && (
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