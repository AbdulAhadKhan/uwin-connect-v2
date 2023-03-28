import { useNavigate } from 'react-router-dom'

import UWinLogo from '../../../assets/images/UW Logo.svg'

function CreatePostButton() {
    return (
        <button className='create-post-button'>
            <span className='add-post'> New Post</span>
        </button>
    )
}

export default function Left({ hideCreate }) {
    const navigate = useNavigate()

    return (
        <div className='left'>
            <div className='navbar__logo' onClick={() => navigate('/home')}>
                <img src={UWinLogo} alt='UWin Logo' />
                <h1>UWin Connect</h1>
            </div>
            {!hideCreate && <CreatePostButton />}
        </div>
    )
}
