import { useState } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { BiSearchAlt } from 'react-icons/bi'
import { useQueryClient } from '@tanstack/react-query'

export default function Center({ value }) {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState(value || '')

    function onEnter(event) {
        if (event.key === 'Enter' && event.target.value) {
            const params = createSearchParams({ query: event.target.value })
            event.target.blur()
            queryClient.invalidateQueries('search')
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
