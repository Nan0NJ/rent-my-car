/*
    Car Items is used to store the data for the booking page.
    For retrieving the data from the database.
    Implementation with Basic Dictionary (as objects). FOR NOW
*/

// LATER FETCH WITH DATABASE FOR TESTING
const CarItems = [
    {
        id: 1,
        name: 'Toyota Camry',
        category: 'sedan',
        price: 25,
        img: "./../../imgs/footer_car.png",
        modelYear: 2020,
        information: 'This is a test information',
        taken: false,
      },
      {
        id: 2,
        name: 'Ford Explorer',
        category: 'suv',
        price: 30, 
        img: "./../../imgs/footer_car.png",
        modelYear: 2019,
        information: 'This is a test information',
        taken: true,
      },
      {
        id: 3,
        name: 'Honda Civic',
        category: 'sedan',
        price: 20,
        img: "./../../imgs/footer_car.png",
        modelYear: 2018,
        information: 'This is a test information',
        taken: false,
      },
      {
        id: 4,
        name: 'Chevrolet Silverado',
        category: 'suv',
        price: 45,
        img: "./../../imgs/footer_car.png",
        modelYear: 2021,
        information: 'This is a test information',
        taken: false,
      },
      {
        id: 5,
        name: 'Jeep Wrangler',
        category: 'suv',
        price: 50,
        img: "./../../imgs/footer_car.png",
        modelYear: 2020,
        information: 'This is a test information',
        taken: false,
      }
];

export default CarItems;