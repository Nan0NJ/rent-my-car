import React from "react";

// Importing the files
import './../../css/categories-style.css';
import Sedan from './../../imgs/SedanREAL.png';
import Cabriolet from './../../imgs/CabrioletREAL.png';
import Coupe from './../../imgs/CoupeREAL.png';
import SUV from './../../imgs/SUVREAL.png';
import Micro from './../../imgs/MicroREAL.png';

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
