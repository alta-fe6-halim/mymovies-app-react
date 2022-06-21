import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import { withRouter } from '../utils/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Letter_m from '../assets/images/Letter_m.png';
import { FaSun, FaMoon } from 'react-icons/fa';
import { ThemeContext } from '../utils/context'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Header = (props) => {
    const { theme, setTheme } = useContext(ThemeContext);

    const handleThemeChange = (mode) => {
        setTheme(mode);
    };

    return (
        <div className='sticky top-0 w-full px-4 py-0 bg-gray-900'>
            <Toolbar className='flex flex-row justify-between'>
                <Link to="/" className='flex flex-row text-red-700 text-3xl py-1'>
                    <div className='w-20 m-0'>
                        <img src={Letter_m} alt="" />
                    </div>
                    <div className='pt-3'>
                        {props.title}
                        <p className='text-sm text-slate-600'>React Movies, by Halim.</p>
                    </div>
                </Link>
                <Link to="/favorites">
                    <button className="text-red-800 font-bold bg-gray-800 hover:bg-gray-700 py-2 px-8 rounded-lg shadow-sm shadow-gray-600">
                        Favorite Movies
                    </button>
                </Link>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase className='w-36 md:w-56 lg:w-72'
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onKeyDown={props.onKeyDown}
                    />
                </Search>
                {theme === "dark" ? (
                    <FaSun
                        className="w-8 h-8 text-white"
                        onClick={() => handleThemeChange("light")}
                    />
                ) : (
                    <FaMoon
                        className="w-8 h-8 text-gray-500"
                        onClick={() => handleThemeChange("dark")}
                    />
                )}
            </Toolbar>
        </div>
    )
}

export default withRouter(Header)
