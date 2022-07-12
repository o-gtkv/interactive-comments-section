export function postReducer(state = {}, action) {
    switch (action.type) {
        case 'ADD_POST':
            return [...state, action.newPost]
        case 'DELETE_POST':
            return action.comments
        default:
            return state
    }
}
