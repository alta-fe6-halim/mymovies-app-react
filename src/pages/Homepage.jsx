import axios from 'axios';
import Lottie from 'lottie-react';
import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import { withRouter } from '../utils/navigation';
// import Stairway from '../assets/animations/Stairway.json';
import Wwoman from '../assets/animations/Wwoman.json';

import '../styles/App.css';
// import { data } from 'autoprefixer';

class Homepage extends Component {
  state = {
    data: [],
    title: 'Movlix',
    dataMovie: [],
    loading: true,
    page: 1,
  };

  componentDidMount() {
    this.fetchData();
  }


  fetchData() {
    const newPage = this.state.page + 1;
    setTimeout(() => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&language=en-US&page=${this.state.page}`,
        )
        .then((response) => {
          const { results } = response.data;
          const temp = this.state.data.slice();
          temp.push(...results);
          this.setState({ data: temp, page: newPage });
        })
        .catch((error) => console.log(error))
        .finally(() => this.setState({ loading: false }));
    }, 1500);
  }

  fetchData2() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const newPage = this.state.page + 1;
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&language=en-US&page=${this.state.page}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const { results } = data;
        const temp = this.state.data.slice();
        temp.push(...results);
        this.setState({ data: temp, page: newPage });
      })
      .catch((error) => alert(error.toString()))
      .finally(() => this.setState({ loading: false }));
  }

  handleSearch = (e) => {
    if (e.keyCode === 13) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=1ba9c86fcf862a52f20aacbfd8972b3b&language=en-US&query=${e.target.value}&page=1&include_adult=false`
        )
        .then((response) => {
          const { results } = response.data;
          this.setState({ data: results });
        })
        .catch((error) => alert(error.toString()))
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <div className='w-1/2 h-full py-60 m-auto'>
          <Lottie loop autoplay animationData={Wwoman} />;
        </div>
      );
    } else {
      return (
        <Layout title={this.state.title} onKeyDown={(e) => this.handleSearch(e)}>
          <div className="py-8 mx-16 text-black font-bold text-2xl">Now Playing Movies</div>
          <div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-4 gap-8 md:gap-5'>
            {this.state.data.map((item) => (
              <Card
                key={item.id}
                titleItem={item.title}
                imgItem={item.poster_path}
                onClickItem={() => this.props.navigate(`movie/${item.id}`)}
              />
            ))}
          </div>
          <button onClick={() => this.fetchData2()} className='bg-slate-300 max-w-full my-12 mx-12 px-10 py-5 shadow-lg shadow-gray-500 hover:bg-slate-400 items-center text-center font-bold rounded-lg'>CLICK ME for Load More...</button>
        </Layout>
      );
    }
  }
}

export default withRouter(Homepage);
