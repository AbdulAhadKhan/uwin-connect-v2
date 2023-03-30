import { IconContext } from 'react-icons'
import { AiOutlineLike } from 'react-icons/ai'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'

import { unixTimeToDateTime } from '../../../utils'
import { NameTag } from '../navbar/right'

import testImage from '../../../assets/images/placeholder.png'

import './post-card.css'

export default function PostCard({ post }) {
    console.log(post)
    const { dateFull, timeFull } = unixTimeToDateTime(post.timestamp)

    return (
        <div className='post-card'>
            {post.image && (
                <div className='post-image-container'>
                    <img
                        src={`http://localhost:8000/get-image/${post.image}`}
                        alt='profile'
                    />
                </div>
            )}
            <div className='post-card-header'>
                <NameTag email={post.email} />
                <div className='post-card-header-date'>
                    {dateFull} <br />
                    {timeFull}
                </div>
            </div>
            <div className='post-card-body'>
                <p>{post.description}</p>
            </div>
            <div className='post-card-footer two-col'>
                <div className='post-card-footer-left'>
                    <p>{post.comments ? post.comments.length : 0} comments</p>
                </div>
                <div className='post-card-footer-right'>
                    <div className='interaction-container'>
                        <p>{post.likes ? post.likes.length : 0} likes</p>
                        <IconContext.Provider
                            value={{ className: 'post-icon' }}>
                            <AiOutlineLike />
                        </IconContext.Provider>
                    </div>
                    <div className='interaction-container'>
                        <p>Comment</p>
                        <IconContext.Provider
                            value={{ className: 'post-icon' }}>
                            <HiOutlineChatBubbleOvalLeft />
                        </IconContext.Provider>
                    </div>
                </div>
            </div>
        </div>
    )
}
