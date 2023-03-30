import { useState, useRef } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IconContext } from 'react-icons'
import { GrFormClose } from 'react-icons/gr'
import { HiOutlinePhotograph } from 'react-icons/hi'

import { NameTag } from '../navbar/right'
import { createNewPost } from '../../../api/posts'

import './new-post.css'

function CreatePost({ setOpen, mutate }) {
    const id = JSON.parse(localStorage.getItem('sessionInfo')).id
    const domain = JSON.parse(localStorage.getItem('sessionInfo')).domain
    const email = id + '@' + domain

    const queryClient = useQueryClient()

    const [description, setDescription] = useState('')
    const [descriptionIsValid, setDescriptionIsValid] = useState(false)
    const [imageName, setImageName] = useState('Add an image')
    const [image, setImage] = useState(null)

    const inputRef = useRef()

    const handleClick = () => {
        if (image === null) inputRef.current.click()
        else {
            setImageName('Add an image')
            setImage(null)
        }
    }

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setImageName(event.target.files[0].name)
            setImage(event.target.files[0])
        }
    }

    const descriptionValid = (event) => {
        if (event.target.value.length > 0 && event.target.value.length <= 280) {
            setDescriptionIsValid(true)
        } else setDescriptionIsValid(false)
        setDescription(event.target.value)
    }

    const submitPost = () => {
        const formData = new FormData()
        formData.append('description', description)
        if (image) formData.append('image', image)
        formData.append('email', email)
        formData.append('timestamp', Date.now())
        mutate(formData)
        queryClient.invalidateQueries(['user-posts', email])
    }

    return (
        <div className='content-container'>
            <div className='modal-header'>
                <NameTag email={email} id={id} />
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
                value={description}
                onChange={descriptionValid}
            />
            <div className='modal-footer'>
                <div className='image-container' onClick={handleClick}>
                    <IconContext.Provider value={{ className: 'image-icon' }}>
                        <HiOutlinePhotograph />
                        <span className='image-text'>
                            {imageName.length > 20
                                ? imageName.slice(0, 20) + '...'
                                : imageName}
                        </span>
                    </IconContext.Provider>
                </div>
                <button
                    className={`modal-button ${
                        descriptionIsValid ? '' : 'deactivated'
                    }`}
                    disabled={!descriptionIsValid}
                    onClick={submitPost}>
                    Post
                </button>
                <input
                    type='file'
                    id='post-image'
                    name='post-image'
                    accept='image/*'
                    style={{ display: 'none' }}
                    ref={inputRef}
                    onChange={handleImageChange}
                />
            </div>
        </div>
    )
}

export default function NewPostModal({ setOpen }) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (formData) => createNewPost(formData),
        onSuccess: () => setOpen(false),
    })

    return (
        <div
            className='new-post-modal-background'
            onClick={() => setOpen(false)}>
            <div
                className='modal-container'
                onClick={(event) => event.stopPropagation()}>
                {(isLoading && <h2>Submitting your post... 🏃🏻‍♀️</h2>) || (
                    <CreatePost setOpen={setOpen} mutate={mutate} />
                )}
            </div>
        </div>
    )
}
