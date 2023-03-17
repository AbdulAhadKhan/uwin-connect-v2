import { useState } from 'react';

function validateInput(input, setErrorState, blank) {
    console.log(input);
    if (!blank && input === "") {
        setErrorState(" error");
    } else {
        setErrorState("");
    }
}

export default function ValidatedInput({type, id, placeholder, className="", blank}) {
    const [errorState, setErrorState] = useState("");

    return <input type={type} id={id} placeholder={placeholder} 
            className={className + errorState} onBlur={event => validateInput(event.target.value, setErrorState, blank)}/>
}