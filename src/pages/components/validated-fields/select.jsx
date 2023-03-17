import { useState } from "react"

function validateSelect(value, setErrorState, blank) {
    if (!blank && value === "default") {
        setErrorState(" error")
    } else {
        setErrorState("")
    }
}

export default function ValidatedSelect({id, className="", blank, children}) {
    const [errorState, setErrorState] = useState("")

    return <select id={id} className={className + errorState} 
            onBlur={event => validateSelect(event.target.value, setErrorState, blank)}
            defaultValue="default">
        {children}
    </select>
}