import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

const route = process.env.DEFAULT_ROUTE || "/api"

app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
});

app.get(`${route}`, (req: Request, res: Response) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}${route}`)
});