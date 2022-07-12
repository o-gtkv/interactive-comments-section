import PostList from './components/PostList/PostList'
import { UserContext } from './context/userContext';
import data from './data/data.json'

function App() {
    return (
        <UserContext.Provider value={data.currentUser}>
            <PostList />
        </UserContext.Provider>
    )
}


export default App;
