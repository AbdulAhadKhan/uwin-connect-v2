import { useState, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'

import { likePost, unlikePost } from '../../../api/posts'
import { unixTimeToDateTime } from '../../../utils'
import CommentBox from './comment-box'
import { NameTag } from '../navbar/right'

import './post-card.css'

export default function PostCard({ post }) {
    const currentUserId = JSON.parse(localStorage.getItem('sessionInfo')).id
    const currentUserDomain = JSON.parse(
        localStorage.getItem('sessionInfo')
    ).domain
    const currentUserEmail = currentUserId + '@' + currentUserDomain

    const { dateFull, timeFull } = unixTimeToDateTime(post.timestamp)

    const [likes, setLikes] = useState(post.likes)
    const [isLiked, setIsLiked] = useState(false)
    const [comments, setComments] = useState()

    useEffect(() => {
        setLikes(post.likes)
        if (post.likes && post.likes.includes(currentUserEmail))
            setIsLiked(true)
        else setIsLiked(false)
    }, [post.likes])

    useEffect(() => {
        if (post.comments && post.comments.length > 0)
            setComments(post.comments)
        else setComments()
    }, [post.comments])

    const handleLike = () => {
        if (isLiked) {
            unlikePost(post.id, currentUserEmail)
            setIsLiked(false)
            setLikes(likes.filter((like) => like !== currentUserEmail))
        } else {
            likePost(post.id, currentUserEmail)
            setIsLiked(true)
            setLikes([...likes, currentUserEmail])
        }
    }

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
                    <div className='interaction-container' onClick={handleLike}>
                        <p>{likes ? likes.length : 0} likes</p>
                        {(!isLiked && (
                            <IconContext.Provider
                                value={{ className: 'post-icon' }}>
                                <AiOutlineLike />
                            </IconContext.Provider>
                        )) || (
                            <IconContext.Provider
                                value={{ className: 'post-icon liked' }}>
                                <AiFillLike />
                            </IconContext.Provider>
                        )}
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
            <div className='post-card-comments'>
                <CommentBox comments={comments} />
            </div>
        </div>
    )
}
