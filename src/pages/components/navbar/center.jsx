import { useState, useEffect } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { BiSearchAlt } from 'react-icons/bi'

export default function Center({ value }) {
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState(value || '')

    useEffect(() => {
        setSearchValue(value)
    }, [])

    function onEnter(event) {
        if (event.key === 'Enter') {
            const params = createSearchParams({ query: event.target.value })
            event.target.blur()
            navigate({ pathname: '/search', search: params.toString() })
        }
    }

    return (
        <div className='center'>
            <div className='navbar__search'>
                <div className='search-container'>
                    <input
                        type='text'
                        placeholder='Search here...'
                        onKeyDown={onEnter}
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                    <BiSearchAlt className='search-icon' />
                </div>
            </div>
        </div>
    )
}
