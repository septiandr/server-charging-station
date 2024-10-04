import { Elysia, t } from 'elysia'
import getChargingStation from '../routes/chargingStation'
import user from '../routes/user'
import car from '../routes/car'
import userCar from '../routes/userCar'
import userFavorite from '../routes/userFavorite'
// Definisi interface untuk User
interface User {
  id: number
  name: string
  email: string
}
export const app = new Elysia()

getChargingStation(app);
user(app)
car(app)
userCar(app)
userFavorite(app)

// app.listen(3000)
// console.log("-------------  Welcome  -------------")
// console.log("=== Server Running on http://localhost:3000 ===")
