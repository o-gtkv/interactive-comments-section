import React, { useRef, useContext } from 'react'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { UserContext } from '../../context/userContext'
import _ from 'lodash'
import Media from 'react-media'
import { newId } from '../../util'
import styles from './SendForm.module.css'

function SendForm({ image }) {
    const dispatch = useDispatch()
    const currentUser = useContext(UserContext)
    const textareaEl = useRef(null)

    const handleSendButtonClick = () => {
        dispatch({
            type: 'ADD_POST',
            payload: {
                newPost: {
                    id: newId(),
                    content: textareaEl.current.value,
                    createdAt: 'now',
                    score: 0,
                    replies: [],
                    user: _.cloneDeep(currentUser)
                }
            }
        })
        textareaEl.current.value = ''
    }

    return (
        <div>
            <Media queries={{
                mobile: "(max-width: 500px)",
                desktop: "(min-width: 501px)",
            }}>
                {matches => (
                    <>
                        {
                            matches.mobile &&
                            <form className={cn(styles.form)}>
                                <textarea className={cn(styles.textarea)} rows="7" placeholder="Add a comment..." ref={textareaEl}></textarea>
                                <div className={cn(styles.footer)}>
                                    <img className={cn(styles.avatar)} src={image} alt="avatar" />
                                    <button className={cn(styles.sendButton)} type="button" onClick={handleSendButtonClick}>Send</button>
                                </div>
                            </form>
                        }
                        {
                            matches.desktop &&
                            <form className={cn(styles.form)}>
                                <img className={cn(styles.avatar)} src={image} alt="avatar" />
                                <textarea className={cn(styles.textarea)} rows="7" placeholder="Add a comment..." ref={textareaEl}></textarea>
                                <button className={cn(styles.sendButton)} type="button" onClick={handleSendButtonClick}>Send</button>
                            </form>
                        }
                    </>
                )}
            </Media>
        </div>
    )
}

export default SendForm