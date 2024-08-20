# Rent My Car
The Rent My Car project is designed to create an innovative information system that enhances car rental services in small cities by bridging the gap between car owners and renters. The system addresses the challenges of limited car rental options and high costs, providing a diverse and accessible marketplace for vehicle rentals.

## Project Information
- Port Number: 8228
- Project: Rent My Car
- Course: Systems III - Information Systems
- Professor: Klen Čopič Pucihar
- Student: Nenad Jakovchevski
- Student ID: 89221061

## How to Run the Project

### Prerequisites
Before running the project, ensure you have the following installed:

- Node.js: Ensure you have Node.js installed on your machine. You can download it from Node.js official website.
- MySQL: You need a running instance of MySQL for the database. The project is configured to connect to a MySQL database.
- npm: Node Package Manager, which comes with Node.js.

### Setup Instructions

1. Clone the Repository:
```bash
git clone https://github.com/Nan0NJ/rent-my-car.git
cd rent-my-car
```
2. Install Dependencies:
Navigate to the project directory and run the following command to install all necessary dependencies:
```bash
npm install
```
3. Set Up the Database:
Access the MySQL database and create a new database using the following command:
``` sql
CREATE DATABASE SISIII2024_89221061;
```
Import the provided SQL file to set up the necessary tables and data.
Update the `.env` file with your MySQL credentials:
``` 
DB_HOST=your_database_host
DB_USER=codeigniter
DB_PASSWORD=codeigniter2019
DB_NAME=SISIII2024_89221061
PORT=8228
```
