/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import { withRouter } from '../utils/navigation';
// import Stairway from '../assets/animations/Stairway.json';
import Wwoman from '../assets/animations/Wwoman.json';

import '../styles/App.css';


const Homepage = (props) => {
  const navigate = useNavigate();
  const title = useState('Movlix');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("TEST");
  }, [page]);

  function fetchData() {
    const newPage = page + 1;
    setTimeout(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&language=en-US&page=${page}`,
        )
        .then((response) => {
          const { results } = response.data;
          const temp = data.slice();
          temp.push(...results);
          setData(temp);
          setPage(newPage);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }, 1500);
  }


  function fetchData2() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const newPage = page + 1;
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&language=en-US&page=${page}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        const { results } = res;
        const temp = data.slice();
        temp.push(...results);
        setData(temp);
        setPage(newPage);
      })
      .catch((error) => alert(error.toString()))
      .finally(() => setLoading(false));
  }

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        )
        .then((response) => {
          const { results } = response.data;
          setData(results);
        })
        .catch((error) => alert(error.toString()))
    }
  }


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
          {data.map((item) => (
            <Card
              key={item.id}
              titleItem={item.title}
              imgItem={item.poster_path}
              onClickItem={() => navigate(`/movie/${item.id}`)}
              onClickFav={() => setPage(page + 1)}
            />
          ))}
        </div>
        <button onClick={() => fetchData2()} className='bg-slate-300 max-w-full my-12 mx-12 px-10 py-5 shadow-lg shadow-gray-500 hover:bg-slate-400 items-center text-center font-bold rounded-lg'>CLICK for Load More...</button>
      </Layout>
    );
  }
}

export default withRouter(Homepage);
