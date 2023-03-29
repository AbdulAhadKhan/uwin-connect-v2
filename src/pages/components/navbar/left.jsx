import { useNavigate } from 'react-router-dom'

import UWinLogo from '../../../assets/images/UW Logo.svg'

function CreatePostButton({ setModalOpen }) {
    return (
        <button
            className='create-post-button'
            onClick={() => setModalOpen(true)}>
            <span className='add-post'> New Post</span>
        </button>
    )
}

export default function Left({ hideCreate, setModalOpen }) {
    const navigate = useNavigate()

    return (
        <div className='left'>
            <div className='navbar__logo' onClick={() => navigate('/home')}>
                <img src={UWinLogo} alt='UWin Logo' />
                <h1>UWin Connect</h1>
            </div>
            {!hideCreate && <CreatePostButton setModalOpen={setModalOpen} />}
        </div>
    )
}
