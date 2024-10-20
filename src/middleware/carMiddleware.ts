import { Elysia } from 'elysia';
import { databases } from '../config/db.ts';
import { ID, Query } from 'node-appwrite';

const carCollectionID = 'car'

type Car = {
    name: string,
    powerKw: number
}

export const getAllCar = (app: Elysia, url: string) => {
    app.get(url, async (req) => {
        try {
            const response = await databases.listDocuments(
                Bun.env.APPWRITE_DATABASE_ID,
                carCollectionID,
            );
            return {
                message: 'Succesfully get all cars',
                code: 200,
                data: response.documents,
            };

        } catch (error: any) {
            return {
                message: 'Failed to get all cars',
                code: 400,
                error: error.message,
            };
        }
    });
}
export const addNewCar = (app: Elysia, url: string) => {
    app.post(url, async (req: any) => {
        try {
            const { name, powerKw }: Car = req.body;

            const lowerName = name.toLowerCase()
            let response;

            let promise = await databases.listDocuments(
                Bun.env.APPWRITE_DATABASE_ID,
                carCollectionID,
                [
                    Query.equal('name', lowerName)
                ]
            );

            if (promise.total > 0) {
                return {
                    message: 'Car already registered',
                    code: 200,
                    data: promise,
                };
            }

            response = await databases.createDocument(
                Bun.env.APPWRITE_DATABASE_ID,
                carCollectionID,
                ID.unique(),
                {
                    name: lowerName,
                    powerKw
                }
            );

            return {
                message: 'Succesfully add new car',
                code: 200,
                data: response,
            };

        } catch (error: any) {
            return {
                message: 'Failed to get all cars',
                code: 400,
                error: error.message,
            };
        }
    });
}

export const deleteCar = (app: Elysia, url: string) => {
    app.delete(url, async (req: any) => {
        try {
            const { id } = req.body;
            const promise = await databases.deleteDocument(Bun.env.APPWRITE_DATABASE_ID, carCollectionID, id);

            return {
                message: 'Succesfully delete car',
                code: 200,
                data: promise,
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

