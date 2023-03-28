import Left from './left'
import Center from './center'
import Right from './right'

import './navbar.css'

export default function Navbar({ hideCreate, value }) {
    return (
        <nav className='navbar tripple-grid'>
            <Left hideCreate={hideCreate} />
            <Center value={value} />
            <Right />
        </nav>
    )
}
