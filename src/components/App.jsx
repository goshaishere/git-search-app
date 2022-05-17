import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import Main from './main/Main'
import Card from './card/Card'
import Error from './main/Error'

const App = () => {
    const dispatch = useDispatch()
    
    
    return (
        <BrowserRouter>
            <Routes> 
                    <Route path="/" element={<Main />} />
                    <Route path="/card/:username/:reponame" element={<Card />} />
                    <Route path="/error" element={<Error />} />
                    <Route path="*" element={<Navigate to ="/" />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App

//