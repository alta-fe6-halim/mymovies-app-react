import Button from './Button';
import React, { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className="container grow p-2 flex flex-col bg-slate-500 rounded-lg shadow-lg shadow-gray-700">
                <div className='cursor-pointer' onClick={this.props.onClickItem}>
                    <img className='w-full h-auto rounded-sm'
                        src={
                            this.props.imgItem ?
                                `https://image.tmdb.org/t/p/w500${this.props.imgItem}`
                                : 'https://via.placeholder.com/500x750?text=No+Image'}
                        alt={this.props.imgItem} />
                    <p className='text-white font-bold py-3 text-center'>{this.props.titleItem}</p>
                </div>
                <div className='flex flex-row m-auto'>
                    <Button onClick={this.props.onClickFav} label="Add to Favorite🤍" />
                </div>
            </div>
        );
    }
}



export { Card };