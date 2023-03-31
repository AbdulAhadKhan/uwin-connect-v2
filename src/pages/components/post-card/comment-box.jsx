import { v4 } from 'uuid'
import { useState } from 'react'

import { NameTag } from '../navbar/right'
import { unixTimeToDateTime } from '../../../utils'

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
    const currentUserId = JSON.parse(localStorage.getItem('sessionInfo')).id
    const currentUserDomain = JSON.parse(
        localStorage.getItem('sessionInfo')
    ).domain
    const currentUserEmail = currentUserId + '@' + currentUserDomain

    const handleSubmit = () => {
        // addComment(postId, currentUserEmail, comment)
        // setComment('')
    }

    return (
        <div className='comment new'>
            <textarea
                placeholder='Add a comment...'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button onClick={handleSubmit}>Post</button>
        </div>
    )
}

export default function CommentBox({ comments }) {
    return (
        <div className='comment-box'>
            <AddComment />
            {comments?.map((comment) => (
                <Comment key={v4()} comment={comment} />
            ))}
        </div>
    )
}
