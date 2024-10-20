import { Elysia } from 'elysia';
import { addNewCar, deleteCar, getAllCar } from '../middleware/carMiddleware.ts';


const car = (app: Elysia) => {
    getAllCar(app, '/cars')
    addNewCar(app, '/car')
    deleteCar(app,'/delete-car')
};

export default car;
