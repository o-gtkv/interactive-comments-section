import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import cn from 'classnames'
import Post from '../Post/Post'
import SendForm from '../SendForm/SendForm'
import { UserContext } from '../../context/userContext'
import styles from './PostList.module.css'

function PostList() {
    const comments = useSelector(comments => comments)
    const currentUser = useContext(UserContext)

    return (
        <div className={cn(styles.postList)}>
            {
                comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <div>
                                <Post
                                    id={comment.id}
                                    username={comment.user.username}
                                    image={comment.user.image.png}
                                    createdAt={comment.createdAt}
                                    text={comment.content}
                                    raiting={comment.score}
                                    isAuth={currentUser.username === comment.user.username}
                                />
                            </div>
                            <div className={cn(styles.replyiesList)}>
                                {
                                    comment.replies.map(reply => {
                                        return (
                                            <Post
                                                key={reply.id}
                                                id={reply.id}
                                                username={reply.user.username}
                                                image={reply.user.image.png}
                                                createdAt={reply.createdAt}
                                                text={reply.content}
                                                raiting={reply.score}
                                                replyingTo={reply.replyingTo}
                                                replyingToPostId={comment.id}
                                                isAuth={currentUser.username === reply.user.username}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
            <SendForm image={currentUser.image.png} />
        </div>
    )
}

export default PostList