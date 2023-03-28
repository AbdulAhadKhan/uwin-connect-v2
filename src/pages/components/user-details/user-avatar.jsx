import { useState, useRef, useEffect } from 'react'
import { BsCheck, BsX } from 'react-icons/bs'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { uploadProfileImage } from '../../../api/images'
import FallbackAvatar from '../FallbackAvatar'

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

function ImageSlector({ inputRef, handleImageChange, previewImage, id }) {
    const [mouseOver, setMouseOver] = useState(false)
    const handleClick = () => inputRef.current.click()

    return (
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
    )
}

function Avatar({ editable, inputRef, handleImageChange, previewImage, id }) {
    return (
        <>
            {(editable && (
                <ImageSlector
                    inputRef={inputRef}
                    handleImageChange={handleImageChange}
                    previewImage={previewImage}
                    id={id}
                />
            )) || (
                <div className='user-details__avatar'>
                    <ImageOrAvatar imageSource={previewImage} id={id} />
                </div>
            )}
        </>
    )
}

export default function UserAvatar({ imageID, id, editable }) {
    const queryClient = useQueryClient()
    const domain = JSON.parse(localStorage.getItem('sessionInfo')).domain
    const email = `${id}@${domain}`
    const generateImageLink = (iid) => `http://localhost:8000/get-image/${iid}`
    const iconProps = { size: '2em', color: '#454545' }

    const [uploadImage, setUploadImage] = useState()
    const [previewImage, setPreviewImage] = useState()

    const inputRef = useRef()

    useEffect(() => {
        if (imageID) {
            setPreviewImage(generateImageLink(imageID))
        }
    }, [imageID])

    const handleImageChange = (event) => {
        if (event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setUploadImage(event.target.files[0])
        }
    }

    const handleCancel = () => {
        setPreviewImage(generateImageLink(imageID))
        setUploadImage()
    }

    const handleUpload = useMutation({
        mutationFn: () => {
            const formData = new FormData()
            formData.append('image', uploadImage)
            uploadProfileImage(formData, email)
        },
        onSuccess: () => {
            setUploadImage()
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user', email])
        },
    })

    return (
        <div className='avatar-container'>
            <Avatar
                {...{ editable, inputRef, handleImageChange, previewImage, id }}
            />
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
