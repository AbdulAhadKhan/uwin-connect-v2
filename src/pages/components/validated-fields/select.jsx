import { useState } from "react"

function validateSelect(value, setErrorState, blank) {
    if (!blank && value === "default") {
        setErrorState(" error")
    } else {
        setErrorState("")
    }
}

export default function ValidatedSelect({id, className="", blank, onChange, children}) {
    const [errorState, setErrorState] = useState("")

    return <select id={id} className={className + errorState} 
            onBlur={event => validateSelect(event.target.value, setErrorState, blank)}
            defaultValue="default" onChange={(event) => onChange(event)}>
        {children}
    </select>
}