import { useState } from "react"
import { NavLink } from "react-router-dom"

import ValidatedInput from "../validated-fields/input"
import ValidatedSelect from "../validated-fields/select"

export default function Signup() {
    const [validity, setValidity] = useState({})
    const [password, setPassword] = useState("")
    const [selectedRole, setSelectedRole] = useState("default")

    const validatePassword = (password) => password.length >= 8
    const validateConfirmPassword = (confirmPassword) => confirmPassword === password
    const validateEmail = (email) => email.endsWith("@uwindsor.ca") && email.length > 13

    const validityCallback = (id, state) =>  setValidity({...validity, [id]: state})
    
    return (
        <div className="landing-form">
            <h1>Signup</h1>
            <form>
                <hr />
                <div className="scrollable">
                    <ValidatedInput type="text" id="email" placeholder="UWindsor Email" blank={false} setIsInvalid={validityCallback}
                                    hint="Here's an example: example@uwindsor.ca" customValidation={validateEmail} />
                    <ValidatedInput type="password" id="password" placeholder="Password" blank={false} 
                                    setParentState={setPassword} customValidation={validatePassword}
                                    hint="Your password must be at least 8 characters" />
                    <ValidatedInput type="password" id="confirm-password" placeholder="Confirm Password" 
                                    blank={false} customValidation={validateConfirmPassword} 
                                    hint="Your passwords don't match 🥺" />
                    <ValidatedInput type="text" id="first-name" placeholder="First Name" blank={false} />
                    <ValidatedInput type="text" id="last-name" placeholder="Last Name" blank={false} />
                    <ValidatedSelect id="role" blank={false} onChange={(event) => setSelectedRole(event.target.value)}>
                        <option value="default" disabled hidden>Role in the UWindsor...</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="staff">Staff</option>
                    </ValidatedSelect>
                    <ValidatedInput type="text" id="department" placeholder="Department or Program" blank={false} />
                    {selectedRole === "faculty" && <ValidatedInput type="text" id="designation" placeholder="Designation" blank={false} />}
                </div>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <NavLink to="/">Login</NavLink></p>
            </form>
        </div>
    )
}