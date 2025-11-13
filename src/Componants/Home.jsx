import React from 'react';
import Hero from './Hero';
import TopRatedReviews from './TopRatedReviews';
import DocumentTitle from './DocumentTitle';

const Home = () => {
    DocumentTitle('Home | MyWeb');
    return (
        <div>
           <Hero></Hero> 
           <TopRatedReviews></TopRatedReviews>
        </div>
    );
};

export default Home;