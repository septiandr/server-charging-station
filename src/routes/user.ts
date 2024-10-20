import { Elysia } from 'elysia';
import { createUser, deleteUser, getAllUser, login, logout } from '../middleware/userMiddleware.ts';


const user = (app: Elysia) => {
    getAllUser(app, '/users')
    createUser(app, '/register')
    login(app, '/login')
    logout(app, '/logout')
    deleteUser(app, '/delete-user')
};

export default user;
