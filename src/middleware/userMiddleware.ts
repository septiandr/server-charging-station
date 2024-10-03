import { Elysia } from 'elysia';
import { dbUser } from '../config/db';
import { ID, Query } from 'node-appwrite';
import { verifyPassword } from '../utils/verifyPassword';

type User = {
    email: string,
    password: string,
    name: string
    phone: string
}

export const getAllUser = (app: Elysia, url: string) => {
    app.get(url, async (req) => {
        try {
            const { users } = await dbUser.list();
            const mappedUsers = users.map((user: any) => ({
                id: user.$id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isLogin: user?.prefs?.isLogin ?? false
            }));

            return {
                message: 'Succesfully get all users',
                code: 200,
                data: mappedUsers,
            };

        } catch (error: any) {
            return {
                message: 'Failed to create user',
                code: 400,
                error: error.message,
            };
        }
    });
}

export const createUser = (app: Elysia, url: string) => {
    app.post(url, async (req: any) => {
        try {
            const { email, password, name, phone }: User = req.body;

            const { users } = await dbUser.list();
            const filterData = users.filter((item: any) => item?.email === email)

            if (filterData.length > 0) {
                return {
                    message: 'User was registered',
                    code: 400,
                    data: { email: email },
                };
            }

            const userCreate = await dbUser.create(
                ID.unique(),
                email,
                phone,
                password,
                name
            );

            await dbUser.updatePrefs(userCreate.$id, {
                isLogin: false
            });

            return {
                message: 'User created successfully',
                code: 200,
                data: userCreate,
            };
        } catch (error: any) {
            return {
                message: 'Failed to create user',
                code: 400,
                error: error.message,
            };
        }
    });
}

export const login = (app: Elysia, url: string) => {
    app.put(url, async (req: any) => {
        try {
            const { email, password }: User = req.body;

            const { users } = await dbUser.list([Query.equal("email", email)]);
            const isPasswordMatch = await verifyPassword(users[0].password, password)

            const mappedUser = users.map((user: any) => ({
                id: user.$id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }));
            if (isPasswordMatch && email === mappedUser[0].email) {

                const result = await dbUser.updatePrefs(mappedUser[0].id, {
                    isLogin: true
                });

                return {
                    message: 'Login successfull',
                    code: 200,
                    data: result,
                };
            }
            return {
                message: 'User not registered',
                code: 400,
                error: { email },
            };
        } catch (error: any) {
            return {
                message: 'Failed to login',
                code: 400,
                error: error.message,
            };
        }
    });
}

export const logout = (app: Elysia, url: string) => {
    app.put(url, async (req: any) => {
        try {
            const { id } = req.body;

            const result = await dbUser.updatePrefs(id, {
                isLogin: false
            });

            return {
                message: 'Logout successfull',
                code: 200,
                data: result,
            };

        } catch (error: any) {
            return {
                message: 'Failed to login',
                code: 400,
                error: error.message,
            };
        }
    });
}

export const deleteUser = (app: Elysia, url: string) => {
    app.delete(url, async (req: any) => {
        try {
            const { id } = req.body;

            const deleteUser = await dbUser.delete(id);

            return {
                message: 'User deleted',
                code: 200,
                data: deleteUser,
            };
        } catch (error: any) {
            return {
                message: 'Failed to delete user',
                code: 400,
                error: error.message,
            };
        }
    });
}