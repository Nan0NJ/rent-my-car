import React, {useEffect} from 'react';

import Serviced from '../landing_page_components/Serviced';

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <div>
      <Serviced />
    </div>
  );
};

export default Services;
