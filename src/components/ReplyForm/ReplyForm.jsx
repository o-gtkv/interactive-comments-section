import React from 'react'
import cn from 'classnames'
import styles from './ReplyForm.module.css'

function ReplyForm({ image }) {
    const handleReplyButtonClick = () => {

    }

    return (
        <form className={cn(styles.form)}>
            <img className={cn(styles.avatar)} src={image} alt="avatar" />
            <textarea className={cn(styles.textarea)} rows="3" placeholder="Add a comment..."></textarea>
            <button className={cn(styles.replyButton)} type="button" onClick={handleReplyButtonClick}>reply</button>
        </form>
    )
}

export default ReplyForm