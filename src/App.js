import React from 'react'
import Signup from './features/Signup/Signup'
import {
    BrowserRouter as Router,
    Routes,
    NavLink,
    Route
} from 'react-router-dom'
import Multistep from './features/Multistep/Multistep'

const App = () => {
    return (
        <Router>
            <nav>
                <NavLink activeStyle={{border:'dashed black 1px'}} to='signup'> Signup </NavLink>
                <NavLink activeStyle={{border:'dashed black 1px'}} to='multistep'> MultiStep</NavLink>
            </nav>
            <main>
                <Routes>
                    <Route path='signup'>
                        <Signup />
                    </Route>
                    <Route path='multistep'>
                        <Multistep />
                    </Route>
                </Routes>
            </main>
        </Router>
    )
}

export default App
