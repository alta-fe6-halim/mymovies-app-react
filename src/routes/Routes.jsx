import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Detail from '../pages/Detail'


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/movie/:movie_id" element={<Detail />} />
                    <Route
                        path="*"
                        element={
                            <main style={{ padding: "1rem" }}>
                                <p> 404! There's nothing here!</p>
                            </main>
                        }
                    />
                </Routes>
            </BrowserRouter>
        )
    }
}

