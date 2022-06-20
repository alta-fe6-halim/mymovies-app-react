/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Detail from '../pages/Detail'
import Homepage from '../pages/Homepage'
import Favorites from '../pages/Favorites';

import { useDispatch } from 'react-redux';
import { ThemeContext } from '../utils/context';
import { reduxAction } from '../utils/redux/actions/action';

const App = () => {
    const dispatch = useDispatch();
    const [theme, setTheme] = useState('light');
    const background = useMemo(() => ({ theme, setTheme }), [theme]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme]);


    useEffect(() => {
        const tempLocal = localStorage.getItem('favMovie');
        if (tempLocal) {
            dispatch(reduxAction('ADD_FAVORITE', JSON.parse(tempLocal)));
        }
    }, []);

    return (
        <ThemeContext.Provider value={background}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/homepage" />} />
                    <Route path="/homepage" element={<Homepage />} />
                    <Route path="/favorites" element={<Favorites />} />
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
        </ThemeContext.Provider>
    )
}

export default App;