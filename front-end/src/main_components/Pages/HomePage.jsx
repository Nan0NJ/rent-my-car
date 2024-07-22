import React, {useEffect}from 'react';

// Importing the files
import Banner from '../landing_page_components/Banner';
import Serviced from '../landing_page_components/Serviced';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
      }, []);
    return (
        <div>
            <Banner />
            <Serviced />
        </div>
    );
};

export default Home;