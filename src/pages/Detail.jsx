/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

import axios from 'axios';
import Layout from '../components/Layout'
import { withRouter } from '../utils/navigation'

import Lottie from 'lottie-react';
import Wwoman from '../assets/animations/Wwoman.json';

import '../styles/App.css';


const Detail = (props) => {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const title = useState('Movlix');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const { movie_id } = props.params
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${movie_id}?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&append_to_response=videos`,
            )
            .then((response) => {
                const { data } = response;
                setMovie(data);
                setVideos(data.videos.results);
            })
            .catch((error) => alert(error.toString()))
            .finally(() => setLoading(false));
    }


    if (loading) {
        return (
            <div className='w-1/2 h-full py-60 m-auto'>
                <Lottie loop autoplay animationData={Wwoman} />;
            </div>
        );
    } else {
        return (
            <Layout title={title}>
                <div className="py-10 text-black dark:text-white text-center font-bold text-2xl">Detail Movie</div>
                <div className="flex flex-col dark:text-white max-w-xl py-4 shadow-lg shadow-black dark:shadow-gray-600 bg-slate-100 dark:bg-slate-800 my-3 m-auto rounded-xl">
                    <div className='font-bold p-2 m-auto  text-lg'>{movie.title}</div>
                    <div>
                        <img className='m-auto rounded-sm py-3' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" />
                    </div>
                    <div className='p-2 px-10'><span className='font-bold'>Runtime: </span>{movie.runtime} <span>minutes</span></div>
                    <div className='p-2 px-10'><span className='font-bold'>Release Date: </span>{movie.release_date}</div>
                    <p className='p-2 px-10'><span className='font-bold'>Genre: </span></p>
                    {movie.genres.map((item) => (
                        <div key={item.id} className=" p-1 px-10">
                            <p>{item.name}</p>
                        </div>
                    ))}
                    <div className='p-2 px-10'><span className='font-bold'>Overview: </span>{movie.overview}</div>
                    <div className='p-2 px-10'><span className='font-bold'>Average: </span>Vote {movie.vote_average}</div>
                    <div className='p-2 px-10'><span className='font-bold'>Popularity: </span>{movie.popularity}</div>
                </div>
                <p className='p-6 dark:text-white font-bold'>WATCH TRAILER</p>
                {videos.map((item) => (
                    <iframe
                        key={item.id}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${item.key}`}
                        title={item.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ))}
            </Layout >
        )
    }
}


export default withRouter(Detail);