import { v4 } from 'uuid'

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

export default function CommentBox({ comments }) {
    return (
        <div className='comment-box'>
            {comments?.map((comment) => (
                <Comment key={v4()} comment={comment} />
            ))}
        </div>
    )
}
