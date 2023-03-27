import { useState, useRef } from 'react'
import { IconContext } from 'react-icons'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { BsCheck, BsX } from 'react-icons/bs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { uploadProfileImage } from '../../../api/images'
import FallbackAvatar from '../FallbackAvatar'
import './user-details.css'

function ImageOrAvatar({ imageSource, id }) {
    return (
        <>
            {imageSource ? (
                <img src={imageSource} alt='User Avatar' />
            ) : (
                <FallbackAvatar id={id} square />
            )}
        </>
    )
}

function UserAvatar({ imageID, id }) {
    const queryClient = useQueryClient()
    const domain = JSON.parse(localStorage.getItem('sessionInfo')).domain
    const email = `${id}@${domain}`
    const generateImageLink = (iid) => `http://localhost:8000/get-image/${iid}`
    const iconProps = { size: '2em', color: '#454545' }

    const inputRef = useRef()

    const [previewImage, setPreviewImage] = useState(
        imageID ? generateImageLink(imageID) : ''
    )
    const [uploadImage, setUploadImage] = useState()
    const [mouseOver, setMouseOver] = useState(false)

    const handleClick = () => inputRef.current.click()
    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setUploadImage(event.target.files[0])
        }
    }

    const handleCancel = () => {
        setPreviewImage(imageLink)
        setUploadImage()
    }

    const handleUpload = useMutation({
        mutationFn: () => {
            const formData = new FormData()
            formData.append('image', uploadImage)
            uploadProfileImage(formData, email)
        },
        onSuccess: (response) => {
            setUploadImage()
            setPreviewImage(generateImageLink(response.data))
        },
        onSettled: () => queryClient.invalidateQueries(['user', email]),
    })

    return (
        <div className='avatar-container'>
            <div
                className='user-details__avatar'
                onMouseEnter={() => setMouseOver(true)}
                onMouseLeave={() => setMouseOver(false)}
                onClick={handleClick}>
                {mouseOver && (
                    <div className='avatar-overlay'>
                        <input
                            type='file'
                            id='avatar'
                            name='avatar'
                            accept='image/*'
                            style={{ display: 'none' }}
                            ref={inputRef}
                            onChange={handleImageChange}
                        />
                        <h1 className=''>Change Image</h1>
                    </div>
                )}
                <ImageOrAvatar imageSource={previewImage} id={id} />
            </div>
            {uploadImage && (
                <div className='upload-actions'>
                    <button className='confirm' onClick={handleUpload.mutate}>
                        <BsCheck {...iconProps} />
                    </button>
                    <button className='cancel' onClick={handleCancel}>
                        <BsX {...iconProps} />
                    </button>
                </div>
            )}
        </div>
    )
}

export default function UserDetails({ user, id }) {
    const currentUser = JSON.parse(localStorage.getItem('sessionInfo')).id

    return (
        <div className='user-details'>
            <UserAvatar id={id} imageID={user.image} />
            <div className='user-details__info'>
                {currentUser === id && (
                    <div className='user-details__edit'>
                        <IconContext.Provider
                            value={{ className: 'user-details__edit-icon' }}>
                            <HiOutlinePencilSquare />
                        </IconContext.Provider>
                    </div>
                )}
                <h1 className='user-details__name'>
                    {user.firstname} {user.lastname}
                </h1>
                <h2 className='user-details__email'>{user.email}</h2>
                <hr />
                <p className='role-department'>
                    {user.role.designation || user.role.title} |{' '}
                    {user.role.department}
                </p>
                <div className='description'>
                    <p>{user.description || 'A valued member of UWindsor.'}</p>
                </div>
            </div>
        </div>
    )
}
