/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { reduxAction } from '../utils/redux/actions/action';

import Layout from '../components/Layout';
import { Card } from '../components/Card';
import axios from 'axios';
import { withRouter } from '../utils/navigation';

import Lottie from 'lottie-react';
import Wwoman from '../assets/animations/Wwoman.json';

import '../styles/App.css';


const Homepage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const title = useState('Movlix');
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetchData();
  }, []);


  function fetchData() {
    const newPage = page + 1;
    // setTimeout(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&page=${page}`,
      )
      .then((response) => {
        const { results } = response.data;
        const temp = movie.slice();
        temp.push(...results);
        setMovie(temp);
        setPage(newPage);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
    // }, 1500);
  }


  function fetchData2() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const newPage = page + 1;
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&page=${page}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        const { results } = res;
        const temp = movie.slice();
        temp.push(...results);
        setMovie(temp);
        setPage(newPage);
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&query=${e.target.value}&page=1&include_adult=false`
        )
        .then((response) => {
          const { results } = response.data;
          setMovie(results);
        })
        .catch((error) => alert(error.toString()))
    }
  }

  const handleFav = (item) => {
    const tempLocal = localStorage.getItem("favMovie");
    if (tempLocal) {
      const temp = JSON.parse(tempLocal);
      temp.push(item);
      localStorage.setItem("favMovie", JSON.stringify(temp));
      dispatch(reduxAction("ADD_FAVORITES", temp));
    } else {
      localStorage.setItem("favMovie", JSON.stringify([item]));
      dispatch(reduxAction("ADD_FAVORITES", [item]));
    }
    alert("Added to favorite");
  };

  if (loading) {
    return (
      <div className='w-1/2 h-full py-60 m-auto'>
        <Lottie loop autoplay animationData={Wwoman} />;
      </div>
    );
  } else {
    return (
      <Layout title={title} onKeyDown={(e) => handleSearch(e)}>
        <div className="py-8 mx-16 text-black font-bold text-2xl">Now Playing Movies</div>
        <div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-4 gap-8 md:gap-5'>
          {movie.map((item) => (
            <Card
              key={item.id}
              titleItem={item.title}
              imgItem={item.poster_path}
              onClickItem={() => navigate(`/movie/${item.id}`)}
              onClickFav={() => handleFav(item)}
              item={item}
            />
          ))}
        </div>
        <button onClick={() => fetchData2()} className='bg-slate-500 hover:bg-slate-600 max-w-full my-12 mx-12 px-10 py-5 shadow-lg shadow-gray-900 text-white items-center text-center font-bold rounded-lg'>CLICK for Load More...</button>
      </Layout>
    );
  }
}

export default withRouter(Homepage);
