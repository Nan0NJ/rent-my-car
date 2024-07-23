import React from "react";

// Importing the files
import './../../css/categories-style.css';
import Sedan from './../../imgs/Sedan.png';
import Cabriolet from './../../imgs/Cabriolet.png';
import Coupe from './../../imgs/Coupe.png';
import SUV from './../../imgs/SUV.png';
import Micro from './../../imgs/Micro.png';

const Categories = () => {
    const buttons = [
        { src: Sedan, label: 'Sedan', model: 'sedan' },
        { src: Cabriolet, label: 'Cabriolet', model: 'cabriolet' },
        { src: Coupe, label: 'Coupe', model: 'coupe' },
        { src: SUV, label: 'SUV', model: 'suv' },
        { src: Micro, label: 'Micro', model: 'micro' },
    ];

    return (
        <div className="button-row">
            {buttons.map((button, index) => (
                <a key={index} href={`/booking?model=${button.model}`} className="button-linkCar">
                    <div className="buttonCar">
                        <img src={button.src} alt={button.label} className="button-imageCar" />
                        <span className="button-labelCar">{button.label}</span>
                    </div>
                </a>
            ))}
        </div>
    );
};

export default Categories;
