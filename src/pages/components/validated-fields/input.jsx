import { useState } from 'react'

function validateInput(input, setErrorState, setValidity, customValidation, blank) {
    customValidation = customValidation || ((input) => true)
    
    if (!blank && input === "" || !customValidation(input)) {
        setErrorState(" error")
        if (setValidity) setValidity(false)
    } else {
        setErrorState("")
        if (setValidity) setValidity(true)
    }
}

function onBlurEvent(event, setErrorState, setValidity, customValidation, blank, setParentState) {
    validateInput(event.target.value, setErrorState, setValidity, customValidation, blank)
    if (setParentState) setParentState(event.target.value)
}

export default function ValidatedInput({type, id, placeholder, className="", setIsInvalid,
                                        hint, customValidation , blank=true, setParentState}) {
    const [errorState, setErrorState] = useState("")
    const validityWrapper = (validity) => setIsInvalid ? setIsInvalid(id, validity) : null

    return (
        <div className="validated-input">
            <input type={type} id={id} placeholder={placeholder} className={ className + errorState} 
             onBlur={event => onBlurEvent(event, setErrorState, validityWrapper, customValidation, blank, setParentState) }/>
            {(hint !== undefined && errorState !== "") && <p className="hint">{hint}</p>}
        </div>
    )
}