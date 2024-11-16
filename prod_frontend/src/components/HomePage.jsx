import React from 'react';
import Header from "./header";
import authStore from '../store/authStore';


const HomePage = () => {
    return (
        <>
        <Header user={authStore.user}/>

        </>
    );
};

export default HomePage;