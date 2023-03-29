import { useState } from 'react'

import Left from './left'
import Center from './center'
import Right from './right'
import NewPostModal from '../new-post/new-post'

import './navbar.css'

export default function Navbar({ hideCreate, value }) {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <>
            <nav className='navbar tripple-grid'>
                <Left hideCreate={hideCreate} setModalOpen={setModalOpen} />
                <Center value={value} />
                <Right />
            </nav>
            {modalOpen && <NewPostModal setOpen={setModalOpen} />}
        </>
    )
}
