import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import Layout from '../components/Layout';
import { Card } from '../components/Card';
import { withRouter } from '../utils/navigation';

import '../styles/App.css';


const Homepage = (props) => {
    const favorites = useSelector(state => state.favorites);
    const navigate = useNavigate();
    const title = useState('Movlix');

    return (
        <Layout title={title}>
            <div className="py-8 mx-16 text-black font-bold text-2xl">Favorite Movies</div>
            <div className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-4 gap-8 md:gap-5'>
                {favorites.map((item) => (
                    <Card
                        key={item.id}
                        titleItem={item.title}
                        imgItem={item.poster_path}
                        onClickItem={() => navigate(`/movie/${item.id}`)}
                    />
                ))}
            </div>
        </Layout>
    )
}

export default withRouter(Homepage);
