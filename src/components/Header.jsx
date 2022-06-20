import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import { withRouter } from '../utils/navigation';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Letter_m from '../assets/images/Letter_m.png';


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

export class Header extends Component {
    render() {
        return (
            <div className='sticky top-0 w-full px-4 py-0 bg-gray-900'>
                <Toolbar className='flex flex-row justify-between'>
                    <Link to="/" className='flex flex-row text-red-700 text-3xl py-1'>
                        <div className='w-20 m-0'>
                            <img src={Letter_m} alt="" />
                        </div>
                        <div className='pt-3'>
                            {this.props.title}
                            <p className='text-sm text-slate-600'>React Movies, by Halim.</p>
                        </div>
                    </Link>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase className='w-36 md:w-56 lg:w-72'
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyDown={this.props.onKeyDown}
                        />
                    </Search>
                </Toolbar>
            </div>
        )
    }
}

export default withRouter(Header)
