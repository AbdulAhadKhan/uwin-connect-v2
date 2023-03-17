import ValidatedInput from "../../validated-fields/input"
import ValidatedSelect from "../../validated-fields/select"

export default function Signup() {
    return (
        <div className="landing-form">
            <h1>Signup</h1>
            <form>
                <hr />
                <div className="scrollable">
                    <ValidatedInput type="text" id="first-name" placeholder="First Name" blank={false} />
                    <ValidatedInput type="text" id="last-name" placeholder="Last Name" blank={false} />
                    <ValidatedSelect id="role" blank={false} >
                        <option value="default" disabled hidden>Select your role...</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                        <option value="staff">Staff</option>
                    </ValidatedSelect>
                    <ValidatedInput type="text" id="department" placeholder="Department or Program" blank={false} />
                    <ValidatedInput type="text" id="designation" placeholder="Designation" blank={false} />
                    <ValidatedInput type="text" id="email" placeholder="UWindsor Email" blank={false} />
                    <ValidatedInput type="password" id="password" placeholder="Password" blank={false} />
                    <ValidatedInput type="password" id="confirm-password" placeholder="Confirm Password" blank={false} />
                </div>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <a href="#">Log In</a></p>
            </form>
        </div>
    )
}