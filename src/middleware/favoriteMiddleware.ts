import { Elysia } from 'elysia';
import { databases } from '../config/db';
import { ID, Query } from 'node-appwrite';

const carUserCollectionID = 'user-favorite'

type CarUser = {
    user_id: string,
    station_id: string,
}

export const addNewFavorite = (app: Elysia, url: string) => {
    app.post(url, async (req: any) => {
        try {
            const { user_id, station_id }: CarUser = req.body;

            const response = await databases.createDocument(
                Bun.env.APPWRITE_DATABASE_ID,
                carUserCollectionID,
                ID.unique(),
                { user_id, station_id }
            );
            
            return { message: 'Success add to favorite', code: 200, data: response.documents };
        } catch (error: any) {
            return { message: 'Failed add to favorite', code: 400, error: error.message };
        }
    });
}


export const getListAllFavorite = (app: Elysia, url: string) => {
    app.get(url, async (req) => {
        try {
            const res = await databases.listDocuments(
                Bun.env.APPWRITE_DATABASE_ID,
                carUserCollectionID,
                [
                    Query.select(["$id","user_id", "station_id"])
                ]
            );
            return {
                message: "Suceess get all favorite",
                code: 200,
                data: res
            }
        } catch (error: any) {
            return {
                message: "Failed get all favorite",
                code: 400,
                data: error.message
            }
        }
    })
}

export const deleteFavorite = (app: Elysia, url: string) => {
    app.delete(url, async (req: any) => {
        try {
            const { id } = req.body;
            const res = await databases.deleteDocument(Bun.env.APPWRITE_DATABASE_ID, carUserCollectionID, id);

            return {
                message: 'Succesfully remove from favorite',
                code: 200,
                data: res,
            };

        } catch (error: any) {
            return {
                message: 'Failed to remove from favorite',
                code: 400,
                error: error.message,
            };
        }
    });
}
export const getFavoriteByUserId = (app: Elysia, url: string) => {
    app.post(url, async (req: any) => {
        try {
            const { user_id } = req.body
            const res = await databases.listDocuments(
                Bun.env.APPWRITE_DATABASE_ID, 
                carUserCollectionID,                 
                [ 
                    Query.equal('user_id', user_id),
                    Query.select(["$id","user_id", "station_id"])
                ]
            );
            
            return {
                message: 'Succesfully get list favorite',
                code: 200,
                data: res,
            };

        } catch (error: any) {
            return {
                message: 'Failed to get list favorite',
                code: 400,
                error: error.message,
            };
        }
    });
}