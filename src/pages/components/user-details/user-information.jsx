import { useState } from 'react'
import { IconContext } from 'react-icons'
import { HiOutlinePencilSquare, HiOutlineXCircle } from 'react-icons/hi2'

export default function UserInformation({ user, editable }) {
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

    return (
        <div className='user-details__info'>
            {editable && (
                <div className='user-details__edit' onClick={changeMode}>
                    <IconContext.Provider
                        value={{
                            className: `user-details__edit-icon ${
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
            )}
            {(editing && (
                <>
                    <input
                        className='user-details__name-edit'
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
                        className='user-details__name-edit'
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
                {(editing && (
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

            {editing && (
                <div className='user-details__save'>
                    <button
                        className='user-details__save-button'
                        disabled={
                            !firstnameValid ||
                            !lastnameValid ||
                            !descriptionValid
                        }>
                        Save
                    </button>
                </div>
            )}
        </div>
    )
}
