import { Elysia } from 'elysia';
import { addCar, deleteUserCar, getCarByUserId, getListAllUserCar } from '../middleware/carUserMiddleware';


const userCar = (app: Elysia) => {
    addCar(app, '/add-user-car')
    getListAllUserCar(app, '/list-all-user-car')
    deleteUserCar(app, '/delete-user-car')
    getCarByUserId(app, '/list-user-car')
};

export default userCar;
