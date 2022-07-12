import _ from 'lodash'

// find post/reply with "id" and delete one
function findPostAndDel(comments, id) {
    // search in posts
    for (let i = 0; i < comments.length; ++i) {
        if (comments[i].id === id) {
            comments.splice(i, 1)
            return
        }
        // search in the replies to the post
        for (let j = 0; j < comments[i].replies.length; ++j) {
            if (comments[i].replies[j].id === id) {
                comments[i].replies.splice(j, 1)
                return
            }
        }
    }
}

function findAndAddReply(comments, id, newPost) {
    for (let i = 0; i < comments.length; ++i) {
        if (comments[i].id === id) {
            comments[i].replies.push(newPost)
            return
        }
        // search in the replies to the post
        for (let j = 0; j < comments[i].replies.length; ++j) {
            if (comments[i].replies[j].id === id) {
                comments[i].replies.push(newPost)
                return
            }
        }
    }
}

export function postReducer(state = {}, action) {
    let comments = null
    switch (action.type) {
        case 'ADD_POST':
            return [...state, action.newPost]
        case 'DELETE_POST':
            comments = _.cloneDeep(state)       // deep copy all the state (which contents only the comments list)
            findPostAndDel(comments, action.id) // find and delete the post with the "id"
            return comments                     // return new state
        case 'ADD_REPLY':
            comments = _.cloneDeep(state)
            const { id, newPost } = action.payload
            findAndAddReply(comments, id, newPost)
            return comments
        default:
            return state
    }
}
