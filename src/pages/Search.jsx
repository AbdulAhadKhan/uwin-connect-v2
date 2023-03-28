import { Navigate, useSearchParams } from 'react-router-dom'

import Navbar from './components/navbar/navbar'
import SearchResults from './components/search-results/search-results'

import './Search.css'

export default function Search() {
    const [searchParams] = useSearchParams()

    if (!localStorage.getItem('sessionInfo')) {
        return <Navigate to='/' />
    }

    return (
        <div className='search naved-page'>
            <Navbar hideCreate value={searchParams.get('query')} />
            <SearchResults query={searchParams.get('query')} />
        </div>
    )
}
