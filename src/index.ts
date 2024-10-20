import { Elysia, t } from 'elysia'
import getChargingStation from './routes/chargingStation.js'
import user from './routes/user.js'
import car from './routes/car.js'
import userCar from './routes/userCar.js'
import userFavorite from './routes/userFavorite.js'

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
