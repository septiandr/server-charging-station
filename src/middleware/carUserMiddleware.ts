import { Elysia } from 'elysia';
import { databases } from '../config/db';
import { ID, Query } from 'node-appwrite';

const carUserCollectionID = 'user-car'

type CarUser = {
    user_id: string,
    car_id: string,
}

export const addCar = (app: Elysia, url: string) => {
    app.post(url, async (req: any) => {
        try {
            const { user_id, car_id }: CarUser = req.body;
            console.log("🚀 ~ app.post ~ req.body:", req.body)

            const response = await databases.createDocument(
                Bun.env.APPWRITE_DATABASE_ID,
                carUserCollectionID,
                ID.unique(),
                { user_id, car_id }
            );
            
            return { message: 'Car added successfully', code: 200, data: response.documents };
        } catch (error: any) {
            return { message: 'Failed to add car', code: 400, error: error.message };
        }
    });
}


export const getListAllUserCar = (app: Elysia, url: string) => {
    app.get(url, async (req) => {
        try {
            const res = await databases.listDocuments(
                Bun.env.APPWRITE_DATABASE_ID,
                carUserCollectionID,
                [
                    Query.select(["$id","user_id", "car_id"])
                ]
            );
            return {
                message: "Suceess get all car",
                code: 200,
                data: res
            }
        } catch (error: any) {
            return {
                message: "Suceess get all car",
                code: 200,
                data: error.message
            }
        }
    })
}

export const deleteUserCar = (app: Elysia, url: string) => {
    app.delete(url, async (req: any) => {
        try {
            const { id } = req.body;
            const res = await databases.deleteDocument(Bun.env.APPWRITE_DATABASE_ID, carUserCollectionID, id);

            return {
                message: 'Succesfully delete car',
                code: 200,
                data: res,
            };

        } catch (error: any) {
            return {
                message: 'Failed to delete car',
                code: 400,
                error: error.message,
            };
        }
    });
}
export const getCarByUserId = (app: Elysia, url: string) => {
    app.post(url, async (req: any) => {
        try {
            const { user_id } = req.body
            const res = await databases.listDocuments(
                Bun.env.APPWRITE_DATABASE_ID, 
                carUserCollectionID,
                [ 
                    Query.equal('user_id', user_id),
                    Query.select(["$id","user_id", "car_id"])
                ]
            );
            console.log("🚀 ~ app.post ~ res:", res)
            
            return {
                message: 'Succesfully delete car',
                code: 200,
                data: res,
            };

        } catch (error: any) {
            return {
                message: 'Failed to delete car',
                code: 400,
                error: error.message,
            };
        }
    });
}