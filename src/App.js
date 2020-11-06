import React from 'react'
import Signup from './features/Signup/Signup'
import {
    BrowserRouter as Router,
    Routes,
    NavLink,
    Route
} from 'react-router-dom'
import Multistep from './features/Multistep/Multistep'

const style = {
    fontSize: "4rem",
    textAlign: "center"    
}

const App = () => {
    return (
        <Router>
            <nav style={style}>
                <NavLink activeStyle={{border:'dashed black 3px'}} to='signup'> Signup </NavLink>
                <NavLink activeStyle={{border:'dashed black 3px'}} to='multistep'> MultiStep</NavLink>
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
