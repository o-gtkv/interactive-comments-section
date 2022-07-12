import React, { useRef, useContext } from 'react'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { UserContext } from '../../context/userContext'
import _ from 'lodash'
import styles from './SendForm.module.css'

let newId = 10

function SendForm({ image }) {
    const dispatch = useDispatch()
    const currentUser = useContext(UserContext)
    const textareaEl = useRef(null)

    const handleSendButtonClick = () => {
        dispatch({
            type: 'ADD_POST',
            newPost: {
                id: newId++,
                content: textareaEl.current.value,
                createdAt: 'now',
                score: 0,
                replies: [],
                user: _.cloneDeep(currentUser)
            }
        })
        textareaEl.current.value = ''
    }

    return (
        <div>
            <form className={cn(styles.form)}>
                <textarea className={cn(styles.textarea)} rows="7" placeholder="Add a comment..." ref={textareaEl}></textarea>
                <div className={cn(styles.footer)}>
                    <img className={cn(styles.avatar)} src={image} alt="avatar" />
                    <button className={cn(styles.sendButton)} type="button" onClick={handleSendButtonClick}>Send</button>
                </div>
            </form>
        </div>
    )
}

export default SendForm