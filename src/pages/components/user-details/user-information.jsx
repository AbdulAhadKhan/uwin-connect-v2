import { useState } from 'react'
import { IconContext } from 'react-icons'
import {
    HiOutlinePencilSquare,
    HiOutlineXCircle,
    HiUserPlus,
} from 'react-icons/hi2'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { putUserDetails } from '../../../api/users'

export default function UserInformation({ user, editable, areFriends }) {
    const queryClient = useQueryClient()
    const [editing, setEditing] = useState(false)
    const [firstname, setFirstname] = useState(user.firstname)
    const [firstnameValid, setFirstnameValid] = useState(true)
    const [lastname, setLastname] = useState(user.lastname)
    const [lastnameValid, setLastnameValid] = useState(true)
    const [description, setDescription] = useState(user.description)
    const [descriptionValid, setDescriptionValid] = useState(true)

    const changeEvent = (event, limit, setter, validator) => {
        if (
            event.target.value.length <= limit &&
            event.target.value.length > 0 &&
            event.target.value.match(/^[a-zA-Z ]+$/)
        ) {
            validator(true)
        } else validator(false)
        setter(event.target.value)
    }

    const cancelEdit = () => {
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setDescription(user.description)
        setEditing(false)
    }

    const changeMode = () => (editing ? cancelEdit() : setEditing(true))

    const submitEdit = useMutation({
        mutationFn: () =>
            putUserDetails(user.email, { firstname, lastname, description }),
        onSuccess: () => {
            setEditing(false)
            queryClient.invalidateQueries(['user-profile', user.email])
        },
    })

    return (
        <div className='user-details__info'>
            {(editable && (
                <div className='user-details__action edit' onClick={changeMode}>
                    <IconContext.Provider
                        value={{
                            className: `user-details__action-icon edit ${
                                editing ? 'cancel' : ''
                            }`,
                        }}>
                        {editing ? (
                            <HiOutlineXCircle />
                        ) : (
                            <HiOutlinePencilSquare />
                        )}
                    </IconContext.Provider>
                </div>
            )) ||
                (!areFriends && !editable && (
                    <div className='user-details__action add'>
                        <IconContext.Provider
                            value={{
                                className: 'user-details__action-icon add',
                            }}>
                            <HiUserPlus />
                        </IconContext.Provider>
                    </div>
                ))}
            {(editing && editable && (
                <>
                    <span className='user-details__name-edit'>
                        <input
                            className='first-name-edit'
                            type='text'
                            placeholder='First Name'
                            value={firstname}
                            onChange={(event) =>
                                changeEvent(
                                    event,
                                    20,
                                    setFirstname,
                                    setFirstnameValid
                                )
                            }
                        />
                        <input
                            className='last-name-edit'
                            type='text'
                            placeholder='Last Name'
                            value={lastname}
                            onChange={(event) =>
                                changeEvent(
                                    event,
                                    20,
                                    setLastname,
                                    setLastnameValid
                                )
                            }
                        />
                    </span>
                </>
            )) || (
                <h1 className='user-details__name'>
                    {user.firstname} {user.lastname}
                </h1>
            )}
            <h2 className='user-details__email'>{user.email}</h2>
            <hr />
            <p className='role-department'>
                {user.role.designation || user.role.title} |{' '}
                {user.role.department}
            </p>

            <div className='description'>
                {(editing && editable && (
                    <textarea
                        className='user-details__description-edit'
                        type='text'
                        placeholder='Description'
                        value={description}
                        onChange={(event) => {
                            if (event.target.value.length <= 200) {
                                setDescription(event.target.value)
                                setDescriptionValid(true)
                            } else setDescriptionValid(false)
                        }}
                    />
                )) || (
                    <p>{user.description || 'A valued member of UWindsor.'}</p>
                )}
            </div>

            {editing && editable && (
                <button
                    className='save-edit-button'
                    disabled={
                        !firstnameValid || !lastnameValid || !descriptionValid
                    }
                    onClick={submitEdit.mutate}>
                    Save
                </button>
            )}
        </div>
    )
}
