import { Elysia, t } from 'elysia'
import getChargingStation from './routes/chargingStation.ts'
import user from './routes/user.ts'
import car from './routes/car.ts'
import userCar from './routes/userCar.ts'
import userFavorite from './routes/userFavorite.ts'
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

app.listen(3000)
console.log("-------------  Welcome  -------------")
console.log("=== Server Running on http://localhost:3000 ===")
