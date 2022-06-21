/* eslint-disable no-unused-vars */
import Button from './Button';
import React, { useState } from 'react';

const Card = (props) => {

    return (
        <div className="container grow p-2 flex flex-col dark:bg-slate-800 bg-slate-500 rounded-lg shadow-lg shadow-gray-700">
            <div className='cursor-pointer' onClick={props.onClickItem}>
                <img className='w-full h-auto rounded-sm'
                    src={
                        props.imgItem ?
                            `https://image.tmdb.org/t/p/w500${props.imgItem}`
                            : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={props.imgItem} />
                <p className='text-gray-200 dark:text-white font-bold py-3 text-center'>{props.titleItem}</p>
            </div>
            <div className='flex flex-row m-auto'>
                <Button onClick={props.onClickFav} label="Add to Favorite🤍" />
            </div>
        </div>
    );
}




export { Card };