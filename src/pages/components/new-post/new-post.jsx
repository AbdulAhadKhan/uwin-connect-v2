import { IconContext } from 'react-icons'
import { GrFormClose } from 'react-icons/gr'
import { HiOutlinePhotograph } from 'react-icons/hi'

import { NameTag } from '../navbar/right'

import './new-post.css'

export default function NewPostModal({ setOpen }) {
    return (
        <div
            className='new-post-modal-background'
            onClick={() => setOpen(false)}>
            <div
                className='modal-container'
                onClick={(event) => event.stopPropagation()}>
                <div className='content-container'>
                    <div className='modal-header'>
                        <NameTag />
                    </div>
                    <IconContext.Provider value={{ className: 'close-icon' }}>
                        <GrFormClose
                            onClick={() => setOpen(false)}
                            className='close-icon'
                        />
                    </IconContext.Provider>
                    <textarea
                        placeholder='Share something...'
                        className='modal-text'
                    />
                    <div className='modal-footer'>
                        <div className='image-container'>
                            <IconContext.Provider
                                value={{ className: 'image-icon' }}>
                                <HiOutlinePhotograph />
                                <span className='image-text'>Add an image</span>
                            </IconContext.Provider>
                        </div>
                        <button className='modal-button'>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
