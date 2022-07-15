import cn from 'classnames'
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import ReplyForm from '../ReplyForm/ReplyForm'
import DeleteWarningForm from './DeleteWarningForm/DeleteWarningForm'
// import { UserContext } from '../../context/userContext'
// import _ from 'lodash'
import styles from './Post.module.css'

function Caption({ username, image, createdAt, isAuth }) {
    return (
        <div className={cn(styles.caption)}>
            <img className={cn(styles.avatar)} src={image} alt={`${username}'s avatar`} />
            <span className={cn(styles.username)}>{username}</span>
            {
                isAuth ? <div className={cn(styles.auth)}>you</div> : null
            }
            <span className={cn(styles.createdAt)}>{createdAt}</span>
        </div >
    )
}

function Raiting({ value = 0 }) {
    const [raiting, setRaiting] = useState(value)

    const handleMinusClick = () => {
        setRaiting(raiting - 1)
    }

    const handlePlusClick = () => {
        setRaiting(raiting + 1)
    }

    return (
        <div className={cn(styles.raiting)}>
            <button className={cn(styles.raitingButton, styles.raitingButtonPlus)} onClick={handlePlusClick} >+</button>
            <input
                className={cn(styles.raitingValue)}
                type="text"
                value={raiting}
                disabled
            />
            <button className={cn(styles.raitingButton, styles.raitingButtonMinus)} onClick={handleMinusClick}>-</button>
        </div>
    )
}

function DeleteButton({ onClick }) {
    return (
        <button className={cn(styles.button, styles.deleteButton)} onClick={onClick}>
            <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" /></svg>
            Delete
        </button>
    )
}

function EditButton({ onClick }) {
    return (
        <button className={cn(styles.button, styles.editButton)} onClick={onClick}>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" /></svg>
            Edit
        </button>
    )
}

function ReplyButton({ onClick }) {
    return (
        <button className={cn(styles.button, styles.replyButton)} onClick={onClick}>
            <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" /></svg>
            Reply
        </button>
    )
}

function EditForm({ id, closeUpdateForm }) {
    const textareaEl = useRef(null)
    const dispatch = useDispatch()

    const handleUpdateButtonClick = () => {
        dispatch({
            type: 'UPDATE_POST',
            payload: {
                text: textareaEl.current.value,
                id
            }
        })
        closeUpdateForm()
    }

    return (
        <form className={cn(styles.editForm)}>
            <textarea className={cn(styles.textarea)} name="" id="" cols="30" rows="3" ref={textareaEl}></textarea>
            <button className={cn(styles.updateButton)} type="button" onClick={handleUpdateButtonClick}>Update</button>
        </form >
    )
}

function Post({ id, username, image, createdAt, text, raiting, replyingTo, replyingToPostId = null, isAuth = false }) {
    const [replyIsActive, setReplyIsActive] = useState(false)
    const dispatch = useDispatch()
    const [editIsActive, setEditIsActive] = useState(false)
    const [deleteIsActive, setDeleteIsActive] = useState(false)

    const handleEditButtonClick = () => {
        setEditIsActive(!editIsActive)
    }

    const handleReplyButtonOnClick = () => {
        setReplyIsActive(!replyIsActive)
    }

    const handleDeleteButtonClick = () => {
        // dispatch({                          // update the state with new one
        //     type: 'DELETE_POST',
        //     payload: {
        //         id
        //     }
        // })
        setDeleteIsActive(true)
    }

    const closeReplyForm = () => {
        setReplyIsActive(false)
    }

    const closeUpdateForm = () => {
        setEditIsActive(!editIsActive)
    }

    return (
        <>
            <div className={cn(styles.comment)}>
                <Caption username={username} image={image} createdAt={createdAt} isAuth={isAuth} />
                {
                    editIsActive ?
                        <EditForm id={id} closeUpdateForm={closeUpdateForm} />
                        :
                        <p className={cn(styles.text)}>
                            {
                                replyingTo ?
                                    <span className={cn(styles.replyingTo)}>{`@${replyingTo} `}</span>
                                    :
                                    null
                            }
                            {text}
                        </p>
                }
                <div className={cn(styles.footer)}>
                    <Raiting value={raiting} />
                    {
                        isAuth ?
                            <div style={{ display: 'flex' }}>
                                <DeleteButton onClick={handleDeleteButtonClick} />
                                <EditButton onClick={handleEditButtonClick} />
                            </div>
                            :
                            <ReplyButton onClick={handleReplyButtonOnClick}>Reply</ReplyButton>
                    }
                </div>
            </div>
            {
                replyIsActive ? <ReplyForm replyingToId={id} replyingToUsername={username} closeReplyForm={closeReplyForm} /> : null
            }
            {
                deleteIsActive ?
                    <DeleteWarningForm
                        onCancel={() => setDeleteIsActive(false)}
                        onDelete={() => {
                            dispatch({
                                type: 'DELETE_POST',
                                payload: {
                                    id
                                }
                            })
                        }}
                    />
                    :
                    null
            }
        </>
    )
}

export default Post
