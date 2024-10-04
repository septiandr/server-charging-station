import { Elysia, t } from 'elysia'
import getChargingStation from '../../../../src/routes/chargingStation'
import user from '../../../../src/routes/user'
import car from '../../../../src/routes/car'
import userCar from '../../../../src/routes/userCar'
import userFavorite from '../../../../src/routes/userFavorite'
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
