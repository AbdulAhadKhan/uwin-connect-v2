import { Navigate, useSearchParams } from 'react-router-dom'

import Navbar from './components/navbar/navbar'

import './Search.css'

export default function Search() {
    const [searchParams] = useSearchParams()

    if (!localStorage.getItem('sessionInfo')) {
        return <Navigate to='/' />
    }

    return (
        <div className='chat naved-page'>
            <Navbar hideCreate value={searchParams.get('query')} />
            <div className='container'></div>
        </div>
    )
}
