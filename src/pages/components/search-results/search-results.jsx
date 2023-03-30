import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import FallbackAvatar from '../FallbackAvatar'
import { findUser } from '../../../api/users'

import './search-results.css'

function Result({ result }) {
    const id = result.email.split('@')[0]
    const navigate = useNavigate()
    const getImageLink = (imageId) =>
        `http://localhost:8000/get-image/${imageId}`

    const toProfile = () => navigate(`/profile/${id}`)

    return (
        <div className='result' onClick={toProfile}>
            <div className='search__image-container'>
                {result.image ? (
                    <img src={getImageLink(result.image)} />
                ) : (
                    <FallbackAvatar id={result.email} size='40' />
                )}
            </div>
            <div className='search__info-container'>
                <h2>
                    {result.firstname} {result.lastname}
                </h2>
                <h3>{result.email}</h3>
            </div>
        </div>
    )
}

export default function SearchResults({ query }) {
    const [results, setResults] = useState([])

    const { isFetching } = useQuery({
        queryKey: ['search', query],
        queryFn: () => findUser(query),
        onSuccess: (response) => {
            if (response.data.length > 0) setResults(response.data)
            else setResults([])
        },
        retry: (failureCount, error) => error.response.status !== 404,
    })

    return (
        <div className='results-container'>
            {((results.length === 0 || isFetching) && (
                <div className='no-results'>
                    <h2>
                        {isFetching
                            ? 'Searching... 🤔'
                            : `No results found for "${query}" 🥺`}
                    </h2>
                </div>
            )) ||
                results.map((result) => (
                    <Result result={result} key={result.email} />
                ))}
        </div>
    )
}
