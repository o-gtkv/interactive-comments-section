import React, { useRef, useContext } from 'react'
import cn from 'classnames'
import { UserContext } from '../../context/userContext'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { newId } from '../../util'
import styles from './ReplyForm.module.css'

function ReplyForm({ replyingToId, replyingToUsername, onReplyButtonClick }) {
    const dispatch = useDispatch()
    const currentUser = useContext(UserContext)
    const textareaEl = useRef(null)

    const handleReplyButtonClick = () => {
        dispatch({
            type: 'ADD_REPLY',
            payload: {
                id: replyingToId,
                newPost: {
                    id: newId(),
                    content: textareaEl.current.value,
                    createdAt: 'now',
                    score: 0,
                    replyingTo: replyingToUsername,
                    user: _.cloneDeep(currentUser)
                }
            }
        })
        textareaEl.current.value = ''
        onReplyButtonClick()
    }
    return (
        <form className={cn(styles.form)}>
            <img className={cn(styles.avatar)} src={currentUser.image.png} alt="avatar" />
            <textarea className={cn(styles.textarea)} rows="3" placeholder="Add a comment..." ref={textareaEl}></textarea>
            <button className={cn(styles.replyButton)} type="button" onClick={handleReplyButtonClick}>reply</button>
        </form>
    )
}

export default ReplyForm