import React, { Component } from 'react';
import { MdFavorite } from 'react-icons/md';

class Card extends Component {
    render() {
        return (
            <div className="container grow p-2 flex flex-col bg-zinc-100 rounded-lg shadow-md shadow-gray-500">
                <div className='cursor-pointer' onClick={this.props.onClickItem}>
                    <img className='w-full h-auto rounded-md'
                        src={
                            this.props.imgItem ?
                                `https://image.tmdb.org/t/p/w500${this.props.imgItem}`
                                : 'https://via.placeholder.com/500x750?text=No+Image'}
                        alt={this.props.imgItem} />
                    <p className='text-black font-bold py-3 text-center'>{this.props.titleItem}</p>
                </div>
                <button className="text-black bg-slate-300 p-2 rounded-full shadow-md shadow-gray-400" onClick={this.props.onClickFav}>
                    Add to Favorite <MdFavorite className='text-white m-auto' />
                </button>
            </div>
        );
    }
}

class Card2 extends Component {
    render() {
        return (
            <div className="container grow p-4 flex flex-col bg-zinc-100 rounded-lg shadow-xl">
                <img
                    className="max-w-full h-auto"
                    width="500"
                    height="750"
                    src={this.props.imgItem}
                    alt={this.props.imgItem}
                />
                <p className="text-white">{this.props.titleItem}</p>
            </div>
        );
    }
}

export { Card, Card2 };