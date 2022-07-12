import React from 'react'
import cn from 'classnames'
import styles from './DeleteForm.module.css'

function DeleteForm() {
    return (
        <div className={cn(styles.overlay)}>
            <form className={cn(styles.form)}>
                <h3>Delete Comment</h3>
                <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className={cn(styles.actions)}>
                    <button className={cn(styles.button, styles.cancelButton)}>no, cancel</button>
                    <button className={cn(styles.button, styles.deleteButton)}>yes, delete</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteForm