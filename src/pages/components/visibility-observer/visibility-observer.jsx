/* 
    The source for the following code was taken from:
    https://dev.to/jmalvarez/check-if-an-element-is-visible-with-react-hooks-27h8
    all credit goes to the author of the code (José Miguel Álvarez Vañó).
    Find his GitHub profile here: https://github.com/josemiguel-alvarez
*/

import { useEffect, useState } from 'react'

export function useIsVisible(ref) {
    const [isIntersecting, setIntersecting] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) =>
            setIntersecting(entry.isIntersecting)
        )

        observer.observe(ref.current)
        return () => {
            observer.disconnect()
        }
    }, [ref])

    return isIntersecting
}
