import React, {useEffect}from 'react';

// Importing the files
import Banner from '../landing_page_components/Banner';
import Serviced from '../landing_page_components/Serviced';
import Categories from '../landing_page_components/Categories';
import TopMark from '../landing_page_components/TopMark';
import Authentication from '../Authentication/Authentication';
const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
      }, []);
    return (
        <div>
            <Banner />
            <Authentication />
            <Categories />
            <TopMark />
            <Serviced />
        </div>
    );
};

export default Home;