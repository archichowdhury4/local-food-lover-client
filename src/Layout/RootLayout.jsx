import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Componants/NavBar';
import Footer from '../Componants/Footer';

const RootLayout = () => {
    return (
        <div>
            <NavBar></NavBar>
           <Outlet></Outlet> 
           <Footer></Footer>
        </div>
    );
};

export default RootLayout;