import { v4 } from 'uuid'
import { useState } from 'react'

import { NameTag } from '../navbar/right'
import { unixTimeToDateTime } from '../../../utils'
import { addComment } from '../../../api/posts'

function Comment({ comment }) {
    const id = comment.email.split('@')[0]
    const { dateFull, timeFull } = unixTimeToDateTime(comment.timestamp)

    return (
        <div className='comment'>
            <NameTag email={comment.email} id={id} />
            <div className='comment-text-container'>
                <div className='comment-text'>{comment.comment}</div>
            </div>
            <div className='comment-date'>
                {dateFull} {timeFull}
            </div>
        </div>
    )
}

function AddComment({ postId }) {
    const [comment, setComment] = useState('')
    const [validComment, setValidComment] = useState(false)
    const currentUserId = JSON.parse(localStorage.getItem('sessionInfo')).id
    const currentUserDomain = JSON.parse(
        localStorage.getItem('sessionInfo')
    ).domain
    const currentUserEmail = currentUserId + '@' + currentUserDomain

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('email', currentUserEmail)
        formData.append('comment', comment)
        formData.append('timestamp', Date.now())
        addComment(postId, formData)
        setComment('')
        setValidComment(false)
    }

    const handleCommentChange = (e) => {
        setComment(e.target.value)
        if (e.target.value.length > 0) setValidComment(true)
        else setValidComment(false)
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && validComment) {
            handleSubmit(e)
            e.target.blur()
        }
    }

    return (
        <div className='comment new'>
            <textarea
                placeholder='Add a comment...'
                value={comment}
                onChange={handleCommentChange}
                onKeyDown={handleEnterPress}
            />
            <button onClick={handleSubmit} disabled={!validComment}>
                Post
            </button>
        </div>
    )
}

export default function CommentBox({ comments, postId }) {
    return (
        <div className='comment-box'>
            <AddComment postId={postId} />
            {comments?.map((comment) => (
                <Comment key={v4()} comment={comment} />
            ))}
        </div>
    )
}
