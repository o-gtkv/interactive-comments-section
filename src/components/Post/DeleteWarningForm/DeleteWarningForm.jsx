import React from 'react'
import cn from 'classnames'
import styles from './DeleteWarningForm.module.css'

function DeleteWarningForm({ onCancel, onDelete }) {
    return (
        <div className={cn(styles.overlay)}>
            <form className={cn(styles.form)}>
                <div className={cn(styles.wrapper)}>
                    <h3 className={cn(styles.text)}>Delete comment</h3>
                    <p className={cn(styles.text)}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    <div className={cn(styles.buttons)}>
                        <button className={cn(styles.button, styles.buttonCancel)} type="button" onClick={onCancel}>No, Cancel</button>
                        <button className={cn(styles.button, styles.buttonDelete)} type="button" onClick={onDelete}>Yes, Delete</button>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default DeleteWarningForm