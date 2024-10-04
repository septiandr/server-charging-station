import { Elysia } from 'elysia';
import { 
    addNewFavorite, 
    deleteFavorite, 
    getFavoriteByUserId, 
    getListAllFavorite 
} from '../middleware/favoriteMiddleware'


const userFavorite = (app: Elysia) => {
    addNewFavorite(app, '/add-new-favorite')
    deleteFavorite(app, '/delete-favorite')
    getFavoriteByUserId(app, '/list-favorite')
    getListAllFavorite(app, '/list-all-favorite')
};

export default userFavorite;
