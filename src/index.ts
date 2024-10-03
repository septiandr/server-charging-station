import { Elysia, t } from 'elysia'
import getChargingStation from './routes/chargingStation'
import user from './routes/user'
import car from './routes/car'
import userCar from './routes/userCar'

// Definisi interface untuk User
interface User {
  id: number
  name: string
  email: string
}

// Membuat instance dari Elysia
export const app = new Elysia()

// Menambahkan routes yang ada
getChargingStation(app)
user(app)
car(app)
userCar(app)

// Fungsi handler untuk Appwrite yang akan menangani request
export default async function handler({ req, res, log, error }: any) {
  try {
    // Menggunakan app.handle untuk menangani request yang datang
    const result = await app.handle(req)

    // Mengirim response yang dihasilkan oleh app.handle
    return res.json(result)
  } catch (err) {
    error(`Error processing request: ${err.message}`)
    return res.json({ error: "Something went wrong" })
  }
}
