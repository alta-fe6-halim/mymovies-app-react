/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { withRouter } from '../utils/navigation'


const Detail = (props) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const title = useState('Movlix');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const { movie_id } = props.params
        axios
            .get(
                `https://api.themoviedb.org/3/movie/${movie_id}?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&language=en-US`,
            )
            .then((response) => {
                const { data } = response;
                setData(data);
            })
            .catch((error) => alert(error.toString()))
            .finally(() => setLoading(false));
    }


    if (loading) {
        return <div>Loading...</div>
    } else {
        return (
            <Layout title={title}>
                <div className="py-10 text-black text-center font-bold text-2xl">Detail Movie</div>
                <div className="flex flex-col max-w-xl py-4 shadow-lg shadow-black bg-slate-100 my-3 m-auto rounded-xl">
                    <div className='font-bold p-2 m-auto text-lg'>{data.title}</div>
                    <div>
                        <img className='m-auto rounded-sm py-3' src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt="poster" />
                    </div>
                    <div className='p-2 px-10'><span className='font-bold'>Runtime: </span>{data.runtime} <span>minutes</span></div>
                    <div className='p-2 px-10'><span className='font-bold'>Release Date: </span>{data.release_date}</div>
                    <p className='p-2 px-10'><span className='font-bold'>Genre: </span></p>
                    {data.genres.map((item) => (
                        <div key={item.id} className=" p-1 px-10">
                            <p>{item.name}</p>
                        </div>
                    ))}
                    <div className='p-2 px-10'><span className='font-bold'>Overview: </span>{data.overview}</div>
                    <div className='p-2 px-10'><span className='font-bold'>Average: </span>Vote {data.vote_average}</div>
                    <div className='p-2 px-10'><span className='font-bold'>Popularity: </span>{data.popularity}</div>
                </div>
                <p className='p-6'>WATCH TRAILER</p>
            </Layout >
        )
    }
}


export default withRouter(Detail);