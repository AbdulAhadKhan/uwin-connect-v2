import { IconContext } from 'react-icons'
import { AiOutlineLike } from 'react-icons/ai'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'

import { unixTimeToDateTime } from '../../../utils'
import { NameTag } from '../navbar/right'

import testImage from '../../../assets/images/placeholder.png'

import './post-card.css'

export default function PostCard({ post }) {
    const { dateFull, timeFull } = unixTimeToDateTime(1680073326723)

    return (
        <div className='post-card'>
            <div className='post-image-container'>
                <img src={testImage} alt='profile' />
            </div>
            <div className='post-card-header'>
                <NameTag
                    email={'abdulahadkhan@uwindsor.ca'}
                    id={'abdulahadkhan'}
                />
                <div className='post-card-header-date'>
                    {dateFull} <br />
                    {timeFull}
                </div>
            </div>
            <div className='post-card-body'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam sapien risus, scelerisque eu cursus vitae, bibendum
                    in justo. Integer et tincidunt magna. Duis fermentum laoreet
                    accumsan. Nunc diam lectus, mattis in sollicitudin
                    tincidunt, iaculis quis magna. Curabitur vel proin.
                </p>
            </div>
            <div className='post-card-footer two-col'>
                <div className='post-card-footer-left'>
                    <p>70 comments</p>
                </div>
                <div className='post-card-footer-right'>
                    <div className='interaction-container'>
                        <p>70 likes</p>
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
